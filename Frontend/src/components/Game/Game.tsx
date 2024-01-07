import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameWidth = window.innerWidth * 2; // Twice the viewport width
  const [playerPosition, setPlayerPosition] = useState(0); // Start at the beginning of the land

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const moveStep = 30; // Adjust the step size as needed
      if (event.key === 'ArrowLeft') {
        setPlayerPosition(prev => Math.max(prev - moveStep, 0));
      } else if (event.key === 'ArrowRight') {
        setPlayerPosition(prev => {
          const newPosition = Math.min(prev + moveStep, gameWidth - 30); // Ensure the player doesn't go off the land
          if (gameContainerRef.current) {
            gameContainerRef.current.scrollLeft = newPosition - window.innerWidth / 2; // Adjust scrolling
          }
          return newPosition;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameWidth]);

  return (
    <div ref={gameContainerRef} className="game-container">
      <div className="land"></div>
      <div className="player" style={{ left: `${playerPosition}px` }}></div>
    </div>
  );
};

export default Game;
