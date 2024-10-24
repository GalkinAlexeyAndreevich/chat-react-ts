import MessageHeader from "./MessageHeader";
import MessageInput from "./MessageInput";
import MessageBody from "./MessageBody";
import { useParams } from "react-router-dom";
import styles from "./Messages.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { getMessagesThunk } from "@src/store/message";
import { useEffect, useState } from "react";
import { userActions } from "@src/store";


function Messages() {
  const { id } = useParams();
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log("Текущий диалог", id);
    if(Number(id)){
      dispatch(userActions.setCurrentDialog(Number(id)))
      dispatch(getMessagesThunk({id_dialog:Number(id)}))
    }
  }, [dispatch, id]);
  const [addMessageStatus, setAddMessageStatus] = useState(false)
  
  const dialogs = useAppSelector(state=>state.user.dialogs)
  const Current = dialogs.find((el) => Number(el.id_dialog) === Number(id));
  if(!dialogs){
    return <div>Диалоги не найдены</div>
  }
  if(!Current || !Current?.secondUser?.login?.length){
    return <div>Информация о пользователе не найдена</div>
  }
  return (
    <div className={styles.container}>
      <MessageHeader
        key={Current.id_dialog}
        nameUser={Current.secondUser.login}
        photo={"../userLogo1.1.png"}
      />
      <MessageBody  addMessageStatus={addMessageStatus} setAddMessageStatus={setAddMessageStatus}/>
      <MessageInput setAddMessageStatus={setAddMessageStatus}/>
    </div>
  );
}

export default Messages;
