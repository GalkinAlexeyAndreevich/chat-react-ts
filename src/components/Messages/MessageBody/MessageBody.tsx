import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import styles from "./MessageBody.module.css";
import { useAppSelector } from "@src/store/hook";
import ScrollContainer from "./ScrollContainer";
import { FaAngleDown } from "react-icons/fa";
type Props = {
    addMessageStatus: boolean;
    setAddMessageStatus: Dispatch<SetStateAction<boolean>>;
};

function MessageBody({ addMessageStatus, setAddMessageStatus }:Props) {
  const messages = useAppSelector((state) => state.message.messages);
  const { idCurrentUser, currentDialog } = useAppSelector((state) => state.user);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); // Для проверки прокрутки
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 105);
    }
  };
  useEffect(handleScroll,[])
  // Прокрутка к последнему сообщению при добавлении нового
  useEffect(() => {
    if (addMessageStatus) {
      setAddMessageStatus(false);
      setTimeout(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth' }); // Плавная прокрутка к последнему сообщению
        }
      }, 100);
    }
  }, [addMessageStatus, setAddMessageStatus, currentDialog]);



  const isYou = (id_sender:number) => {
    return idCurrentUser === id_sender;
  };
  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
      <ScrollContainer
          scrollContainerRef={contentRef}
          onScroll={handleScroll}
          currentDialog={currentDialog}>
          {messages?.map((item, index) => (
              <div
                  id={`message№${item.id_message}`}
                  key={item.id_message}
                  className={
                      isYou(item.id_sender) ? styles.itemYour : styles.item
                  }
                  ref={index === messages.length - 1 ? lastMessageRef : null}>
                  {/* {!isYou(item.id_sender) && (
            <div>
              <img src="../UserLogo2.png" alt="" />
            </div>
          )} */}
                  <div
                      className={
                          isYou(item.id_sender)
                              ? styles.messageContentYour
                              : styles.messageContent
                      }>
                      <p>{item.content.trim()}</p>
                  </div>
              </div>
          ))}
        {!isAtBottom && (
          <button onClick={scrollToBottom} className={styles.scrollButton}>
            <FaAngleDown  size={24} />
          </button>
        )}
      </ScrollContainer>
  );
}

export default MessageBody;