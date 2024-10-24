import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch/ChatSearch";
import ChatMessage from "./ChatMessage";
import styles from "./ChatList.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getMessagesThunk } from "@src/store/message";
import { userActions } from "@src/store";
import { useMobileDetect } from "@src/hooks/useMobileDetect";

function ChatWindow() {
  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state=>state.user.dialogs)
  const currentDialogId = useAppSelector(state=>state.user.currentDialog)
  const isMobile = useMobileDetect()
  console.log("Диалоги", dialogs);
  const selectDialog = (id_dialog:number) => {
      dispatch(getMessagesThunk({ id_dialog }));
      dispatch(userActions.setCurrentDialog(id_dialog));
  };
  if(isMobile && currentDialogId){
    return <div></div>
  }
  return (
      <div className={styles.container}>
          <ChatHeader />
          <ChatSearch />
          <nav>
              <ul className={styles.list}>
                  {dialogs
                      ? dialogs.map(({ id_dialog, secondUser,lastMessage }) => (
                            <li
                                key={id_dialog}
                                className={styles.listItem}>
                                <div
                                    onClick={() => selectDialog(id_dialog)}>
                                    <ChatMessage
                                        idDialog={id_dialog}
                                        nameUser={secondUser?.login || null}
                                        photoUser={"../userLogo1.1.png"}
                                        whatDo={"Пишет"}
                                        messageText={lastMessage?lastMessage.content:""}
                                    />
                                </div>
                            </li>
                        ))
                      : null}
              </ul>
          </nav>
      </div>
  );
}

export default ChatWindow;
