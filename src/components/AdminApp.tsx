'use client';

import { Admin, Resource } from 'react-admin';
import { dataProvider } from '@/lib/dataProvider';
import { authProvider } from '@/lib/authProvider';
import { UserList, UserEdit, UserCreate, UserShow } from '@/components/admin/UserResource';
import { EventList, EventEdit, EventCreate, EventShow } from '@/components/admin/EventResource';
import Dashboard from '@/components/admin/Dashboard';

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    title="Gigs Together Admin"
    requireAuth
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      show={UserShow}
      recordRepresentation="email"
    />
    <Resource
      name="events"
      list={EventList}
      edit={EventEdit}
      create={EventCreate}
      show={EventShow}
      recordRepresentation="title"
    />
  </Admin>
);

export default AdminApp; 