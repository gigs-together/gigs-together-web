export async function apiRequest<T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
): Promise<T> {
  try {
    const response = await fetch(`/api/proxy/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json', // multipart/form-data
      },
      body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    });

    const contentType = response.headers.get('Content-Type') || '';
    const isJson = contentType.includes('application/json');

    const result = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      throw new Error(
        typeof result === 'string' ? result : result.message || 'Something went wrong',
      );
    }

    return result;
  } catch (e) {
    console.error('API Error:', e);
    throw e;
  }
}
