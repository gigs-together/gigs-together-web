'use client';

import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('@/components/AdminApp'), {
  ssr: false,
  loading: () => <div>Loading admin...</div>,
});

export default function AdminPage() {
  return <AdminApp />;
}
