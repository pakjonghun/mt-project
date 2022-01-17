import React from "react";

interface ErrorMessageProps {
  styles: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ styles, message }) => {
  return <small className={styles}>{message}</small>;
};

export default ErrorMessage;
