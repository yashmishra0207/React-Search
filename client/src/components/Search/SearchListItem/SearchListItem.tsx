import React, { memo, ReactElement } from "react";
import styles from "./SearchListItem.module.css";

interface PropsInterface {
  children: ReactElement;
}

const SearchListItem: React.FC<PropsInterface> = ({ children }) => (
  <div className={styles.main}>{children}</div>
);

export default memo(SearchListItem);
