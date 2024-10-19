import type { AddMessage, Message } from '@src/interfaces';
import axios from 'axios';
import api from '.';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const getMessageOnDialog = async (id_dialog: number):Promise<Message[]> => {
  try {
    const {data} = await api.get<Message[]>(`/message/onDialog/${id_dialog}`);
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
};



export const addMessage = async ({ id_dialog, id_sender, content }: AddMessage):Promise<boolean> => {
  try {
    await api.post(`/message/`, {
      id_dialog: Number(id_dialog),
      id_sender: Number(id_sender),
      content: content,
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }
};