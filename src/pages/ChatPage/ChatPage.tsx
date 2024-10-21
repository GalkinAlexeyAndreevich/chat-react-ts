import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./ChatPage.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getDialogsThunk } from "@src/store/user";
import ChatList from "../../components/ChatList";
import Messages from "../../components/Messages";
import { useSocket } from "@src/hooks/useSocket";
import { userActions } from '../../store/user';
import type { Message } from "@src/interfaces";
import { messageActions } from "@src/store";

function ChatPage() {
  const dispatch = useAppDispatch()
  const {socket} = useSocket()
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  useEffect(()=>{
    dispatch(getDialogsThunk({id_user:currentUser}))
  },[currentUser,dispatch])

  useEffect(() => {
    if(!socket)return
    socket.on('newMessage', (message:Message) => {
      console.log('Новое сообщение:', message);
      dispatch(userActions.addNewMessageInDialog({
        id_dialog:message.id_dialog,
        message
      }));
      dispatch(messageActions.addMessage(message));
    });

    // Очищаем событие при размонтировании компонента
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch,socket]);

  return (
    <main className={styles.main}>
      <ChatList />
      <Routes>
        <Route path=":id" element={<Messages />} />
      </Routes>
    </main>
  );
}

export default ChatPage;
