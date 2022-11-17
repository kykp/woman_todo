import React, { useState, useEffect } from "react";
import styles from "./TodoItem.module.scss";
import {
  deleteTodo,
  ITodo,
  toggleTodo,
  changeTodoTextFields,
} from "../../store/todo/todosSlice";
import { RiDeleteBin7Line as DeleteBox } from "react-icons/ri";
import { MdOutlineCloudDone as Completed } from "react-icons/md";
import { useAppDispatch } from "../../helper/hook";
import clsx from "clsx";

export const TodoItem = ({ id, title, textBody, date, isCompeted }: ITodo) => {
  const [todoTextFields, setTodoTextFields] = useState({
    newTitle: title,
    newTextBody: textBody,
  });
  const dispatch = useAppDispatch();

  const onHandleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
  };
  const onHandleToggleTodo = () => {
    dispatch(toggleTodo({ id }));
  };

  const onHandleChangeTextFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoTextFields({ ...todoTextFields, [name]: value });
  };

  useEffect(() => {
    dispatch(
      changeTodoTextFields({
        id,
        title: todoTextFields.newTitle,
        bodyText: todoTextFields.newTextBody,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoTextFields]);

  return (
    <li className={clsx(styles.todo_item, isCompeted ? styles.active : null)}>
      <div className={styles.block_controls}>
        <Completed
          title="Пометить как выполнено"
          onClick={onHandleToggleTodo}
          className={styles.image}
        />
        <DeleteBox
          title="Удалить задачу"
          className={styles.image}
          onClick={onHandleDeleteTodo}
        />
        {isCompeted && (
          <div className={styles.todo_status}>
            <span>Completed</span>
          </div>
        )}
      </div>
      <div className={styles.header}>
        <input
          value={todoTextFields.newTitle}
          className={styles.title}
          name="newTitle"
          onChange={onHandleChangeTextFields}
        />

        {date !== "" && <span className={styles.date}>{date}</span>}
      </div>
      <div className={styles.body}>
        <input
          name="newTextBody"
          value={todoTextFields.newTextBody}
          onChange={onHandleChangeTextFields}
        />
      </div>
    </li>
  );
};
