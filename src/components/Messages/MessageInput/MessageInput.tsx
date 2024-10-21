import { useRef } from "react";
import styles from "./MessageInput.module.css";
import { useAppSelector } from "@src/store/hook";
import { addMessage } from "@src/api/message";

function MessageInput() {
  const id_dialog = useAppSelector(state=>state.user.currentDialog)
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  const messageRef = useRef<HTMLInputElement>(null);

  const onAddMessage = () => {
      if (!messageRef?.current?.value) return;
      console.log(currentUser);
      addMessage({
          id_dialog: id_dialog,
          id_sender: currentUser,
          content: messageRef.current.value,
      });
      messageRef.current.value = "";
  };
  return (
      <div className={styles.container}>
          <div className={styles.body}>
              <button className={styles.btn}>
                  <img src="../plus.svg" alt="" />
              </button>
              <input
                  className={styles.messageInput}
                  type="text"
                  placeholder="Type a message here"
                  ref={messageRef}
              />
              <button className={styles.smileBtn}>
                  <img src="../SmileIcon.png" alt="" />
              </button>
              <button
                  className={styles.btn}
                  onClick={onAddMessage}>
                  <img width={20} height={20} src="../Send-icon.svg" alt="" />
              </button>
          </div>
      </div>
  );
}

export default MessageInput;
