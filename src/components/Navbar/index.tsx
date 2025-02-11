'use client';

import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import useAuth from '@/context/AuthContext';
import { useModalContext } from '@/context/ModalContext';
import AccountMenu from '../AccountMenu';
import Button from '../Button/Button';

const Navbar = () => {
  const { openModal } = useModalContext();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#000',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          height: '80px',
          alignItems: 'center',
          p: { xs: '16px', md: '16px 48px' },
        }}
      >
        <Typography
          variant="h4"
          component="a"
          href="/"
          sx={{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 500,
            letterSpacing: '1px',
            padding: '5px 3px',
            backgroundColor: '#000',
            display: 'inline-block',
            cursor: 'pointer',
          }}
        >
          TechTalks
          <Box
            component="span"
            sx={{
              backgroundColor: 'primary.main',
              color: '#000',
              fontWeight: 600,
              borderRadius: '4px',
              px: '5px',
              ml: '5px',
            }}
          >
            hub
          </Box>
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: '#fff',
              fontWeight: 400,
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => router.push('/event')}
          >
            Create a Event
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#fff',
          }}
        >
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <>
              <Button
                onClick={() => openModal('login')}
                className="small-btn"
                sx={{
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Login
              </Button>
              <Button
                className="small-btn"
                onClick={() => openModal('signup')}
                variant="outlined"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
