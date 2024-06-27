import { useEffect, useState } from 'react';
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // https://bobbyhadz.com/blog/react-get-window-width-height

  function getWindowSize() {
    if (typeof window !== 'undefined') {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
    }
    // 서버 환경일 때 기본값 반환
    return { innerWidth: 0, innerHeight: 0 };
  }
  return windowSize;
};
