import { ReactNode } from 'react';
import './FormCard.scss';

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function FormCard({ title, children }: CardProps) {
  return (
    <div className="card__container">
      <h3 className="card__title">{title}</h3>
      {children}
    </div>
  );
}
