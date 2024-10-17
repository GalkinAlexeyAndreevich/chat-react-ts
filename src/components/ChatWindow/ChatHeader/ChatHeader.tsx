import styles from "./ChatHeader.module.css";
function ChatHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.h}>Chats</h1>
      <button className={styles.button}>
        <img src={"../plus.svg"} alt=""></img>Create New Chat
      </button>
    </div>
  );
}

export default ChatHeader;
