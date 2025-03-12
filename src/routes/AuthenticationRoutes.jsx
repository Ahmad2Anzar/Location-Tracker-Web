import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UnhandledRoutes, Login, SignUpScreen, Loading } from '../imports/import';

export default function AuthenticationRoutes() {
  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading />}>
      {/* Define application routes */}
      <Routes>
        {/* Route for the different Auth page path, wrapped with GuardedRoute to protect the route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpScreen/>} />
        <Route path="*" element={<UnhandledRoutes />} />
      </Routes>
    </Suspense>
  );
}
