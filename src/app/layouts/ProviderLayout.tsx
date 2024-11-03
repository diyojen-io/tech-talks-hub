'use client';
import Navbar from '@/app/components/Navbar/Navbar';
import ModalContainer from '@/app/modals/ModalContainer';
import { ModalProvider } from '../context/ModalContext';
import { AuthProvider } from '../context/AuthContext';
import { SnackbarProvider } from 'notistack';

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
