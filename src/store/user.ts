import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {getDialogOnUser,getUsersOnDialog} from "@api/dialog"
import { getUser } from "@src/api/user";
import type { DialogInfo, User } from "@src/interfaces";


interface TypeState {
  idCurrentUser:number,
  userInfo:User | null,
  dialogs:DialogInfo[],
  currentDialog:number
}
const initialState:TypeState = {
    idCurrentUser:2,
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
      
      const listUsers =await getUsersOnDialog(item.id_dialog)
      console.log("Прошли ли дальше", listUsers,item.dialog_status);
      
      let user = null
      if(Number(item.dialog_status) === 0 && listUsers?.length){
       
        for(const item1 of listUsers){
          if(item1.id_user!==id_user && item1?.id_user){
              const data = await getUser(item1.id_user)
              if(data){
                user = {
                  login:data.login_user,
                  photo:data.photo
                }
              }
          }
        }
      }
      const obj = {dialog:item,usersDialog:listUsers,secondUser:user}
      fullInfo.push(obj)    
    }
    console.log("Прошли этап");
    console.log("где консоль", fullInfo);
    dispatch(slice.actions.setDialogs(fullInfo))
  }
);

export const userReducer = slice.reducer;
export const userActions = slice.actions;