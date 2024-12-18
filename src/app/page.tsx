'use client';
import { cards } from '@/_mocks/cards';
import { Button } from '@/components';
import AboutUs from '@/components/AboutUs';
import EventsContainer from '@/components/EventsContainer';
import { primary } from '@/theme/palette';
import shape from '@/theme/shape';
import { Box, Typography } from '@mui/material';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <>
      <AboutUs />
      <EventsContainer cards={cards} />
      <Box
        data-id="kerem"
        width={'20px'}
        height={'20px'}
        bgcolor={primary.main}
        borderRadius={shape.borderRadius}
      >
        <Button onClick={handleClick}></Button>
        <Typography variant="body1">ASDASDAS</Typography>
      </Box>
    </>
  );
}
