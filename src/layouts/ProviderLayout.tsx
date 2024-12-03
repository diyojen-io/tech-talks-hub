'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ModalContainer from '@/components/modals/ModalContainer';
import { ModalProvider } from '../context/ModalContext';
import { AuthProvider } from '../context/AuthContext';
import { LoadingProvider } from '../context/LoadingContext'; 
import { SnackbarProvider } from 'notistack';

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <ModalProvider>
            <ModalContainer />
            <header>
              <Navbar />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </ModalProvider>
        </SnackbarProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}