import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {getDialogOnUser} from "@api/dialog"
import { getUser } from "@src/api/user";
import type { DialogInfo, Message, User } from "@src/interfaces";


interface TypeState {
  idCurrentUser:number,
  userInfo:User | null,
  dialogs:DialogInfo[],
  currentDialog:number
}
const initialState:TypeState = {
    idCurrentUser:0,
    userInfo:null,
    dialogs:[],
    currentDialog:0
};


const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDialogs(state, actions:PayloadAction<DialogInfo[]>) {
      state.dialogs = actions.payload
    },
    setCurrentDialog(state,actions:PayloadAction<number>){
      console.log("Вызвали изменение", actions.payload);
      
      state.currentDialog = actions.payload
    },
    setUserInfo(state,actions:PayloadAction<User>){
      state.userInfo = actions.payload
    },
    setCurrentUser(state,actions:PayloadAction<number>){
      state.idCurrentUser = actions.payload
    },
    addNewMessageInDialog(state, actions:PayloadAction<{id_dialog:number, message:Message}>){
      const {id_dialog, message} = actions.payload
      const dialog = state.dialogs.find(dialog=>dialog.id_dialog === id_dialog)
      if(dialog){
        dialog.messages.push(message)
        dialog.lastMessage = message
      }
    }
  },
});
export const getUserThunk = createAsyncThunk(
  "user/getUser",
  async({id_user}:{id_user:number},{dispatch}) =>{
    const user = await getUser(id_user)
    if(user){
      dispatch(slice.actions.setUserInfo(user))
    }
  }
)

export const getDialogsThunk = createAsyncThunk(
  "user/getDialogs",
  async ({id_user}:{id_user:number}, { dispatch }) => {
    console.log(id_user)
    const fullInfo:DialogInfo[]=[]
    const dialogs = await getDialogOnUser(id_user)
    console.log("проверка диалогов", dialogs);
    
    if(!dialogs){
      return
    }
    console.log("Прошли");
    
    for(const item of dialogs){
      console.log("Зашли в цикл");
      
      const listUsers = item.usersDialogs
      const secondUser = listUsers.find(user=>user.id_user !=id_user)
      console.log("Прошли ли дальше", listUsers,item.dialog_status);
      const user = {
        login:"",
        photo:""
      }
      if(secondUser){
        user.login = secondUser.user?.login_user || ""
      }
      const obj = {...item,usersDialog:item.usersDialogs,secondUser:user, lastMessage:item.messages[0]}
      fullInfo.push(obj)    
    }
    console.log("Прошли этап");
    console.log("где консоль", fullInfo);
    dispatch(slice.actions.setDialogs(fullInfo))
  }
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;