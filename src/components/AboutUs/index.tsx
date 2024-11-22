import React from 'react';
import BaseButton from '@/components/BaseButton';
import './index.scss';

const AboutUs: React.FC = () => {
  return (
    <div className="about-us">
      <h1 className="about-us__header">About Us</h1>
      <p>
        We are a team of passionate individuals dedicated to building
        high-quality web applications. Our mission is to deliver solutions that
        help our clients succeed in the digital world.
      </p>
      <BaseButton size="large" label="Create Organization" />
    </div>
  );
};

export default AboutUs;
