import { SERVER_API_URL } from './../../config';
import type { Dialog, UsersDialog } from '@src/interfaces';
import axios from 'axios';



export const getDialogOnUser = async (id_user: number): Promise<UsersDialog[]> => {
  try {
    const { data } = await axios.get<UsersDialog[]>(`${SERVER_API_URL}/dialog/getOnUser/${id_user}`);
    console.log("Проверка response", data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getUsersOnDialog = async (id_dialog: number):Promise<Dialog[]> => {
  try {
    const {data} = await axios.get<Dialog[]>(`${SERVER_API_URL}/usersDialog/${id_dialog}`);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};