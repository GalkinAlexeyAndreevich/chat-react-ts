export interface User {
  id_user: number;
  login_user: string;
  password_user: string;
  email?: string;
  phone?: string;
  date_create: Date;
  firstName?: string;
  lastName?: string;
  patronomic?: string;
  home_address?: string;
  gender?: string;
  about?: string;
  date_update: Date;
  birthday?: Date;
  photo?: string;
}

export interface UsersDialog{
  id_dialog:number;
  dialog_create:Date;
  dialog_status:number;
  dialog_name:string;
  id_creator:number;
  usersDialog: Dialog[]; 
  messages:Message[]
}

export interface Message {
  id_message: number;
  id_dialog: number;
  id_sender: number;
  content: string;
  message_time: string
  isRead: boolean;
  isDeleted: boolean;
}

export interface AddMessage {
  id_dialog: number;
  id_sender: number;
  content: string;
}

export interface Dialog {
  id_dialog: number;
  id_user: number;
  id_role: number;
  user?:User
}

export interface  DialogInfo extends UsersDialog {
  usersDialog: Dialog[];
  lastMessage?:Message
  secondUser: {
      login: string;
      photo: string | undefined;
  } | null;
}

export interface RouteInfo{
  href:string;
  label:string;
  icon:string
}
