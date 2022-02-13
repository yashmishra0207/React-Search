import React from 'react';
import styles from "./CustomError.module.css";

interface PropsInterface {
  message?: string;
  description?: string;
}

const CustomError: React.FC<PropsInterface> = ({message, description}) => (
  <div className={styles.main}>
    <h3 className={styles.message}>{message}</h3>
    {description && <p className={styles.description}>{description}</p>}
  </div>
);

CustomError.defaultProps = {
  message: "Something went wrong!",
  description: '',
};

export default CustomError;
