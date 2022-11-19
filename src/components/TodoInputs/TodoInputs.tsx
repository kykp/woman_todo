import React, { useState } from "react";
import styles from "./TodoInputs.module.scss";

import { addTodo } from "../../store/todo/todosSlice";
import { useAppDispatch } from "../../helper/hook";
import { ITodo } from "../../store/todo/todosSlice";
import { v4 } from "uuid";
import { addTodoToDB, attachImages } from "../../helper/firebase";

const deafultTodo: ITodo = {
  id: "",
  title: "",
  textBody: "",
  isCompleted: false,
  isFiled: false,
  date: "",
  isExpiried: false,
};
export const TodoInputs = () => {
  const [todoData, setTodoDate] = useState<ITodo>(deafultTodo);
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const [url, setUrl] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const uniqueId = v4();

  const onHandleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoDate({
      ...todoData,
      [name]: value,
      id: uniqueId,
    });
  };
  const createTodo = async () => {
    attachImages(filesUpload, todoData.id);
    dispatch(addTodo({ ...todoData }));
    addTodoToDB(todoData);
    setTodoDate(deafultTodo);
  };
  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = e.target.files;
    if (filesArray) {
      for (let i = 0; i < filesArray.length; i++) {
        const newFile = filesArray[i];
        setFilesUpload((prevState) => [...prevState, newFile]);
      }
    }
  };

  React.useEffect(() => {
    if (filesUpload.length > 0) {
      setTodoDate({
        ...todoData,
        isFiled: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesUpload.length]);

  return (
    <>
      <div className={styles.todo_inputs_block}>
        <div className={styles.title_and_time_block}>
          <input
            onChange={onHandleChangeInput}
            placeholder="Введите заголовок"
            type="text"
            name="title"
            value={todoData.title}
            className={styles.title_input}
          />
          <input
            onChange={onHandleChangeInput}
            type="date"
            name="date"
            value={todoData.date}
            className={styles.date_input}
          />
        </div>
        <div className={styles.body_title}>
          <textarea
            value={todoData.textBody}
            name="textBody"
            onKeyDown={onHandleKeyDown}
            onChange={onHandleChangeInput}
            placeholder="Введите задачу"
            className={styles.body_title_input}
          />
        </div>

        <input
          type="file"
          title="Прикрепит файл"
          multiple
          className={styles.file_input}
          onChange={handleChange}
        />
      </div>

      <button onClick={createTodo} className={styles.button}>
        Enter
      </button>
    </>
  );
};
