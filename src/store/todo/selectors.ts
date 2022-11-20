import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const getAllTodos = (store: RootState) => store.todo;

export const selectAllTodos = createSelector(getAllTodos, (todo) => todo.todo);
