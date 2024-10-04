"use client";

import { useState } from "react";
import BaseModal from "../BaseModal/BaseModal";
import BaseButton from "@/app/components/BaseButton/BaseButton";
import "./LoginModal.scss";
import useAuth from "@/app/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="login-modal__title">Login</h2>
      <form className="login-modal__form" onSubmit={handleSubmit}>
        <div className="login-modal__form-group">
          <label className="login-modal__form-group__label" htmlFor="username">
            Username
          </label>
          <input
            className="login-modal__form-group__input"
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-modal__form-group">
          <label className="login-modal__form-group__label" htmlFor="password">
            Password
          </label>
          <input
            className="login-modal__form-group__input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <BaseButton type="submit" label="Login" size="large" />
      </form>
    </BaseModal>
  );
};

export default LoginModal;
