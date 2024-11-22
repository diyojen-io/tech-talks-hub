import React from 'react';
import './index.scss';

interface BaseButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'teritary'
    | 'primary-outline'
    | 'secondary-outline'
    | 'teritary-outline';

  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  size = 'medium',
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
