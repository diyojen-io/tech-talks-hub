import AboutUs from "@/app/components/AboutUs/AboutUs";
import MeetingsContainer from "@/app/components/MeetingsContainer/MeetingsContainer";

export default function Home() {
  const cards = [
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 1',
      description: 'Details about the first meeting.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 2',
      description: 'Details about the second meeting.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 3',
      description: 'Details about the third meeting.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 1',
      description: 'Details about the first meeting.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 2',
      description: 'Details about the second meeting.',
    },
    {
      imageUrl: 'https://via.placeholder.com/300x200',
      title: 'Meeting 3',
      description: 'Details about the third meeting.',
    },
  ];
  return <>
    <AboutUs />
    <MeetingsContainer cards={cards} />
  </>
}
