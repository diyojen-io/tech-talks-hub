'use client';
import { cards } from '@/_mocks/cards';
import AboutUs from '@/components/AboutUs';
import EventsContainer from '@/components/EventsContainer';

export default function Home() {
  return (
    <>
      <AboutUs />
      <EventsContainer cards={cards} />
    </>
  );
}
