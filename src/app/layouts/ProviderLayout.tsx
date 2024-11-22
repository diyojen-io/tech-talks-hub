'use client';
import Navbar from '@/app/components/Navbar/Navbar';
import ModalContainer from '@/app/modals/ModalContainer';
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
          </ModalProvider>
        </SnackbarProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
