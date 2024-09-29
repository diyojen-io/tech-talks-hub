"use client";

import { useState } from "react";
import BaseModal from "../BaseModal/BaseModal";
import BaseButton from "@/app/components/BaseButton/BaseButton";
import "./SignUpModal.scss";
import useAuth from "@/app/context/AuthContext";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const { register } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(username, email, password);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h2 className="sign-up-modal__title">Sign Up</h2>
      <form className="sign-up-modal__form" onSubmit={handleSubmit}>
        <div className="sign-up-modal__form-group">
          <label
            className="sign-up-modal__form-group__label"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="sign-up-modal__form-group__input"
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="sign-up-modal__form-group">
          <label className="sign-up-modal__form-group__label" htmlFor="email">
            Email:
          </label>
          <input
            className="sign-up-modal__form-group__input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="sign-up-modal__form-group">
          <label
            className="sign-up-modal__form-group__label"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="sign-up-modal__form-group__input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <BaseButton type="submit" label="Sign up" size="large" />
      </form>
    </BaseModal>
  );
};

export default SignUpModal;
