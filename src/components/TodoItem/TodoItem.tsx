import React, { useState, useEffect } from "react";
import styles from "./TodoItem.module.scss";
import {
  deleteTodo,
  ITodo,
  toggleTodo,
  setExpiredTodo,
} from "../../store/todo/todosSlice";
import { RiDeleteBin7Line as DeleteBox } from "react-icons/ri";
import { MdOutlineCloudDone as Completed } from "react-icons/md";
import { FaPen as Change } from "react-icons/fa";
import { useAppDispatch } from "../../helper/hook";
import { deleteTodoFromDB, toggleTodoCompleted } from "../../helper/firebase";
import clsx from "clsx";
import dayjs from "dayjs";

import { Popup } from "../Popup/Popup";

const currentDate = new Date().toISOString().split("T")[0];

export const TodoItem = ({
  id,
  title,
  textBody,
  date,
  isCompleted,
  isExpiried,
}: ITodo) => {
  const [showPopup, setShowPopup] = useState(false);

  const onHandlePopup = () => {
    setShowPopup(!showPopup);
  };
  const date1 = dayjs(currentDate);
  const date2 = dayjs(date);

  useEffect((): void => {
    if (date2.diff(date1) < 0) {
      dispatch(setExpiredTodo({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const dispatch = useAppDispatch();

  const onHandleDeleteTodo = async () => {
    dispatch(deleteTodo({ id }));
    deleteTodoFromDB(id);
  };

  const onHandleToggleTodoCompleted = () => {
    toggleTodoCompleted(id);
    dispatch(toggleTodo({ id }));
  };

  return (
    <li
      className={clsx(
        styles.todo_item,
        isCompleted ? styles.active : null,
        isExpiried ? styles.expired : null
      )}
    >
      <div className={styles.block_controls}>
        <Completed
          title="Пометить как выполнено"
          onClick={onHandleToggleTodoCompleted}
          className={styles.image}
        />
        <Change
          title="Изменить задачу"
          className={styles.image}
          onClick={onHandlePopup}
        />
        <DeleteBox
          title="Удалить задачу"
          className={styles.image}
          onClick={onHandleDeleteTodo}
        />
        {isCompleted && (
          <div className={styles.todo_status}>
            <span>Completed</span>
          </div>
        )}
        {isExpiried && (
          <div className={styles.todo_status_expiried}>
            <span>Expiried</span>
          </div>
        )}
      </div>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {date !== "" && <span className={styles.date}>{date}</span>}
      </div>
      <div className={styles.body}>
        <span className={styles.title}>{textBody}</span>
      </div>
      <Popup
        trigger={showPopup}
        id={id}
        title={title}
        textBody={textBody}
        onHandlePopup={onHandlePopup}
      />
    </li>
  );
};
