import React, { useState } from "react";
import styles from "./TodoInputs.module.scss";

import { addTodo } from "../../store/todo/todosSlice";
import { useAppDispatch } from "../../helper/hook";
import { ITodo } from "../../store/todo/todosSlice";
import { AiOutlineFileAdd } from "react-icons/ai";
import { v4 } from "uuid";

const deafultTodo: ITodo = {
  id: "",
  title: "",
  textBody: "",
  isCompeted: false,
  file: false,
  date: "",
};

export const TodoInputs = () => {
  const [todoData, setTodoDate] = useState<ITodo>(deafultTodo);

  const dispatch = useAppDispatch();
  const uniqueId = v4();

  const onHandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoDate({ ...todoData, [name]: value, id: uniqueId, file: false });
  };
  const onHandleButtonClick = () => {
    dispatch(addTodo(todoData));
    setTodoDate(deafultTodo);
  };
  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      onHandleButtonClick();
    }
  };
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
          <input
            value={todoData.textBody}
            name="textBody"
            onKeyDown={onHandleKeyDown}
            onChange={onHandleChangeInput}
            placeholder="Введите задачу"
            type="text"
            className={styles.body_title_input}
          />
          <div title="Прикрепит файл" className={styles.file_imgae_block}>
            <AiOutlineFileAdd className={styles.input_file} />
          </div>
        </div>
      </div>

      <button onClick={onHandleButtonClick} className={styles.button}>
        Enter
      </button>
    </>
  );
};
