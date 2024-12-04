'use client';

import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import AccountPopover from '../AccountPopover';
import BaseButton from '../BaseButton';
import './index.scss';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModalContext();

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        TechTalks
        <span>hub</span>
      </a>
      <div className="navbar-nav">
        {isAuthenticated ? (
          <AccountPopover />
        ) : (
          <>
            <BaseButton
              onClick={() => openModal('login')}
              variant="primary"
              size="large"
              label="Login"
            />
            <BaseButton
              onClick={() => openModal('signup')}
              variant="primary-outline"
              size="large"
              label="Sign Up"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
