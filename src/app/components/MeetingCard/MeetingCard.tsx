import React from 'react';
import BaseButton from "@/app/components/BaseButton/BaseButton";
import './MeetingCard.scss'

interface ContentCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const MeetingCard: React.FC<ContentCardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="meeting-card">
      <img className="meeting-card__image" src={imageUrl} alt={title} />
        <h4 className="meeting-card__header">{title}</h4>
        <p className="meeting-card__text">{description}</p>
        <BaseButton variant="primary-outline" size="small" label="Go to Detail" />
    </div>
  );
};

export default MeetingCard;
