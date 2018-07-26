import React from "react";
import "./Button.css";

export const Button = ({children, className = '', ...remainingProps}) => (
  <button className={`Button ${className}`} {...remainingProps}>{children}</button>
);
