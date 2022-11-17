import React from "react";
import styles from "./Popup.module.scss";
export const Popup = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <input type="text" className={styles.title} />
        <div className={styles.cross}>x</div>
      </div>
    </div>
  );
};
