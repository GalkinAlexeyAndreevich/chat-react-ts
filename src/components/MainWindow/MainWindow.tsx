import React from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./MainWindow.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getDialogsThunk } from "@src/store/user";
import ChatWindow from "../ChatsWindow";
import MessageWindow from "../MessageWindow";

function MainWindow() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state=>state.user.idCurrentUser)
  React.useEffect(()=>{
    dispatch(getDialogsThunk({id_user:currentUser}))
  },[currentUser,dispatch])
  return (
    <main className={styles.main}>
      <ChatWindow />
      <Routes>
        <Route path=":id" element={<MessageWindow />} />
      </Routes>
    </main>
  );
}

export default MainWindow;
