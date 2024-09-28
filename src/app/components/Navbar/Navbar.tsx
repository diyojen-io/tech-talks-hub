"use client";

import BaseButton from "../BaseButton/BaseButton";
import "./Navbar.scss";
import { useModalContext } from '../../context/ModalContext';
import React from "react";

const Navbar = () => {
  const { openModal } = useModalContext();
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        TechTalks
        <span>hub</span>
      </a>
      <div className="navbar-nav">

        <BaseButton onClick={() => openModal('login')} variant="primary" size="large" label="Login" />
        <BaseButton onClick={() => openModal('signup')} variant="primary-outline" size="large" label="Sign Up" />
      </div>
    </nav>
  );
};

export default Navbar;
