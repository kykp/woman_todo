import React from "react";
import styles from "./Error.module.scss";

type TError = {
  error: string;
};
export const Error = ({ error }: TError) => {
  return (
    <div className={styles.error_block}>
      <h2 className={styles.error_message}>{error}</h2>
    </div>
  );
};
