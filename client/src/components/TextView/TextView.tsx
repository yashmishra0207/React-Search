import React, { memo } from "react";

interface TextViewPropsInterface {
  text: string;
  textToBeHighlighted?: string;
}

const TextView: React.FC<TextViewPropsInterface> = ({ text, textToBeHighlighted }) => {
  console.log(text)
  if (textToBeHighlighted) {
    const highlightedText:any = text.replace(new RegExp(textToBeHighlighted, 'i'), (match) => `<span style="color: red">${match}</span>`)
    return <p dangerouslySetInnerHTML={{__html: highlightedText}} />
  }

  return <p>{text}</p>
};

TextView.defaultProps = {
  textToBeHighlighted: '',
}

export default memo(TextView);
