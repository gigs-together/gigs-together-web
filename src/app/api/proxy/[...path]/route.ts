import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;

interface RouteParams {
  params: {
    path: string[];
  };
}

export async function GET(req: NextRequest, context: RouteParams) {
  return handleProxy(req, context);
}

export async function POST(req: NextRequest, context: RouteParams) {
  return handleProxy(req, context);
}

async function handleProxy(req: NextRequest, { params }: RouteParams) {
  const backendPath = params.path.join('/');
  const targetUrl = `${API_BASE_URL}/${backendPath}`;

  try {
    const reqBody = req.method !== 'GET' && req.body ? JSON.stringify(await req.json()) : undefined;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: reqBody,
    });

    const result = await response.text(); // Use `text()` to handle both JSON and non-JSON responses

    if (!response.ok) {
      // TODO
      // response.status || response.statusText
      return NextResponse.json({ message: 'Backend error', details: result }, { status: response.status });
    }

    return new NextResponse(result, {
      status: response.status,
      headers: response.headers,
    });
  } catch (e) {
    console.error('Proxy Error:', e);
    return NextResponse.json({ message: 'Internal Server Error', error: e }, { status: 500 });
  }
}
