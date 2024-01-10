// src/components/BalloonBoxes/BalloonBoxes.tsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './BalloonBoxes.css';

// Define a type for the component props
interface BalloonBoxesProps {
  left: number;
  playerPosition: number;
  jumpStage: number;
  guardian: string;
  updateStatus: (guardian: string, color: string, showBalloon: boolean) => void;
}

const BalloonBoxes: React.FC<BalloonBoxesProps> = ({ left, playerPosition, jumpStage, guardian, updateStatus }) => {
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

      // Box Two Collision - change the color of the block
      else if (playerRight >= boxBounds.boxTwo.start && playerLeft <= boxBounds.boxTwo.end) {
        if (isUnlocked) {
          const colors = ['red', 'green', 'orange', 'blue', 'purple'];
          if (blockTwoColorRef.current === balloonColorRef.current) {
            blockTwoColorRef.current = colors[(colors.indexOf(blockTwoColorRef.current) + 1) % colors.length];
            // console.log(blockTwoColorRef.current, 'top');
            // console.log(playerRight, 'right', boxBounds.boxTwo.start, 'start');
            // console.log(playerLeft, 'left', boxBounds.boxTwo.end, 'end');

          } else {
            // remove the current balloon color from the choices
            const newColors = colors.filter(color => color !== balloonColorRef.current)
            blockTwoColorRef.current = newColors[(newColors.indexOf(blockTwoColorRef.current) + 1) % newColors.length];
            // console.log(blockTwoColorRef.current, 'bottom');
            // console.log(playerRight, 'right', boxBounds.boxTwo.start, 'start');
            // console.log(playerLeft, 'left', boxBounds.boxTwo.end, 'end');
          }

        }
      }

      // Box Three Collision
      else if (playerRight >= boxBounds.boxThree.start && playerLeft <= boxBounds.boxThree.end) {
        if (isUnlocked) {
          balloonColorRef.current = blockTwoColorRef.current;
          console.log(playerRight, 'right', boxBounds.boxThree.start, 'start', '3');
            console.log(playerLeft, 'left', boxBounds.boxThree.end, 'end', '3');
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
      updateStatus(guardian, balloonColorRef.current, showBalloonRef.current);
    }
  }, [jumpStage, guardian, updateStatus]);

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
      {/* Guardian */}
      <div
          className="guardian"
          style={{ backgroundColor: balloonColor, top: '-100px' }}
        ><p>{guardian}</p></div>
    </div>
  );
};

export default BalloonBoxes;