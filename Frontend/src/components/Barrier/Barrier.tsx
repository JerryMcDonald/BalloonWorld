// src/components/Barrier/Barrier.tsx

import React from 'react';
import './Barrier.css';

interface BarrierProps {
  isLifted: boolean;
}

const Barrier: React.FC<BarrierProps> = ({ isLifted }) => {
  return (
    <div className={`barrier ${isLifted ? 'lifted' : ''}`}></div>
  );
};

export default Barrier;