// src/components/HotAirBalloon/HotAirBalloon.tsx

import React, { useState, useEffect } from 'react';
import './HotAirBalloon.css';
import HotAirBalloonEmpty from '../../assets/hotAirBalloon/HotAirBalloonEmpty.png';
import HotAirBalloonWithGerald from '../../assets/hotAirBalloon/HotAirBalloonWithGerald.png';

interface HotAirBalloonProps {
  playerPosition: number;
  jumpStage: number;
  playerWidth: number;
  onPlayerJumpOn: () => void;
}

const HotAirBalloon: React.FC<HotAirBalloonProps> = ({ playerPosition, jumpStage, playerWidth, onPlayerJumpOn }) => {
  const [isLifted, setIsLifted] = useState(false);
  const balloonPosition: number = 4400;
  const jumpPeakStage: number = 2;

  useEffect(() => {
    const AwesomeAfroLeft: number = playerPosition + 50; // players awesome afro starts at about 50px in from playerPosition
    const AwesomeAfroRight: number = playerPosition + 80; // players awesome afro is about 30px wide
    const HotAirBalloonLeft: number = balloonPosition + 150; // hot air balloon starts at about 50px in from playerPosition
    const HotAirBalloonRight: number = balloonPosition + 350; // hot air balloon is about 200px wide

    // Check if player is in front of the balloon and jumps
    if (jumpStage === jumpPeakStage && AwesomeAfroRight >= HotAirBalloonLeft && AwesomeAfroLeft <= HotAirBalloonRight) {
      setIsLifted(true);
      onPlayerJumpOn(); // make the player disappear
      setTimeout(() => {
        window.location.reload(); // Refresh the page after the balloon is out of view
      }, 2000); // Adjust time based on animation duration
    }
  }, [jumpStage, onPlayerJumpOn, playerPosition, playerWidth]);

  return (
    <div className={`hot-air-balloon ${isLifted ? 'lift-off' : ''}`} style={{ left: `${balloonPosition}px` }}>
      {isLifted && <img src={HotAirBalloonWithGerald} alt="HAB Image" />
      || <img src={HotAirBalloonEmpty} alt="HAB Image" />}
    </div>
  );
};

export default HotAirBalloon;