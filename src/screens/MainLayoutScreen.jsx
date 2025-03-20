import React, { Suspense } from 'react'
import Loading from '../miscellaneous/Loading'
import { MainLayout,Navbar, OSMMap } from '../imports/import'

export default function MainLayoutScreen() {
  return (
   <Suspense fallback={<Loading />}>
     <div className="h-screen w-screen ">
       <Navbar/>
       <MainLayout/>
     </div>
    </Suspense>
  )
}
