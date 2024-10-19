import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./ChatPage.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getDialogsThunk } from "@src/store/user";
import ChatList from "../../components/ChatList";
import Messages from "../../components/Messages";

function ChatPage() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  React.useEffect(()=>{
    dispatch(getDialogsThunk({id_user:currentUser}))
  },[currentUser,dispatch])
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
