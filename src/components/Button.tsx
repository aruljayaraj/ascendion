import React from "react";
interface ButtonProps {
  children?: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
