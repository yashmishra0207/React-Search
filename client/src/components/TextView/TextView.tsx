import React, { memo } from "react";
import styles from "./TextView.module.css";

interface TextViewPropsInterface {
  text: string;
  textToBeHighlighted?: string;
}

const TextView: React.FC<TextViewPropsInterface> = ({ text, textToBeHighlighted }) => {
  if (textToBeHighlighted) {
    const highlightedText:any = text.replace(new RegExp(textToBeHighlighted, 'i'), (match) => `<span style="color: red">${match}</span>`)
    return <p className={styles["text-container"]} dangerouslySetInnerHTML={{__html: highlightedText}} />
  }

  return <p className={styles["text-container"]}>{text}</p>;
};

TextView.defaultProps = {
  textToBeHighlighted: '',
}

export default memo(TextView);
