import ModalContainer from '@/components/modals/ModalContainer';
import { AuthProvider } from '@/context/AuthContext';
import { ModalProvider } from '@/context/ModalContext';
import ThemeProvider from '@/theme';
import { SnackbarProvider } from 'notistack';
import AppLayout from './AppLayout';

export default function ProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <ModalProvider>
            <ModalContainer />
            <AppLayout>{children}</AppLayout>
          </ModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
