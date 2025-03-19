import React, { Suspense, useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RecoilRoot, useRecoilState} from 'recoil';
import { MainLayoutRoutes, LandingRoutes, UnhandledRoutes,  AuthenticationRoutes,
 Loading, GuardedRoute } from './imports/import';
import "./App.css"

// The main application component that sets up routing for the application
export default function App() {

  const auth = localStorage.setItem('attributedAuth', true);

  return (
     // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading/>}>
      <RecoilRoot>
        <Router>
          <Routes>
            {/* Main layout route: Handles all routes under "/*" (catch-all for the main layout) */}
            <Route path="/Location-Tracker-Web/*" element={<GuardedRoute element={<MainLayoutRoutes/>}/>} />

            {/* Landing route: Handles all routes under "/landing/*" */}
            <Route path="/landing/*" element={<LandingRoutes />} />

            {/* Authentication route: Handles all routes under "/auth/*" */}
            <Route path="/Location-Tracker-Web/auth/*" element={<AuthenticationRoutes />} />

            {/* Catch-all route: Handles any route not matched by the above routes */}
            <Route path="*" element={<UnhandledRoutes />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </Suspense>
  );
}
