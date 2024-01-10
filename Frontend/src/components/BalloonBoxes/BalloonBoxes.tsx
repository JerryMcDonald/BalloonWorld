// src/components/BalloonBoxes/BalloonBoxes.tsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './BalloonBoxes.css';
import Guardian from '../Guardian/Guardian';
import { addBalloon, deleteBalloon, updateBalloon } from '../../services/balloonService';


// Define a type for the component props
interface BalloonBoxesProps {
  left: number;
  playerPosition: number;
  jumpStage: number;
  initialBalloonStatus:string;
  initialBalloonId: number;
  guardian: string;
  updateGuardians: (id: number, guardian: string, color: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BalloonBoxes: React.FC<BalloonBoxesProps> = ({ left, playerPosition, jumpStage, initialBalloonStatus, initialBalloonId, guardian, updateGuardians }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [balloonColor, setBalloonColor] = useState('red');
  const [blockTwoColor, setBlockTwoColor] = useState('red');
  const [showBalloon, setShowBalloon] = useState(false);
  // const [balloonId, setBalloonId] = useState(initialBalloonId)

  const playerLeft = playerPosition; // this is unnecessary but improves readability
  const playerRight = playerPosition + 30; // the player is 30px wide
  const jumpPeakStage = 2; // 2 is the peak of the jump

  const isUnlockedRef = useRef(isUnlocked);
  const balloonColorRef = useRef(balloonColor);
  const blockTwoColorRef = useRef(blockTwoColor);
  const showBalloonRef = useRef(showBalloon);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const balloonIdRef = useRef(initialBalloonId)

  // Calculate the left and right bounds of this component's boxes
  // Although not a heavy computation, useMemo is good practice here because it will prevent unnecessary re-renders, also useMemo will clearly indicate that boxBounds should only update if left is changed. 
  const boxBounds = useMemo(() => ({
    boxOne: { start: left, end: left + 30 },
    boxTwo: { start: left + 90, end: left + 120 },
    boxThree: { start: left + 180, end: left + 210 },
    boxFour: { start: left + 270, end: left + 300 }
  }), [left]);

  // Determine the guardian's color
  const guardianColor = guardian === 'BalloonKing' ? 'green' :
                        guardian === 'BalloonGenie' ? 'purple' : 'blue';



  const checkCollision = useCallback(async (playerLeft: number, playerRight: number) => {
    if (playerRight >= boxBounds.boxOne.start && playerLeft <= boxBounds.boxFour.end) {

      // Box One Collision
      if (playerRight >= boxBounds.boxOne.start && playerLeft <= boxBounds.boxOne.end) {
        if (!isUnlocked) {
          isUnlockedRef.current = true;
          balloonColorRef.current = blockTwoColorRef.current;
          showBalloonRef.current = true;
          try {
            const response = await addBalloon({color: blockTwoColorRef.current, guardian: guardian });
            if (response.id) {
              balloonIdRef.current = response.id
              updateGuardians(response.id, guardian, blockTwoColorRef.current)
            }
            console.log(response, 'added balloon')
          } catch (error) {
            console.error('Failed to add balloon:', error);
          }
        }
      }

      // Box Two Collision - change the color of the block
      else if (playerRight >= boxBounds.boxTwo.start && playerLeft <= boxBounds.boxTwo.end) {
        if (isUnlocked) {
          const colors = ['red', 'green', 'orange', 'blue', 'purple'];
          if (blockTwoColorRef.current === balloonColorRef.current) {
            blockTwoColorRef.current = colors[(colors.indexOf(blockTwoColorRef.current) + 1) % colors.length];

          } else {
            // remove the current balloon color from the choices
            const newColors = colors.filter(color => color !== balloonColorRef.current)
            blockTwoColorRef.current = newColors[(newColors.indexOf(blockTwoColorRef.current) + 1) % newColors.length];
          }

        }
      }

      // Box Three Collision
      else if (playerRight >= boxBounds.boxThree.start && playerLeft <= boxBounds.boxThree.end) {
        if (isUnlocked) {
          balloonColorRef.current = blockTwoColorRef.current;
          showBalloonRef.current = true;
          if (balloonIdRef.current) {
            try {
              await updateBalloon({ id: balloonIdRef.current, color: blockTwoColorRef.current, guardian: guardian } );
              updateGuardians(balloonIdRef.current, guardian, blockTwoColorRef.current)
              console.log('updated balloon')
            } catch (error) {
              console.error('Failed to update balloon:', error);
              // Handle the error appropriately
            }
          }
          
        }
      }

    

      // Box Four Collision
      else if (playerRight >= boxBounds.boxFour.start && playerLeft <= boxBounds.boxFour.end) {
        if (isUnlocked) {
          isUnlockedRef.current = false;
          showBalloonRef.current = false;
          if (balloonIdRef.current) {
            try {
              await deleteBalloon(balloonIdRef.current);
              updateGuardians(balloonIdRef.current, guardian, 'noBalloon')

              console.log('deleted balloon')
            } catch (error) {
              console.error('Failed to delete balloon:', error);
              // Handle the error appropriately
            }
          }
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxBounds, isUnlocked, guardian]);

  useEffect(() => {
    if (initialBalloonStatus !== 'noBalloon') {
      showBalloonRef.current = true;
      setShowBalloon(true);
      isUnlockedRef.current = true;
      setIsUnlocked(true);
      balloonColorRef.current = initialBalloonStatus
      setBalloonColor(initialBalloonStatus)
      blockTwoColorRef.current = initialBalloonStatus
      setBlockTwoColor(initialBalloonStatus)
      balloonIdRef.current = initialBalloonId
      
      // No need to directly set states here, as refs are updated in checkCollision
    }
  }, [initialBalloonStatus, initialBalloonId]);

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
      if (balloonColorRef.current !== balloonColor) {
        // updateStatus(guardian, balloonColorRef.current);
        setBalloonColor(balloonColorRef.current);
        // updateStatus(guardian, balloonColorRef.current, showBalloonRef.current);
      }
    }
  }, [jumpStage, guardian, balloonColor]);

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
      <Guardian
        color={guardianColor}
        hasBalloon={showBalloon}
        favoriteBalloon={balloonColor === guardianColor}
      />
    </div>
  );
};

export default BalloonBoxes;