'use client';
import React from 'react';
import BaseButton from '@/components/BaseButton';
import './index.scss';
import { useRouter } from 'next/navigation';

const AboutUs: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/organization/create');
  };

  return (
    <div className="about-us">
      <h1 className="about-us__header">About Us</h1>
      <p>
        We are a team of passionate individuals dedicated to building
        high-quality web applications. Our mission is to deliver solutions that
        help our clients succeed in the digital world.
      </p>
      <BaseButton
        size="large"
        label="Create Organization"
        onClick={handleClick}
      />
    </div>
  );
};

export default AboutUs;
