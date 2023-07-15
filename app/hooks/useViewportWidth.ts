import { useState, useEffect } from 'react';

export const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Check if the code is running in a browser environment
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return { viewportWidth, isMobile: viewportWidth < 768 };
};
