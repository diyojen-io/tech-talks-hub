'use client';
import Footer from '@/components/Footer';
import ModalContainer from '@/components/modals/ModalContainer';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import { ModalProvider } from '@/context/ModalContext';
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
