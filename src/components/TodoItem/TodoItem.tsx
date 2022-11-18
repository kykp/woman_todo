import React, { useState, useEffect } from "react";
import styles from "./TodoItem.module.scss";
import {
  deleteTodo,
  ITodo,
  toggleTodo,
  changeTodoTextFields,
  setExpiredTodo,
} from "../../store/todo/todosSlice";
import { RiDeleteBin7Line as DeleteBox } from "react-icons/ri";
import { MdOutlineCloudDone as Completed } from "react-icons/md";
import { FaPen as Change } from "react-icons/fa";
import { useAppDispatch } from "../../helper/hook";
import clsx from "clsx";
import dayjs from "dayjs";
import { Popup } from "../Popup/Popup";

const currentDate = new Date().toISOString().split("T")[0];

export const TodoItem = ({
  id,
  title,
  textBody,
  date,
  isCompeted,
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
  }, [date]);

  const dispatch = useAppDispatch();

  const onHandleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
  };
  const onHandleToggleTodo = () => {
    dispatch(toggleTodo({ id }));
  };

  return (
    <li
      className={clsx(
        styles.todo_item,
        isCompeted ? styles.active : null,
        isExpiried ? styles.expired : null
      )}
    >
      <div className={styles.block_controls}>
        <Completed
          title="Пометить как выполнено"
          onClick={onHandleToggleTodo}
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
        {isCompeted && (
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
