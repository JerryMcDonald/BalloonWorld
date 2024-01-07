// src/components/Game/Game.tsx

import React, { useState, useEffect, useRef } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const landWidth = 4000; // Specific width of the land
  const [playerPosition, setPlayerPosition] = useState(0); // Start at the beginning of the land

  // This useEffect is the key to the scrolling effect. It runs every time the playerPosition changes.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const moveStep = 30; 
      if (event.key === 'ArrowLeft') {
        // Math.max is used to ensure that the player's position doesn't go below 0, which is the starting point of the land. It's like saying, "Move left, but stop if you reach the very beginning of the land."
        setPlayerPosition(prev => Math.max(prev - moveStep, 0));
      } else if (event.key === 'ArrowRight') {
        // Math.min ensures that the player doesn't go past the right edge of the land (landWidth - 30). It's like saying, "Move right, but don't go off the edge of the land."
        setPlayerPosition(prev => Math.min(prev + moveStep, landWidth - 30)); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // This checks if the game container (div with ref={gameContainerRef}) is currently available in the DOM. It's a safety check to ensure the container exists before trying to modify it.
    if (gameContainerRef.current) {
      const container = gameContainerRef.current;
      // This calculates half the width of the browser window. It's used to determine the scroll position needed to keep the player centered.
      const halfWindow = window.innerWidth / 2;

      // Scroll the container to keep the player centered, but don't exceed the land bounds
      container.scrollLeft = Math.min(Math.max(0, playerPosition - halfWindow), landWidth - window.innerWidth);
      console.log(container.scrollLeft);
    }
  }, [playerPosition]);

  return (
    <div ref={gameContainerRef} className="game-container">
      <div className="land"></div>
      <div className="player" style={{ left: `${playerPosition}px` }}></div>
    </div>
  );
};

export default Game;