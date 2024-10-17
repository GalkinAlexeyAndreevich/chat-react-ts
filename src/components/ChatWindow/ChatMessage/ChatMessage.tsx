import { NavLink } from "react-router-dom";

import styles from "./ChatMessage.module.css";
function online(whatDo:string) {
  if (
    whatDo === "online" ||
    whatDo === "writes" ||
    whatDo === "records voice message"
  ) {
    return styles.online;
  }
}
function testCount(newMessages:number) {
  if (newMessages > 0) {
    return styles.messageCount;
  }
}

function testFiles(file:number) {
  if (file > 1) {
    return (
      <div className={styles.file}>
        <img src="./file-icon.png" alt="" />
        <p>File (x{file})</p>
      </div>
    );
  }
  if (file === 1) {
    return (
      <div className={styles.file}>
        <img src="./file-icon.png" alt="" />
        <p>File</p>
      </div>
    );
  }
  return null;
}

function testPhoto(photo:number) {
  if (photo > 1) {
    return (
      <div className={styles.photo}>
        <img src="./photo-icon.png" alt="" />
        <p>Photo (x{photo})</p>
      </div>
    );
  }
  if (photo === 1) {
    return (
      <div className={styles.photo}>
        <img src="./photo-icon.png" alt="" />
        <p>Photo</p>
      </div>
    );
  }
  return null;
}
interface IProps{
  href:string;
  nameUser:string | null;
  whatDo?:string;
  lastMessage?:string;
  messageText?:string;
  newMessages?:number;
  file?:number;
  photo?:number;
}
function ChatMessage({
  href,
  nameUser,
  whatDo="",
  lastMessage="",
  messageText = "",
  newMessages = 0,
  file = 0,
  photo = 0,
}:IProps) {
  console.log(href);
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.activClassName}` : styles.item
      }
      to={"/" + href}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={online(whatDo)}>
          </div>
          <div className={styles.infoUser}>
            <div className={styles.nameStatus}>
              <p className={styles.nameUser}>{nameUser}</p>
              <div className={styles.WhatDo}>
                <img src="" alt="" />
                <p>{whatDo}</p>
              </div>
            </div>
            <p>{lastMessage}</p>
          </div>
        </div>

        <div className={styles.message}>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>{messageText}</p>
            <div className={styles.document}>
              {testFiles(file)}
              {testPhoto(photo)}
            </div>
          </div>

          <p style={{display:"none"}} className={testCount(newMessages)}>
            {newMessages}
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default ChatMessage;
