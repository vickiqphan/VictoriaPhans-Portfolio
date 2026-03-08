import { useEffect, useRef, useState } from 'react';

export function useNavVisibility(): boolean {
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setNavVisible(true);
      } else if (currentY < lastScrollY.current) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current) {
        setNavVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return navVisible;
}
