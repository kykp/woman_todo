import React, { useEffect, useState } from "react";
import styles from "./TodoInputs.module.scss";

import { addTodo } from "../../store/todo/todosSlice";
import { useAppDispatch } from "../../helper/hook";
import { ITodo } from "../../store/todo/todosSlice";
import { v4 } from "uuid";
import { addTodoToDB } from "../../helper/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

const deafultTodo: ITodo = {
  id: "",
  title: "",
  textBody: "",
  isCompleted: false,
  file: null,
  date: "",
  isExpiried: false,
};

const MYid = "Konstantin-id";
export const TodoInputs = () => {
  const [todoData, setTodoDate] = useState<ITodo>(deafultTodo);
  const [filesUpload, setFilesUpload] = useState<any>([]);
  const [url, setUrl] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const uniqueId = v4();

  const onHandleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoDate({ ...todoData, [name]: value, id: uniqueId, file: null });
  };
  const createTodo = async () => {
    addTodoToDB(todoData);
    dispatch(addTodo({ ...todoData }));
    setTodoDate(deafultTodo);
  };
  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray: any = e.target.files;
    for (let i = 0; i < filesArray.length; i++) {
      const newFile = filesArray[i];
      setFilesUpload((prevState: any) => [...prevState, newFile]);
    }
  };

  const imageSender = async () => {
    filesUpload.map(async (file: any) => {
      const imageRef = ref(storage, `${MYid}/${file.name}`);
      await uploadBytes(imageRef, file).then(() => {
        console.log("uploaded finished");
      });
    });
  };

  // useEffect(() => {
  //   listAll(imagesListRef).then((resp) => {
  //     resp.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setUrl((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  const getUrl = async () => {
    const imagesListRef = ref(storage, `${MYid}/`);
    listAll(imagesListRef).then((resp) => {
      resp.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setUrl((prev) => [...prev, url]);
        });
      });
    });
  };
  console.log(url);
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
      <button onClick={imageSender}>ImageSend</button>
      <button onClick={getUrl}>get Links</button>
    </>
  );
};
