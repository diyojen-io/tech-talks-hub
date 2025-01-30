import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import './index.scss';
import Button from '../Button/Button';

interface ContentCardProps {
  imageUrl: StaticImport;
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
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        priority
        style={{
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
      <h4 className="meeting-card__header">{title}</h4>
      <p className="meeting-card__text">{description}</p>
      <Button size="small" variant="outlined">
        Go to Detail
      </Button>
    </div>
  );
};

export default MeetingCard;
