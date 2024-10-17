import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch/ChatSearch";
import ChatMessage from "./ChatMessage";
import styles from "./ChatWindow.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getMessagesThunk } from "@src/store/message";
import { userActions } from "@src/store";


// let arrMessages = [
//   {
//     id: 2,
//     icon: "./UserLogo2.png",
//     nameUser: "Jared Sunn",
//     whatDo: "records voice message",
//     lastMessage: "1 minutes ago",
//     voice: "01:15",
//     file: 2,
//     photo: 1
//   },
// ];

function ChatWindow() {
  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state=>state.user.dialogs)
  console.log("Диалоги", dialogs);
  

  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatSearch />
      <nav>
        <ul className={styles.list}>
          {dialogs?dialogs.map(
            ({
              dialog,
              secondUser
            }) => (
              <li key={dialog.id_dialog} className={styles.listItem}>
                <div onClick={()=>{
                  dispatch(getMessagesThunk({id_dialog:dialog.id_dialog}))
                  dispatch(userActions.setCurrentDialog(dialog.id_dialog))
                }}>
                  <ChatMessage href={"chat/"+dialog.id_dialog} nameUser={secondUser?.login || null}/>
                </div>
              </li>
            )
          ):null}
        </ul>
      </nav>
    </div>
  );
}

export default ChatWindow;
