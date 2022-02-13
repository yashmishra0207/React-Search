import React, { memo, ReactElement } from "react";

interface PropsInterface {
  children: ReactElement;
}

const SearchListItem: React.FC<PropsInterface> = ({ children }) => (
  <div>{children}</div>
);

export default memo(SearchListItem);
