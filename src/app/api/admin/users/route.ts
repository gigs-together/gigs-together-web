import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserModel } from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const _start = parseInt(searchParams.get('_start') || '0');
    const _end = parseInt(searchParams.get('_end') || '10');
    const _sort = searchParams.get('_sort') || 'createdAt';
    const _order = searchParams.get('_order') || 'DESC';
    const q = searchParams.get('q');

    let query = {};
    if (q) {
      query = {
        $or: [
          { email: { $regex: q, $options: 'i' } },
          { firstName: { $regex: q, $options: 'i' } },
          { lastName: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const sortOrder = _order === 'ASC' ? 1 : -1;
    const users = await UserModel
      .find(query)
      .sort({ [_sort]: sortOrder })
      .skip(_start)
      .limit(_end - _start)
      .select('-password');

    // Transform _id to id for React Admin
    const transformedUsers = users.map(user => ({
      ...user.toObject(),
      id: user._id.toString(),
    }));

    const total = await UserModel.countDocuments(query);

    return NextResponse.json(transformedUsers, {
      headers: {
        'X-Total-Count': total.toString(),
        'Access-Control-Expose-Headers': 'X-Total-Count'
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const user = await UserModel.create(body);
    
    // Remove password from response and add id
    const userObj = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = userObj;
    
    return NextResponse.json({
      ...userResponse,
      id: user._id.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
} 