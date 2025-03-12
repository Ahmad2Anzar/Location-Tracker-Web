import { useState, useLayoutEffect } from 'react';

//This hook is to perform events after a certain screen width
function useWindowSize() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Call handler right away to ensure the state is updated on mount
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

export default useWindowSize;