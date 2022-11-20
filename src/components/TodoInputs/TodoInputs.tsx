import React, { useState, useEffect, useRef } from "react";
import styles from "./TodoInputs.module.scss";

import { addTodo } from "../../store/todo/todosSlice";
import { useAppDispatch } from "../../helper/hook";
import { ITodo } from "../../store/todo/todosSlice";
import { addTodoToDB, attachImages } from "../../helper/firebase";
import { Error } from "./components/Error/Error";

import { v4 } from "uuid";

const deafultTodo: ITodo = {
  id: "",
  title: "",
  textBody: "",
  isCompleted: false,
  isFiled: false,
  attachedFiles: [],
  date: "",
  isExpiried: false,
};
export const TodoInputs = () => {
  const [todoData, setTodoDate] = useState<ITodo>(deafultTodo);
  const [filesUpload, setFilesUpload] = useState<File[]>([]);
  const [attachedFilesNames, setAttachedFilesNames] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showAddFiles, setShowAddFiles] = useState(false);
  const [showAddDate, setShowAddDate] = useState(false);
  const dispatch = useAppDispatch();
  const uniqueId = v4();
  const filesRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (filesRef.current) filesRef.current.value = "";
  };

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

  const createTodo = () => {
    if (todoData.id === "") {
      setError("Введите данные в Todo");
    } else {
      attachImages(filesUpload, todoData.id);
      dispatch(addTodo({ ...todoData }));
      addTodoToDB(todoData);
      setTodoDate(deafultTodo);
      resetFileInput();
      setFilesUpload([]);
      setShowAddFiles(false);
      setShowAddDate(false);
    }
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
        setAttachedFilesNames((prevState) => [...prevState, newFile.name]);
        setFilesUpload((prevState) => [...prevState, newFile]);
      }
    }
  };

  useEffect(() => {
    if (filesUpload.length > 0) {
      setTodoDate({
        ...todoData,
        isFiled: true,
        attachedFiles: attachedFilesNames,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesUpload.length]);

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const onHandleSetData = () => {
    setShowAddDate(true);
  };
  const onHandleSetFiles = () => {
    setShowAddFiles(true);
  };
  return (
    <>
      {error && <Error error={error} />}
      <div className={styles.todo_inputs_block}>
        <div className={styles.title_block}>
          <input
            onChange={onHandleChangeInput}
            placeholder="Введите заголовок"
            type="text"
            name="title"
            value={todoData.title}
            className={styles.title_input}
          />
        </div>
        <div className={styles.body_title}>
          <textarea
            value={todoData.textBody}
            name="textBody"
            onKeyDown={onHandleKeyDown}
            onChange={onHandleChangeInput}
            placeholder="Введите задачу"
            className={styles.body_input}
          />
        </div>
        <div className={styles.chosen_block}>
          {showAddFiles ? (
            <input
              type="file"
              title="Прикрепит файл"
              multiple
              ref={filesRef}
              className={styles.file_input}
              onChange={handleChange}
            />
          ) : (
            <button onClick={onHandleSetFiles}>Добавить файлы</button>
          )}
          {showAddDate ? (
            <input
              onChange={onHandleChangeInput}
              type="date"
              name="date"
              value={todoData.date}
              className={styles.date_input}
            />
          ) : (
            <button onClick={onHandleSetData}>Установить дату</button>
          )}
        </div>

        <button onClick={createTodo} className={styles.button}>
          Ввод
        </button>
      </div>
    </>
  );
};
