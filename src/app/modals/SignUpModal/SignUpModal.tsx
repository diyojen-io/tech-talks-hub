"use client";

import React from 'react';
import BaseModal from '../BaseModal/BaseModal';
import BaseButton from "@/app/components/BaseButton/BaseButton";
import './SignUpModal.scss'

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="sign-up-modal__title">Sign Up</h2>
      <form>
        <div className="sign-up-modal__form-group">
          <label className="sign-up-modal__form-group__label" htmlFor="email">Email:</label>
          <input className="sign-up-modal__form-group__input" type="email" id="email" name="email" />
        </div>
        <div className="sign-up-modal__form-group">
          <label className="sign-up-modal__form-group__label" htmlFor="username">Username:</label>
          <input className="sign-up-modal__form-group__input" type="text" id="username" name="username" />
        </div>
        <div className="sign-up-modal__form-group">
          <label className="sign-up-modal__form-group__label" htmlFor="password">Password:</label>
          <input className="sign-up-modal__form-group__input" type="password" id="password" name="password" />
        </div>
        <BaseButton type="submit" label='Sign up' />
      </form>
    </BaseModal>
  );
};

export default SignUpModal;
