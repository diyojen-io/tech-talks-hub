import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import React from 'react';
import ContentCard from '../EventCard';
import './index.scss';
import { Container, Stack, Typography } from '@mui/material';
import { PRIMARY } from '@/theme/palette';

interface EventsContainerProps {
  cards: {
    imageUrl: StaticImport;
    title: string;
    description: string;
  }[];
}

const EventsContainer: React.FC<EventsContainerProps> = ({ cards }) => {
  return (
    <Container>
      <Stack
        py={{ xs: 3, md: 6 }}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Typography variant="h3" color={PRIMARY.main}>
          Events
        </Typography>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          width={'100%'}
          gap={3}
        >
          {cards.map((card, index) => (
            <ContentCard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default EventsContainer;
