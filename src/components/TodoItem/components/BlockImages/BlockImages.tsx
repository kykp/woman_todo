import React from "react";
import styles from "./BlockImages.module.scss";
import { RiDeleteBin7Line as DeleteBox } from "react-icons/ri";
import { MdOutlineCloudDone as Completed } from "react-icons/md";
import { FaPen as Change } from "react-icons/fa";

type TBlockImage = {
  onHandleToggleTodoCompleted: () => void;
  onHandlePopupChangeTitle: () => void;
  onHandleDeleteTodo: () => void;
};
export const BlockImages = ({
  onHandleToggleTodoCompleted,
  onHandlePopupChangeTitle,
  onHandleDeleteTodo,
}: TBlockImage) => {
  return (
    <>
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
    </>
  );
};
