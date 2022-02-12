import React, { memo, ReactElement } from "react";
import SearchListItem from "../SearchListItem/SearchListItem";

interface PropsInterface {
  children: ReactElement<typeof SearchListItem>[];
}

const SearchList: React.FC<PropsInterface> = ({children}) => (
  <div>{children}</div>
);

export default memo(SearchList);
