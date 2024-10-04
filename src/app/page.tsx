import AboutUs from "@/app/components/AboutUs/AboutUs";
import EventsContainer from "@/app/components/EventsContainer/EventsContainer";
import { cards } from "@/_mocks/cards";
import Footer from "@/app/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <AboutUs />
      <EventsContainer cards={cards} />
      <Footer />
    </>
  );
}
