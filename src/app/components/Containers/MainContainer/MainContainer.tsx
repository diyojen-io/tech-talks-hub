import './MainContainer.scss';
import { useLoading } from '../../context/LoadingContext'; 
import CircularProgress from '@mui/material/CircularProgress'; 

export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useLoading(); 

  return (
    <div className="main-layout">
      {isLoading ? (
        <div className="global-loading">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="main-container">{children}</div>
      )}
    </div>
  );
}
