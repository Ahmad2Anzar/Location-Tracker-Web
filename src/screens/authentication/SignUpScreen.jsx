import React, { Suspense, useEffect, useState } from "react";
import { Loading, SignUpBody, SignUpFooter, SignUpHeader } from "../../imports/import";

export default function SignUpScreen() {
  const [isSubmitClicked, setIsSubmitClicked ] = useState(false)
  
  return (
    <Suspense fallback={<Loading />}>
      <SignUpHeader/>
      <SignUpBody 
        isSubmitClicked = {isSubmitClicked}
        />
      <SignUpFooter 
        setIsSubmitClicked = {setIsSubmitClicked}
        isSubmitClicked = {isSubmitClicked}
        />
    </Suspense>
  );
}
