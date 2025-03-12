import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Unhandled, Loading } from '../imports/import';

export default function UnhandledRoutes() {
  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading />}>
      {/* Define application routes */}
      <Routes>
        <Route path="*" element={<Unhandled />} />
      </Routes>
    </Suspense>
  );
}
