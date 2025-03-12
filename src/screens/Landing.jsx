import React, { Suspense, lazy } from "react";
import { Loading } from "../imports/import";



// Main component that renders the landing page
export default function Landing() {
  return (
    // `Suspense` component is used to handle the loading state of lazy-loaded components
    // `fallback` prop specifies what to render while the components are being loaded
    <Suspense fallback={<Loading />}>
      {/* Render the header, body, and footer of the landing page */}
      landingg
    </Suspense>
  );
}
