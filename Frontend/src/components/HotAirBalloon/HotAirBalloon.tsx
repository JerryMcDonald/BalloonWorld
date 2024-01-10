// src/components/HotAirBalloon/HotAirBalloon.tsx

import React, { useState, useEffect } from 'react';
import './HotAirBalloon.css';

interface HotAirBalloonProps {
  playerPosition: number;
  jumpStage: number;
  playerWidth: number;
  onPlayerJumpOn: () => void;
}

const HotAirBalloon: React.FC<HotAirBalloonProps> = ({ playerPosition, jumpStage, playerWidth, onPlayerJumpOn}) => {
  const [isLifted, setIsLifted] = useState(false);
  const balloonPosition = 4800;
  const jumpPeakStage = 2;

  useEffect(() => {
    // Check if player is in front of the balloon and jumps
    if (jumpStage === jumpPeakStage && playerPosition >= balloonPosition - playerWidth && playerPosition <= balloonPosition + 100) {
      setIsLifted(true);
      onPlayerJumpOn(); // Call the callback
      setTimeout(() => {
        window.location.reload(); // Refresh the page after the balloon is out of view
      }, 2000); // Adjust time based on animation duration
    }
  }, [jumpStage, onPlayerJumpOn, playerPosition, playerWidth]);

  return (
    <div className={`hot-air-balloon ${isLifted ? 'lift-off' : ''}`} style={{ left: `${balloonPosition}px` }}>
      {isLifted && <div className="player-on-balloon"></div>}
    </div>
  );
};

export default HotAirBalloon;