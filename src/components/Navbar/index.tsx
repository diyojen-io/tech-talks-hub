'use client';

import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import './index.scss';
import AccountMenu from '../AccountMenu';
import Button from '../Button/Button';

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
            <Button
              className="small-btn"
              aria-label="login-btn"
              onClick={() => openModal('login')}
            >
              Login
            </Button>
            <Button
              className="small-btn"
              aria-label="signup-btn"
              variant="outlined"
              onClick={() => openModal('signup')}
            >
              SignUp
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
