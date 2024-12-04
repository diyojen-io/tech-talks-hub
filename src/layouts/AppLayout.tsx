import Loading from '@/app/loading';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import useAuth from '@/context/AuthContext';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
