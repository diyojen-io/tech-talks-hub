import React from "react";
import "./BaseButton.scss";

interface BaseButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "teritary"
    | "primary-outline"
    | "secondary-outline"
    | "teritary-outline";
  size?: "small" | "medium" | "large";
  label: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = "primary",
  size = "medium",
  label,
}) => {
  return <button className={`btn btn-${variant} btn-${size}`}>{label}</button>;
};

export default BaseButton;
