import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "./todosSlice";

const URL =
  process.env.REACT_APP_SERVER_URL ||
  `https://womantodo-default-rtdb.europe-west1.firebasedatabase.app/`;

export const addPostFireBase = createAsyncThunk<
  ITodo[],
  ITodo,
  { rejectValue: string }
>("todos/addPostFireBase", async (ITodo, { rejectWithValue }) => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(ITodo),
  });
  if (!response.ok) {
    return rejectWithValue(`server error`);
  }

  return await response.json();
});
