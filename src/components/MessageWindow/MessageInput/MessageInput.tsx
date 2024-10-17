import { useRef } from "react";
import styles from "./MessageInput.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { addMessageThunk } from "@src/store/message";

function MessageInput() {
  const dispatch = useAppDispatch()
  const id_dialog = useAppSelector(state=>state.user.currentDialog)
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  const messageRef = useRef<HTMLInputElement>(null);
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
          <img src="../smileIcon.png" alt="" />
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            if(messageRef?.current?.value){
              console.log(currentUser);
              dispatch(addMessageThunk({
                id_dialog:id_dialog,
                id_sender:currentUser,
                content:messageRef.current.value
              }))
              messageRef.current.value=""
            }
          }}
        >
          <img width={20} height={20} src="../Send-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
