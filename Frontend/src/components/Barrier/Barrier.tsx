// src/components/Barrier/Barrier.tsx

import React from 'react';
import './Barrier.css';
import BalloonBarrier from '../../assets/background/BalloonBarrier.png'

interface BarrierProps {
  isLifted: boolean;
}

const Barrier: React.FC<BarrierProps> = ({ isLifted }) => {
  return (
    <div className={`barrier ${isLifted ? 'lifted' : ''}`}>
      <img src={BalloonBarrier} alt='barrier' />
    </div>
  );
};

export default Barrier;