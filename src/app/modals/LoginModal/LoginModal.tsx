"use client";

import React from 'react';
import BaseModal from '../BaseModal/BaseModal';
import BaseButton from "@/app/components/BaseButton/BaseButton";
import './LoginModal.scss'

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="login-modal__title">Login</h2>
      <form>
        <div className="login-modal__form-group">
          <label className="login-modal__form-group__label" htmlFor="username">Username</label>
          <input className="login-modal__form-group__input" type="text" id="username" name="username" />
        </div>
        <div className="login-modal__form-group">
          <label className="login-modal__form-group__label" htmlFor="password">Password</label>
          <input className="login-modal__form-group__input" type="password" id="password" name="password" />
        </div>
        <BaseButton type="submit" label='Login' />
      </form>
    </BaseModal>
  );
};

export default LoginModal;
