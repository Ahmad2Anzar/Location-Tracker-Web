import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout, DashboardRoutes, UnhandledRoutes, Loading } from '../imports/import';

function MainLayoutRoutes() {

  return (
    // Suspense component is used to show a fallback UI (Loading...) while the lazy-loaded component is being fetched
    <Suspense fallback={<Loading/>}>
      {/* Define application routes */}
      <div className='screen-wrapper'>
        <Routes>
          <Route index element={<MainLayout />} />
          <Route path="dashboard/*" element={<DashboardRoutes />} />
          <Route path="*" element={<UnhandledRoutes />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default MainLayoutRoutes;