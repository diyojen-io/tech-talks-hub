import BaseButton from '@/components/BaseButton';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import './index.scss';

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
      <BaseButton variant="primary-outline" size="small" label="Go to Detail" />
    </div>
  );
};

export default MeetingCard;
