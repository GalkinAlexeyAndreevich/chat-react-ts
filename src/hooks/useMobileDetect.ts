import { useEffect, useState } from "react";

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Можете выбрать нужную ширину для мобильного экрана
    };

    handleResize(); // Инициализация при монтировании компонента
    window.addEventListener('resize', handleResize);
    console.log("window.innerWidth", window.innerWidth);
    
    return () => window.removeEventListener('resize', handleResize); // Удаление слушателя
  }, []);

  return isMobile;
};