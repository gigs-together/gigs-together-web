#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbConnect from '../src/lib/mongodb';
import { EventModel } from '../src/models/Event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = 'A4xi4n2qyjnXvBeP69fvFmqOo5MeGKrv';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';

// TypeScript interfaces for Ticketmaster API response
interface TicketmasterImage {
  url: string;
  width: number;
  height: number;
}

interface TicketmasterVenue {
  name: string;
  city?: {
    name: string;
  };
  address?: {
    line1: string;
  };
}

interface TicketmasterDate {
  start: {
    localDate?: string;
    dateTime?: string;
  };
}

interface TicketmasterEvent {
  id: string;
  name: string;
  images?: TicketmasterImage[];
  dates?: TicketmasterDate;
  salesInfo?: {
    attendance?: {
      current: number;
    };
  };
  _embedded?: {
    venues?: TicketmasterVenue[];
  };
}

// Function to transform Ticketmaster event to our schema
function transformTicketmasterEvent(tmEvent: TicketmasterEvent) {
  const venue = tmEvent._embedded?.venues?.[0];
  const image = tmEvent.images?.find((img: TicketmasterImage) => img.width >= 300)?.url || tmEvent.images?.[0]?.url || '';
  
  return {
    id: `tm_${tmEvent.id}`,
    date: tmEvent.dates?.start?.localDate || tmEvent.dates?.start?.dateTime || '',
    cover: image,
    title: tmEvent.name || 'Untitled Event',
    people: tmEvent.salesInfo?.attendance?.current || 0,
    venueAddress: venue ? `${venue.name}, ${venue.city?.name || ''}, ${venue.address?.line1 || ''}`.trim() : 'TBA',
    published: false, // Default to unpublished
    ticketmasterId: tmEvent.id,
  };
}

async function fetchAllEvents() {
  try {
    // Connect to MongoDB using the existing dbConnect utility
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('Connected to MongoDB successfully!');

    const allEvents: TicketmasterEvent[] = [];
    let page = 0;
    let totalPages = 1;

    console.log('Fetching events from Ticketmaster API...');

  do {
    const params = new URLSearchParams({
      apikey: API_KEY,
      locale: '*',
      size: '200', // Maximum allowed by Ticketmaster API
      sort: 'date,asc',
      city: 'barcelona',
      domain: 'spain',
      page: page.toString()
    });

    const url = `${BASE_URL}?${params}`;
    
    try {
      console.log(`Fetching page ${page + 1}...`);
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data._embedded && data._embedded.events) {
        allEvents.push(...data._embedded.events);
        console.log(`Found ${data._embedded.events.length} events on page ${page + 1}`);
      }

      // Update pagination info
      if (data.page) {
        totalPages = data.page.totalPages || 1;
        page = data.page.number + 1;
      } else {
        break;
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error(`Error fetching page ${page + 1}:`, errorMessage);
      break;
    }

  } while (page < totalPages);

    console.log(`\nTotal events fetched: ${allEvents.length}`);

    // Transform and save events to database
    console.log('Transforming and saving events to database...');
    let savedCount = 0;
    let skippedCount = 0;

    for (const tmEvent of allEvents) {
      try {
        // Check if event already exists
        const existingEvent = await EventModel.findOne({ ticketmasterId: tmEvent.id });
        
        if (existingEvent) {
          // Event already exists, skip it
          skippedCount++;
          continue;
        }
        
        // Only create new events
        const transformedEvent = transformTicketmasterEvent(tmEvent);
        const result = await EventModel.create(transformedEvent);
        
        if (result) {
          savedCount++;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error(`Error saving event ${tmEvent.id}:`, errorMessage);
        skippedCount++;
      }
    }

    console.log(`\n✅ Database update complete!`);
    console.log(`📊 Events saved: ${savedCount}`);
    console.log(`⚠️  Events skipped: ${skippedCount}`);

    // Also write to JSON file for backup
    const outputPath = path.join(__dirname, '../src/app/events.json');
    fs.writeFileSync(outputPath, JSON.stringify(allEvents, null, 2));
    console.log(`📁 Backup saved to ${outputPath}`);

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('❌ Error in fetchAllEvents:', errorMessage);
  } finally {
    // Note: dbConnect manages its own connection pooling
    console.log('Script completed.');
  }
}

// Run the script
fetchAllEvents().catch(console.error); 