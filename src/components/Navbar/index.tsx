'use client';

import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import BaseButton from '../BaseButton';
import './index.scss';
import AccountMenu from '../AccountMenu';

const Navbar = () => {
  const { openModal } = useModalContext();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        TechTalks
        <span>hub</span>
      </a>
      <div className="navbar-nav">
        {isAuthenticated ? (
          <AccountMenu />
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
