import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";

export interface ITodo {
  id: string;
  title: string;
  textBody: string;
  isCompeted: boolean;
  file: boolean;
  date: string;
}
type GamesState = {
  todo: ITodo[];
};

const initialState: GamesState = {
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchGames.fulfilled, (state, action) => {
  //       state.games = action.payload;
  //       state.loading = false;
  //     })
  //     .addCase(fetchGames.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchGames.rejected, (state) => {
  //       state.error = "Warning";
  //     });
  // },
});

export const { addTodo, deleteTodo, toggleTodo, changeTodoTextFields } =
  todosSlice.actions;

export default todosSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
