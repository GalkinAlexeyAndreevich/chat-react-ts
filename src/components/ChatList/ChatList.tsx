import ChatHeader from "./ChatHeader";
import ChatSearch from "./ChatSearch/ChatSearch";
import ChatMessage from "./ChatMessage";
import styles from "./ChatList.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getMessagesThunk } from "@src/store/message";
import { userActions } from "@src/store";

function ChatWindow() {
  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state=>state.user.dialogs)
  console.log("Диалоги", dialogs);
  const selectDialog = (id_dialog:number) => {
      dispatch(getMessagesThunk({ id_dialog }));
      dispatch(userActions.setCurrentDialog(id_dialog));
  };
  return (
      <div className={styles.container}>
          <ChatHeader />
          <ChatSearch />
          <nav>
              <ul className={styles.list}>
                  {dialogs
                      ? dialogs.map(({ dialog, secondUser,lastMessage }) => (
                            <li
                                key={dialog.id_dialog}
                                className={styles.listItem}>
                                <div
                                    onClick={() => selectDialog(dialog.id_dialog)}>
                                    <ChatMessage
                                        idDialog={dialog.id_dialog}
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
