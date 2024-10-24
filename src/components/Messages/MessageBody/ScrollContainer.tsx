import React, { useEffect, useRef, useCallback } from 'react';
import styles from "./MessageBody.module.css";
type Props = {
	children:React.ReactNode;
	currentDialog:number;
}
const ScrollContainer = ({ children, currentDialog }:Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const savedScrollPosition = localStorage.getItem(`scrollPosition_${currentDialog}`);

    if (scrollContainer) {
      // Добавляем задержку перед восстановлением позиции скролла
      setTimeout(() => {
        if (savedScrollPosition) {
          scrollContainer.scrollTop = Number(savedScrollPosition);
          console.log(`Восстанавливаем позицию скролла: ${scrollContainer.scrollTop}`);
        } else {
          scrollContainer.scrollTop = scrollContainer.scrollHeight; // Прокрутить в самый низ, если сохраненной позиции нет
        }
      }, 100); // Задержка 100 мс
    }
  }, [currentDialog]);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      localStorage.setItem(`scrollPosition_${currentDialog}`, String(scrollContainerRef.current.scrollTop));
    }
  },[currentDialog]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div ref={scrollContainerRef} className={styles.container}> {/* Замените maxHeight на желаемую высоту */}
      {children}
    </div>
  );
};

export default ScrollContainer;
