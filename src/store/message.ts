import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddMessage, Message } from "@src/interfaces";
import { addMessage, getMessageOnDialog } from "@src/api/message";
import { arrMessages } from "@src/testData";

interface TypeState {
  messages: Message[];
}

const initialState: TypeState = {
  messages: [],
};

const slice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload); // Можно использовать push для добавления
    },
  },
});

export const getMessagesThunk = createAsyncThunk(
  "message/getMessages",
  async ({ id_dialog }: { id_dialog: number }, { dispatch }) => {
    const messages = await getMessageOnDialog(id_dialog);
    // messages.push(...arrMessages)
    dispatch(slice.actions.setMessages(messages));
  }
);

export const addMessageThunk = createAsyncThunk(
  "message/addMessage",
  async ({ id_dialog, id_sender, content }: AddMessage, { dispatch }) => {
    const res = await addMessage({ id_dialog, id_sender, content });
    console.log(id_dialog, id_sender, content, res);
    
    if (res) {
      dispatch(getMessagesThunk({ id_dialog }));
    }
  }
);

// Экспортируем редьюсер и действия
export const messageReducer = slice.reducer;
export const messageActions = slice.actions;