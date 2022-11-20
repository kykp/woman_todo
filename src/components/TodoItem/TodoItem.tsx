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
import {
  deleteTodoFromDB,
  getUrl,
  toggleTodoCompleted,
} from "../../helper/firebase";
import { Popup } from "../Popup/Popup";
import { FilesPopup } from "../TodoInputs/components/FilesPopup/FilesPopup";
import { getDownloadURL } from "firebase/storage";
import clsx from "clsx";
import dayjs from "dayjs";
const currentDate = new Date().toISOString().split("T")[0];

export const TodoItem = ({
  id,
  title,
  textBody,
  date,
  attachedFiles,
  isCompleted,
  isExpiried,
  isFiled,
}: ITodo) => {
  const [showPopupChangeTitle, setShowPopupChangeTitle] = useState(false);
  const [showPopupFiles, setShowPopupFiles] = useState(false);
  const [urls, setUrls] = useState<string[]>([]);

  const onHandlePopupChangeTitle = () => {
    setShowPopupChangeTitle(!showPopupChangeTitle);
  };

  const onHandlePopupShowFiles = async () => {
    setShowPopupFiles(!showPopupFiles);
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

  const onHandleDeleteTodo = () => {
    dispatch(deleteTodo({ id }));
    deleteTodoFromDB(id, attachedFiles);
  };

  const onHandleToggleTodoCompleted = () => {
    toggleTodoCompleted(id);
    dispatch(toggleTodo({ id }));
  };

  useEffect(() => {
    async function getUrls() {
      const array = await getUrl(id);
      array.forEach(async (el) => {
        const item = await getDownloadURL(el);
        setUrls((prev) => [...prev, item]);
      });
    }

    if (showPopupFiles) {
      getUrls();
    }

    return () => setUrls([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopupFiles]);

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
          onClick={onHandlePopupChangeTitle}
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
        {isFiled && (
          <div
            onClick={onHandlePopupShowFiles}
            className={styles.todo_status_have_files}
          >
            <span>Files</span>
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
        trigger={showPopupChangeTitle}
        id={id}
        title={title}
        textBody={textBody}
        onHandlePopup={onHandlePopupChangeTitle}
      />
      <FilesPopup
        trigger={showPopupFiles}
        id={id}
        urls={urls}
        attachedFiles={attachedFiles}
        title={title}
        textBody={textBody}
        onHandlePopup={onHandlePopupShowFiles}
      />
    </li>
  );
};
