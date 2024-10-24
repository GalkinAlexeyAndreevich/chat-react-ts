import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {getDialogOnUser} from "@api/dialog"
import { getUser } from "@src/api/user";
import type { DialogInfo, Message, User } from "@src/interfaces";


interface TypeState {
  idCurrentUser:number,
  userInfo:User | null,
  dialogs:DialogInfo[],
  currentDialog:number;
  isAuthenticated:boolean;
}
const initialState:TypeState = {
    idCurrentUser:0,
    userInfo:null,
    dialogs:[],
    currentDialog:0,
    isAuthenticated:false
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
    const fullInfo:DialogInfo[]=[]
    const dialogs = await getDialogOnUser(id_user)
    if(!dialogs){
      return
    }
    for(let i=0; i<dialogs.length;i++){
      const item = dialogs[i]
      
      const listUsers = item.usersDialog
      const secondUser = listUsers.find(user=>user.id_user !=id_user && user.id_user)
      const user = {
        login:"",
        photo:""
      }
      if(secondUser){
        user.login = secondUser.user?.login_user || ""
      }
      const obj = {...item,secondUser:user, lastMessage:item.messages[0]}
      fullInfo.push(obj)    
    }
    dispatch(slice.actions.setDialogs(fullInfo))
  }
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;

