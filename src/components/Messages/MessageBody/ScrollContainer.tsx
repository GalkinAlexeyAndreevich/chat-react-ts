import React, { useEffect, useRef, useCallback } from 'react';
import styles from "./MessageBody.module.css";
type Props = {
	children:React.ReactNode;
	currentDialog:number;
  scrollContainerRef:React.MutableRefObject<HTMLDivElement | null>
  onScroll:()=>void
}
const ScrollContainer = ({ children, currentDialog, scrollContainerRef,onScroll }:Props) => {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);

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
  }, [currentDialog,scrollContainerRef]);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      localStorage.setItem(`scrollPosition_${currentDialog}`, String(scrollContainerRef.current.scrollTop));
    }
  },[currentDialog,scrollContainerRef]);

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
  }, [handleScroll,scrollContainerRef]);

  return (
    <div onScroll={onScroll} ref={scrollContainerRef} className={styles.container}> {/* Замените maxHeight на желаемую высоту */}
      {children}
    </div>
  );
};

export default ScrollContainer;
