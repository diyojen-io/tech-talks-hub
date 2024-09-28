import React from 'react';
import ContentCard from '../MeetingCard/MeetingCard';
import './MeetingsConatiner.scss'

interface MeetingComponentProps {
  cards: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
}

const MeetingsContainer: React.FC<MeetingComponentProps> = ({ cards }) => {
  return (
    <div className="meetings-container">
      <h1 className="meetings-container__header">Meeting Overview</h1>
      <div className="meetings-container__contents">
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

export default MeetingsContainer;
