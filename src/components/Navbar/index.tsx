'use client';

import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import './index.scss';
import AccountMenu from '../AccountMenu';
import Button from '../Button';

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
            <Button onClick={() => openModal('login')} variant="primary">
              Login
            </Button>
            <Button
              onClick={() => openModal('signup')}
              variant="primary_outlined"
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
