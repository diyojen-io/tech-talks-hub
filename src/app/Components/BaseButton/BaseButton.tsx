import React from 'react';
import './BaseButton.scss';

const BaseButton = ({ variant = 'primary', size = 'medium', label, ...props }) => {
    return (
        <button className={`btn btn-${variant} btn-${size}`} {...props}>
            {label}
        </button>
    );
};

export default BaseButton;
