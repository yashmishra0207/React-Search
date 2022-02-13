import React from 'react';

interface PropsInterface {
  message?: string;
  description?: string;
}

const CustomError: React.FC<PropsInterface> = ({message, description}) => (
  <div>
    <h3>{message}</h3>
    {description && <p>{description}</p>}
  </div>
);

CustomError.defaultProps = {
  message: "Some Error Occured!",
  description: '',
};

export default CustomError;
