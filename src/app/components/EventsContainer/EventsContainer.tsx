import React from "react";
import ContentCard from "../EventCard/EventCard";
import "./EventsContainer.scss";

interface EventsContainerProps {
  cards: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
}

const EventsContainer: React.FC<EventsContainerProps> = ({ cards }) => {
  return (
    <div className="events-container">
      <h1 className="events-container__header">Events</h1>
      <div className="events-container__contents">
        {cards.map((card, index) => (
          <ContentCard
            key={index}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsContainer;
