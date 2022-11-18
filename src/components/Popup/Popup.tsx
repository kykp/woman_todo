import React, { useState } from "react";
import styles from "./popup.module.scss";
import { PopupProps } from "./typeProps";
import { useAppDispatch } from "../../helper/hook";
import { changeTodoTextFields } from "../../store/todo/todosSlice";

export const Popup = (props: PopupProps) => {
  const dispatch = useAppDispatch();
  const { id, title, textBody, onHandlePopup } = props;

  const [newTodoInputs, setNewTodoInputs] = useState({
    changedTitle: title,
    changedBody: textBody,
  });

  const onHandleChangeTextFields = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodoInputs({ ...newTodoInputs, [name]: value });
  };

  const saveNewTodos = () => {
    dispatch(
      changeTodoTextFields({
        id,
        title: newTodoInputs.changedTitle,
        bodyText: newTodoInputs.changedBody,
      })
    );
    onHandlePopup();
  };
  return props.trigger ? (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <span>Title:</span>
            <textarea
              value={newTodoInputs.changedTitle}
              name="changedTitle"
              onChange={onHandleChangeTextFields}
              className={styles.title}
            />
          </div>

          <div className={styles.block}>
            <span>Body:</span>
            <textarea
              value={newTodoInputs.changedBody}
              onChange={onHandleChangeTextFields}
              name="changedBody"
              className={styles.body}
            />
          </div>
        </div>
        <div className={styles.block_button}>
          <button className={styles.button} onClick={saveNewTodos}>
            Сохранить
          </button>
          <button className={styles.button} onClick={onHandlePopup}>
            Отменить
          </button>
        </div>
        <button className={styles.close_btn} onClick={onHandlePopup}>
          x
        </button>
      </div>
    </div>
  ) : null;
};
