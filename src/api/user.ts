
import type { User } from '@src/interfaces';
import axios from 'axios';
import api from '.';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const getUsers = async ():Promise<User[]> => {
  try {
    const {data} = await api.get<User[]>(`/user`);
    return data; 
  } catch (error) {
    console.log(error);
    return []
  }
};

export const getUser = async (id_user:number):Promise<User | null> => {
  try {
    const {data} = await api.get<User>(`/user/${id_user}`);
    return data;
  } catch (error) {
    console.log(error);
    return null
  }
};
type tokenInfo = {
  userId:number;
  accessToken:string;
  refreshToken:string
}
export const signIn = async (login:string, password:string):Promise<tokenInfo> => {
  try {
    const {data} = await api.post(`/user/signIn`,{
      login,
      password
    });
    console.log("Авторизация", data);
    return data;
  } catch (error) {
    console.log(error);
    return {userId:0, accessToken:"",refreshToken:""}
  }
};