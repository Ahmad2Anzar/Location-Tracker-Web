import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loading, Dashboard, UnhandledRoutes } from '../imports/import';

export default function DashboardRoutes() {
  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading />}>
      {/* Define application routes */}
      <Routes>
        {/* Route for the dashboard path, wrapped with GuardedRoute to protect the route */}
        <Route path="/" element={<Dashboard />}/>
        <Route path="*" element={<UnhandledRoutes />} />
      </Routes>
    </Suspense>
  );
}
