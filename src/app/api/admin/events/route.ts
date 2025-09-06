import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { EventModel } from '@/models/Event';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const _start = parseInt(searchParams.get('_start') || '0');
    const _end = parseInt(searchParams.get('_end') || '10');
    const _sort = searchParams.get('_sort') || 'date';
    const _order = searchParams.get('_order') || 'DESC';
    const q = searchParams.get('q');

    let query = {};
    if (q) {
      query = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { venueAddress: { $regex: q, $options: 'i' } },
        ],
      };
    }

    const sortOrder = _order === 'ASC' ? 1 : -1;
    const events = await EventModel.find(query)
      .sort({ [_sort]: sortOrder })
      .skip(_start)
      .limit(_end - _start);

    // Transform _id to id for React Admin
    const transformedEvents = events.map((event) => ({
      ...event.toObject(),
      id: event._id.toString(),
    }));

    const total = await EventModel.countDocuments(query);

    return NextResponse.json(transformedEvents, {
      headers: {
        'X-Total-Count': total.toString(),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const event = await EventModel.create(body);

    return NextResponse.json(
      {
        ...event.toObject(),
        id: event._id.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
