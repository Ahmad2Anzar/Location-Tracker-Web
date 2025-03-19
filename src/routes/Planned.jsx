import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AddRoute, FeedbackForm, Loading, PlannedRoutes, ReachedMilestoneComponent, UnhandledRoutes } from '../imports/import';

export default function Planned() {
  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading />}>
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<PlannedRoutes />}/>
        <Route path="/add-routes" element={<AddRoute />} />
        <Route path="/reached-milestone" element={<ReachedMilestoneComponent />} />
        <Route path="/complete-milestone" element={<FeedbackForm />} />
        <Route path="*" element={<UnhandledRoutes />} />
      </Routes>
    </Suspense>
  );
}