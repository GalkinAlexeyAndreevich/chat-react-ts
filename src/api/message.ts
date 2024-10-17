import type { AddMessage, Message } from '@src/interfaces';
import axios from 'axios';
import { SERVER_API_URL } from './../../config';

export const getMessageOnDialog = async (id_dialog: number):Promise<Message[]> => {
  try {
    const {data} = await axios.get<Message[]>(`${SERVER_API_URL}/message/onDialog/${id_dialog}`);
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
};



export const addMessage = async ({ id_dialog, id_sender, content }: AddMessage):Promise<boolean> => {
  try {
    await axios.post(`${SERVER_API_URL}/message/`, {
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