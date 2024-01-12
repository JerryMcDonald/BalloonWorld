// src/components/Guardian/Guardian.tsx

import React from 'react';
import './Guardian.css';

interface GuardianProps {
  color: string;
  showBalloon: boolean;
  favoriteBalloon: boolean;
}

const Guardian: React.FC<GuardianProps> = ({ color, showBalloon, favoriteBalloon }) => {
  let direction = 'left';
  if (showBalloon) {
    direction = favoriteBalloon ? 'up' : 'right';
  }

  return (
    <div className={`guardian ${direction}`} style={{ borderColor: `transparent transparent transparent ${color}` }}></div>
  );
};

export default Guardian;