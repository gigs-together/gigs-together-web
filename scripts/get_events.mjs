#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = 'A4xi4n2qyjnXvBeP69fvFmqOo5MeGKrv';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';

async function fetchAllEvents() {
  const allEvents = [];
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
      console.error(`Error fetching page ${page + 1}:`, error.message);
      break;
    }

  } while (page < totalPages);

  console.log(`\nTotal events fetched: ${allEvents.length}`);

  // Write to events.json
  const outputPath = path.join(__dirname, 'events.json');
  fs.writeFileSync(outputPath, JSON.stringify(allEvents, null, 2));
  console.log(`Events saved to ${outputPath}`);
}

// Run the script
fetchAllEvents().catch(console.error); 