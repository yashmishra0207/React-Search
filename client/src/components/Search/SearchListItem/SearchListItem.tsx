import React, { memo } from "react";

interface PropsInterface {
  text: string;
}

const SearchListItem: React.FC<PropsInterface> = ({text}) => (
  <div>{text}</div>
);

export default memo(SearchListItem);
