'use client';

import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';

export default function Home() {
  return (
    <PrivateRoute>
      <></>
    </PrivateRoute>
  );
}
