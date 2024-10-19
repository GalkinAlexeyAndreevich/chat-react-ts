import styles from "./MessageBody.module.css";
import { useAppSelector } from "@src/store/hook";

function MessageBody() {
  const messages = useAppSelector(state=>state.message.messages)
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)

  return (
    <div className={styles.container}>
      {messages?messages.map((item, index) => {
        return (
          <div className={currentUser===item.id_sender?styles.itemYour:styles.item} key={index}>
            {/* <div>
              <img src="../UserLogo2.png" alt="" />
            </div> */}
            <div className={currentUser===item.id_sender?styles.MessageContentYour:styles.MessageContent} >
              <p> {item.content.trim()}</p>
            </div>
          </div>
        );
      }):null}
    </div>
  );
}
export default MessageBody;
