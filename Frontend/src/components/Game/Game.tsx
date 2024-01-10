// src/components/Game/Game.tsx

import React, { useState, useEffect, useRef } from 'react';
import BalloonBoxes from '../BalloonBoxes/BalloonBoxes';
import Barrier from '../Barrier/Barrier';
import HotAirBalloon from '../HotAirBalloon/HotAirBalloon';
import './Game.css';

const Game: React.FC = () => {
  // useRef is like having a backstage pass in a React component. It lets you directly access and interact with the DOM, manipulate it, and keep some values around without causing any drama (re-renders). 
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const landWidth = 6000; // Specific width of the land
  const barrierPosition = 4500; // Position of the barrier
  const playerWidth = 30; // the player is 30px wide
  // Set initial player position to the middle of the viewport
  const [playerPosition, setPlayerPosition] = useState(window.innerWidth / 2);
  const [jumpStage, setJumpStage] = useState(0); // 0: on ground, 1: mid-jump, 2: top of jump
  // maintain a state that tracks whether each Guardian has the correct balloon color
  const [balloonStatus, setBalloonStatus] = useState({
    BalloonKing: false,
    BalloonGenie: false,
    BalloonSomething: false
  }); 
  // determines whether all conditions are met to lift the barrier
  const allBalloonsReady = balloonStatus.BalloonKing && balloonStatus.BalloonGenie && balloonStatus.BalloonSomething;


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateBalloonStatus = (guardian: string, _color: string, showBalloon: boolean) => {
    setBalloonStatus(prevStatus => ({
      ...prevStatus,
      // [guardian]: color === (guardian === 'BalloonKing' ? 'green' : guardian === 'BalloonGenie' ? 'purple' : 'blue')
      [guardian]: showBalloon

    }));
  };

  // This useEffect is the key to the scrolling and jumping effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const moveStep = 30;
      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
          // Math.max is used to ensure that the player's position doesn't go below 0, which is the starting point of the land. It's like saying, "Move left, but stop if you reach the very beginning of the land."
          setPlayerPosition(prev => Math.max(prev - moveStep, 0));
          break;
          case 'ArrowRight':
            case 'd':
              setPlayerPosition(prev => {
                // Calculate the new position
                const newPosition = prev + moveStep;
                // This code checks if allBalloonsReady is false (meaning the barrier is not lifted) and if the player's new position would be past the barrier. If both conditions are met, the player's position is set to just before the barrier.
                if (!allBalloonsReady && newPosition >= barrierPosition - playerWidth) {
                  return barrierPosition - playerWidth;
                }
                // Allow movement within the boundaries of the land
                return Math.min(newPosition, landWidth - playerWidth);
              });
              break;
        case ' ':
        case 'w':
        case 'ArrowUp':
          if (jumpStage === 0) { // Start jump only if on ground
            setJumpStage(1); // Mid-jump
            setTimeout(() => setJumpStage(2), 200); // Top of jump
            setTimeout(() => setJumpStage(1), 400); // Mid-jump again
            setTimeout(() => setJumpStage(0), 600); // Back to ground
          }
          break;
        default:
          break;
      }

    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [allBalloonsReady, jumpStage]);

  

  // UseEffect and UseRef to pan the viewport
  useEffect(() => {
    // This checks if the game container (div with ref={gameContainerRef}) is currently available in the DOM. It's a safety check to ensure the container exists before trying to modify it.
    if (gameContainerRef.current) {
      // Unlike state updates with useState, changing the .current property of the ref object does not cause your component to re-render. It’s like having a secret box in your component that you can put things in or take things out without React keeping an eye on it.
      const container = gameContainerRef.current;
      // This calculates half the width of the browser window. It's used to determine the scroll position needed to keep the player centered.
      const halfWindow = window.innerWidth / 2;
      // Scroll the container to keep the player centered, but don't exceed the land bounds
      container.scrollLeft = Math.min(Math.max(0, playerPosition - halfWindow), landWidth - window.innerWidth);
      // As the player moves right, scrollLeft increases because the viewport is moving to the right to follow the player, revealing more of the land on the left side.
      console.log(playerPosition, 'position')
    }
  }, [playerPosition]);

  // Function to determine player's bottom position based on jump stage
  const getJumpPosition = () => {
    switch (jumpStage) {
      case 1: return 'calc(15% + 80px)'; // Mid-jump
      case 2: return 'calc(15% + 140px)'; // Top of jump
      default: return 'calc(15% + 20px)'; // On ground
    }
  };

  return (
    <div ref={gameContainerRef} className="game-container">
      <div className="land"></div>
      <div className="player" style={{ left: `${playerPosition}px`, bottom: getJumpPosition() }}></div>
      <BalloonBoxes left={3000} playerPosition={playerPosition} jumpStage={jumpStage} guardian={'BalloonKing'} updateStatus={updateBalloonStatus} />
      <BalloonBoxes left={3500} playerPosition={playerPosition} jumpStage={jumpStage} guardian={'BalloonGenie'} updateStatus={updateBalloonStatus} />
      <BalloonBoxes left={4000} playerPosition={playerPosition} jumpStage={jumpStage} guardian={'BalloonSomething'} updateStatus={updateBalloonStatus} />
      <Barrier isLifted={allBalloonsReady} />
      <HotAirBalloon playerPosition={playerPosition} jumpStage={jumpStage} />
    </div>
  );
};

export default Game;