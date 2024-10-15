import React from "react";
import "./BaseButton.scss";

interface BaseButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "teritary"
    | "primary-outline"
    | "secondary-outline"
    | "teritary-outline"
    | "login";
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = "primary",
  size = "medium",
  label,
  onClick,
  ...other
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      {...other}
    >
      {label}
    </button>
  );
};

export default BaseButton;
