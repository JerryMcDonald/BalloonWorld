// src/components/Guardian/Guardian.tsx

import React from 'react';
import './Guardian.css';

interface GuardianProps {
  color: string;
  hasBalloon: boolean;
  favoriteBalloon: boolean;
}

const Guardian: React.FC<GuardianProps> = ({ color, hasBalloon, favoriteBalloon }) => {
  let direction = 'left';
  if (hasBalloon) {
    direction = favoriteBalloon ? 'up' : 'right';
  }

  return (
    <div className={`guardian ${direction}`} style={{ borderColor: `transparent transparent transparent ${color}` }}></div>
  );
};

export default Guardian;