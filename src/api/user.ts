
import type { User } from '@src/interfaces';
import axios from 'axios';
import { SERVER_API_URL } from './../../config';


export const getUsers = async ():Promise<User[]> => {
  try {
    const {data} = await axios.get<User[]>(`${SERVER_API_URL}/user`);
    return data; 
  } catch (error) {
    console.log(error);
    return []
  }
};

export const getUser = async (id_user:number):Promise<User | null> => {
  try {
    const {data} = await axios.get<User>(`${SERVER_API_URL}/user/${id_user}`);
    return data;
  } catch (error) {
    console.log(error);
    return null
  }
};