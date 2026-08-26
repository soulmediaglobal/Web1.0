import React from 'react';
import { Hero } from '../components/Hero';
import { VisionMission } from '../components/VisionMission';
import { Services } from '../components/Services';
import { Leadership } from '../components/Leadership';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <VisionMission />
      <Services />
      <Leadership />
    </>
  );
};