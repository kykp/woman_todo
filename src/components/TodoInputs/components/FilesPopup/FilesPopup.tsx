import React from "react";
import styles from "./FilesPopup.module.scss";
import { PopupProps } from "./TypeFilesProps";

export const FilesPopup = (props: PopupProps) => {
  const { urls, onHandlePopup } = props;

  const onHandleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
    }
  };

  return props.trigger ? (
    <div className={styles.popup} onKeyDown={onHandleKeyDown}>
      <div className={styles.popup_inner}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            {urls.map((url, index) => (
              <a
                key={url}
                href={url}
                download={urls}
                rel="noreferrer"
                target="_blank"
              >
                <button className={styles.file_button}>{`File ${
                  index + 1
                }`}</button>
              </a>
            ))}
          </div>
        </div>
        <div className={styles.block_button}>
          <button className={styles.button}>Сохранить</button>
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
