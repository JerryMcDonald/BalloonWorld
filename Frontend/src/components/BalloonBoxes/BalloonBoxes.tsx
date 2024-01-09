// src/components/BalloonBoxes/BalloonBoxes.tsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './BalloonBoxes.css';

// Define a type for the component props
interface BalloonBoxesProps {
  left: number;
  playerPosition: number;
  jumpStage: number;
}

const BalloonBoxes: React.FC<BalloonBoxesProps> = ({ left, playerPosition, jumpStage }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [balloonColor, setBalloonColor] = useState('red');
  const [currentColor, setCurrentColor] = useState('red');
  const [showBalloon, setShowBalloon] = useState(false);

  const playerLeft = playerPosition; // this is unnecessary but improves readability
  const playerRight = playerPosition + 30; // the player is 30px wide
  const jumpPeakStage = 2; // 2 is the peak of the jump

  // Calculate the left and right bounds of this component's boxes
  // Although not a heavy computation, useMemo is good practice here because it will prevent unnecessary re-renders, also useMemo will clearly indicate that boxBounds should only update if left is changed. 
    const boxBounds = useMemo(() => ({
      boxOne: { start: left, end: left + 30 },
      boxTwo: { start: left + 90, end: left + 120 },
      boxThree: { start: left + 180, end: left + 210 },
      boxFour: { start: left + 270, end: left + 300 }
    }), [left]);


  const colors = ['red', 'green', 'orange', 'blue'];
  const nextColor = () => colors[(colors.indexOf(currentColor) + 1) % colors.length];

  const checkCollision = useCallback(() => {
    // Check if the player is within this component before performing additional logic
    if (jumpStage === jumpPeakStage && playerRight >= boxBounds.boxOne.start && playerLeft <= boxBounds.boxFour.end) {
      console.log('Player is within a BallonBoxes Component', left);

      // Implement the action based on which box was hit
      // You can add additional logic to distinguish between different boxes
      // For example, using the 'left' prop to determine which box it is
    }
  }, [jumpStage, left, boxBounds, playerLeft, playerRight]);

  // useEffect(() => {
  //   // Check for collision at the top of the jump
  //   if (jumpStage === 2 && playerPosition >= boxPosition - 30 && playerPosition <= boxPosition + 30) {
  //     console.log('box touched');
  //   }
  // }, [jumpStage, playerPosition]); // Run this effect when jumpStage or playerPosition changes

  useEffect(() => {
    checkCollision();
  }, [checkCollision]);


  return (
    <div className="balloon-box-container" style={{ left: `${left}px` }}>
      {/* First Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'successGreen' : 'black' }} 
        onClick={() => { setIsUnlocked(true); setShowBalloon(true); }}
      ></div>

      {/* Second Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? currentColor : 'grey', marginLeft: '60px' }} 
        onClick={() => { if (isUnlocked) setCurrentColor(nextColor()); }}
      ></div>

      {/* Third Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'blue' : 'grey', marginLeft: '60px' }} 
        onClick={() => { if (isUnlocked) setBalloonColor(currentColor); }}
      ></div>

      {/* Fourth Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'red' : 'grey', marginLeft: '60px' }} 
        onClick={() => { setIsUnlocked(false); setShowBalloon(false); setCurrentColor('red'); }}
      ></div>

      {/* Balloon */}
      {showBalloon && (
        <div 
          className="balloon" 
          style={{ backgroundColor: balloonColor, top: '-100px' }}
        ></div>
      )}
    </div>
  );
};

export default BalloonBoxes;