import React from "react";
import styles from "./HeaderItemBlock.module.scss";
import { RiDeleteBin7Line as DeleteBox } from "react-icons/ri";
import { MdOutlineCloudDone as Completed } from "react-icons/md";
import { FaPen as Change } from "react-icons/fa";

type THeaderItemBlock = {
  onHandleToggleTodoCompleted: () => void;
  onHandlePopupChangeTitle: () => void;
  onHandleDeleteTodo: () => void;
  date: string;
};
export const HeaderItemBlock = ({
  onHandleToggleTodoCompleted,
  onHandlePopupChangeTitle,
  onHandleDeleteTodo,
  date,
}: THeaderItemBlock) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_img}>
        <Completed
          title="Пометить как выполнено"
          onClick={onHandleToggleTodoCompleted}
          className={styles.image}
        />
        <Change
          title="Изменить задачу"
          className={styles.image}
          onClick={onHandlePopupChangeTitle}
        />
        <DeleteBox
          title="Удалить задачу"
          className={styles.image}
          onClick={onHandleDeleteTodo}
        />
      </div>
      {date && (
        <div className={styles.header_date}>
          <span className={styles.date}>{date}</span>
        </div>
      )}
    </div>
  );
};
