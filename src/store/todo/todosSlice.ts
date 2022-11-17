import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { addPostFireBase } from "./asyncActions";
export interface ITodo {
  id: string;
  title: string;
  textBody: string;
  isCompeted: boolean;
  file: boolean;
  date: string;
  isExpiried: boolean;
}
type TodoState = {
  todo: ITodo[];
};

const initialState: TodoState = {
  todo: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todo.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      const newState = state.todo.filter((el) => el.id !== action.payload.id);
      state.todo = newState;
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const currentTodo = state.todo.find(
        (todo) => todo.id === action.payload.id
      );
      if (currentTodo) {
        currentTodo.isCompeted = !currentTodo.isCompeted;
      }
    },
    setExpiredTodo: (state, action: PayloadAction<{ id: string }>) => {
      const currentTodo = state.todo.find(
        (todo) => todo.id === action.payload.id
      );
      if (currentTodo) {
        currentTodo.isExpiried = true;
      }
    },
    changeTodoTextFields: (
      state,
      action: PayloadAction<{ title: string; bodyText: string; id: string }>
    ) => {
      const currentTodo = state.todo.find(
        (todo) => todo.id === action.payload.id
      );
      if (currentTodo) {
        currentTodo.title = action.payload.title;
        currentTodo.textBody = action.payload.bodyText;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostFireBase.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addPostFireBase.pending, (state) => {})
      .addCase(addPostFireBase.rejected, (state) => {});
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  changeTodoTextFields,
  setExpiredTodo,
} = todosSlice.actions;

export default todosSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
