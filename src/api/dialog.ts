import type { Dialog, UsersDialog } from '@src/interfaces';
import axios from 'axios';
import api from "."
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export const getDialogOnUser = async (id_user: number): Promise<UsersDialog[]> => {
  try {
    const { data } = await api.get<UsersDialog[]>(`/dialog/getOnUser/${id_user}`);
    console.log("Проверка response", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getUsersOnDialog = async (id_dialog: number):Promise<Dialog[]> => {
  try {
    const {data} = await api.get<Dialog[]>(`/usersDialog/${id_dialog}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};