// src/components/BalloonBoxes/BalloonBoxes.tsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  const [blockTwoColor, setBlockTwoColor] = useState('red');
  const [showBalloon, setShowBalloon] = useState(false);

  const playerLeft = playerPosition; // this is unnecessary but improves readability
  const playerRight = playerPosition + 30; // the player is 30px wide
  const jumpPeakStage = 2; // 2 is the peak of the jump

  const isUnlockedRef = useRef(isUnlocked);
  const balloonColorRef = useRef(balloonColor);
  const blockTwoColorRef = useRef(blockTwoColor);
  const showBalloonRef = useRef(showBalloon);

  // Calculate the left and right bounds of this component's boxes
  // Although not a heavy computation, useMemo is good practice here because it will prevent unnecessary re-renders, also useMemo will clearly indicate that boxBounds should only update if left is changed. 
  const boxBounds = useMemo(() => ({
    boxOne: { start: left, end: left + 30 },
    boxTwo: { start: left + 90, end: left + 120 },
    boxThree: { start: left + 180, end: left + 210 },
    boxFour: { start: left + 270, end: left + 300 }
  }), [left]);



  const checkCollision = useCallback((playerLeft: number, playerRight: number) => {
    if (playerRight >= boxBounds.boxOne.start && playerLeft <= boxBounds.boxFour.end) {

      // Box One Collision
      if (playerRight >= boxBounds.boxOne.start && playerLeft <= boxBounds.boxOne.end) {
        if (!isUnlocked) {
          isUnlockedRef.current = true;
          showBalloonRef.current = true;
        }
      }

      // Box Two Collision
      else if (playerRight >= boxBounds.boxTwo.start && playerLeft <= boxBounds.boxTwo.end) {
        if (isUnlocked) {
          // change the color of block two
          const colors = ['red', 'green', 'orange', 'blue'];
          blockTwoColorRef.current = colors[(colors.indexOf(blockTwoColorRef.current) + 1) % colors.length];
          console.log('set block color two');
        }
      }

      // Box Three Collision
      else if (playerRight >= boxBounds.boxThree.start && playerLeft <= boxBounds.boxThree.end) {
        if (isUnlocked) {
          balloonColorRef.current = blockTwoColorRef.current;
        }
      }

      // Box Four Collision
      else if (playerRight >= boxBounds.boxFour.start && playerLeft <= boxBounds.boxFour.end) {
        if (isUnlocked) {
          isUnlockedRef.current = false;
          showBalloonRef.current = false;
        }
      }
    }
  }, [boxBounds, isUnlocked]);

  useEffect(() => {
    if (jumpStage === jumpPeakStage) {
      checkCollision(playerLeft, playerRight);
      // No need to directly set states here, as refs are updated in checkCollision
    }
  }, [jumpStage, playerLeft, playerRight, checkCollision]);

  useEffect(() => {
    if (jumpStage === jumpPeakStage) {
      // Update actual states with values from refs
      setIsUnlocked(isUnlockedRef.current);
      setShowBalloon(showBalloonRef.current);
      setBlockTwoColor(blockTwoColorRef.current);
      setBalloonColor(balloonColorRef.current);
    }
  }, [jumpStage]);

  return (
    <div className="balloon-box-container" style={{ left: `${left}px` }}>
      {/* First Box */}
      <div
        className="box"
        style={{ backgroundColor: isUnlocked ? 'successGreen' : 'black' }}
      ></div>
      {/* Second Box */}
      <div
        className="box"
        style={{ backgroundColor: isUnlocked ? blockTwoColor : 'grey', marginLeft: '60px' }}
      ></div>
      {/* Third Box */}
      <div
        className="box"
        style={{ backgroundColor: isUnlocked ? 'blue' : 'grey', marginLeft: '60px' }}
      ></div>
      {/* Fourth Box */}
      <div
        className="box"
        style={{ backgroundColor: isUnlocked ? 'red' : 'grey', marginLeft: '60px' }}
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