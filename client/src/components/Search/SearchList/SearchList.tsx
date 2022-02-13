import React, { memo, ReactElement } from "react";
import SearchListItem from "../SearchListItem/SearchListItem";
import styles from "./SearchList.module.css";

interface PropsInterface {
  children: ReactElement<typeof SearchListItem>[];
}

const SearchList: React.FC<PropsInterface> = ({ children }) => (
  <div className={styles.main}>{children}</div>
);

export default memo(SearchList);
