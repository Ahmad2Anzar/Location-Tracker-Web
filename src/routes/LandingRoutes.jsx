import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing, Loading } from '../imports/import';

export default function LandingRoutes() {
  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading />}>
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Suspense>
  );
}
