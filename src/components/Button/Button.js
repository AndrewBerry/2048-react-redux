import React from "react";
import "./Button.css";

const generateModifiers = modifiers =>
  modifiers.map(modifier => `Button--${modifier}`).join(" ");

export const Button = ({
  children,
  className = "",
  modifiers = [],
  ...remainingProps
}) => (
  <button
    className={`${className} Button ${generateModifiers(modifiers)}`}
    {...remainingProps}
  >
    {children}
  </button>
);
