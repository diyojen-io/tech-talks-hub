'use client';

import BaseButton from "../BaseButton/BaseButton";
import "./Navbar.scss";
import { useModalContext } from '../../context/ModalContext';
import useAuth from "../../context/AuthContext";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from '@iconify/react';
import accountCircle from '@iconify/icons-ic/outline-account-circle';
import settingsIcon from '@iconify/icons-ic/outline-settings';
import logoutIcon from '@iconify/icons-ic/outline-logout'; 
import profileIcon from '@iconify/icons-ic/outline-person';

const Navbar = () => {
  const { openModal } = useModalContext();
  const { isAuthenticated, user, logout, isLoading } = useAuth(); 

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const togglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsPopoverOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        TechTalks
        <span>hub</span>
      </a>
      <div className="navbar-nav">
        {isLoading ? ( 
          <span>Loading...</span>
        ) : isAuthenticated && user ? (
          <div className="navbar-user" ref={popoverRef}>
            <div onClick={togglePopover} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Profile" width="40" height="40" />
              ) : (
                <Icon icon={accountCircle} width="40" height="40" />
              )}
            </div>
            {isPopoverOpen && (
              <div className="popover">
                <button className="popover-item">
                  <Icon icon={profileIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                  Profile
                </button>
                <button className="popover-item">
                  <Icon icon={settingsIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                  Settings
                </button>
                <div className="divider"></div>
                <button onClick={logout} className="popover-item">
                  <Icon icon={logoutIcon} width="20" height="20" style={{ marginRight: '8px' }} />
                  Logout
                </button>
              </div>
            )}
            <span>{user?.displayName || "username"}</span>
          </div>
        ) : (
          <>
            <BaseButton onClick={() => openModal('login')} variant="primary" size="large" label="Login" />
            <BaseButton onClick={() => openModal('signup')} variant="primary-outline" size="large" label="Sign Up" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
