import React from 'react';
import './index.scss';
import LoadingIndicator from '@/app/loading';
import Loading from '@/app/loading';

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
  isLoading?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  label,
  onClick,
  isLoading = false,
  ...other
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
      {...other}
    >
      {isLoading ? <Loading /> : label}
    </button>
  );
};

export default BaseButton;
