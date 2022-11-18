import React, { useState } from "react";
import styles from "./Todo.module.scss";

import { TodoItem } from "../TodoItem/TodoItem";
import { useAppSelector } from "../../helper/hook";
import { selectAllTodos } from "../../store/todo/selectors";
import { TodoInputs } from "../TodoInputs/TodoInputs";
export const Todo = () => {
  const todos = useAppSelector(selectAllTodos);

  console.log(todos);
  console.log("render TODO");
  return (
    <div className={styles.todo_page}>
      <ul className={styles.todo_items}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <TodoInputs />
    </div>
  );
};
