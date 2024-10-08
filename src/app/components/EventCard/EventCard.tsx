import React from "react";
import BaseButton from "@/app/components/BaseButton/BaseButton";
import "./EventCard.scss";
import Image from "next/image";

interface ContentCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const MeetingCard: React.FC<ContentCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="meeting-card">
      <Image src={imageUrl} alt={title} width={300} height={200} />
      <h4 className="meeting-card__header">{title}</h4>
      <p className="meeting-card__text">{description}</p>
      <BaseButton variant="primary-outline" size="small" label="Go to Detail" />
    </div>
  );
};

export default MeetingCard;
