import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './BalloonBoxes.css';
import Guardian from '../Guardian/Guardian';
import { addBalloon, deleteBalloon, updateBalloon } from '../../services/balloonService';

// Define a type for the component props
interface BalloonBoxesProps {
  left: number;
  playerPosition: number;
  jumpStage: number;
  initialBalloonStatus: string;
  initialBalloonId: number;
  guardian: string;
  updateGuardians: (id: number, guardian: string, color: string) => void;
}

const BalloonBoxes: React.FC<BalloonBoxesProps> = ({ left, playerPosition, jumpStage, initialBalloonStatus, initialBalloonId, guardian, updateGuardians }) => {
  const [balloonData, setBalloonData] = useState({
    isUnlocked: initialBalloonStatus !== 'noBalloon',
    balloonColor: initialBalloonStatus !== 'noBalloon' ? initialBalloonStatus : 'red',
    blockTwoColor: initialBalloonStatus !== 'noBalloon' ? initialBalloonStatus : 'red',
    showBalloon: initialBalloonStatus !== 'noBalloon',
    balloonId: initialBalloonId,
  });

  const playerLeft = playerPosition; // this is unnecessary but improves readability
  const playerRight = playerPosition + 30; // the player is 30px wide
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const jumpPeakStage = 2; // 2 is the peak of the jump

  // Calculate the left and right bounds of this component's boxes
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
        if (!balloonData.isUnlocked) {
          try {
            const response = await addBalloon({ color: balloonData.blockTwoColor, guardian: guardian });
            if (response.id) {
              const int = response.id
              setBalloonData(prevData => ({
                ...prevData,
                isUnlocked: true,
                showBalloon: true,
                balloonColor: balloonData.blockTwoColor,
                balloonId: int
              }));
              updateGuardians(response.id, guardian, balloonData.blockTwoColor);
            }
          } catch (error) {
            console.error('Failed to add balloon:', error);
          }
        }
      }

      // Box Two Collision - change the color of the block
      else if (playerRight >= boxBounds.boxTwo.start && playerLeft <= boxBounds.boxTwo.end) {
        if (balloonData.isUnlocked) {
          const colors = ['red', 'green', 'orange', 'blue', 'purple'];
          const newBlockTwoColor = colors[(colors.indexOf(balloonData.blockTwoColor) + 1) % colors.length];
          setBalloonData(prevData => ({
            ...prevData,
            blockTwoColor: newBlockTwoColor
          }));
        }
      }

      // Box Three Collision
      else if (playerRight >= boxBounds.boxThree.start && playerLeft <= boxBounds.boxThree.end) {
        if (balloonData.isUnlocked && balloonData.balloonId) {
          try {
            await updateBalloon({ id: balloonData.balloonId, color: balloonData.blockTwoColor, guardian: guardian });
            setBalloonData(prevData => ({
              ...prevData,
              balloonColor: balloonData.blockTwoColor
            }));
            updateGuardians(balloonData.balloonId, guardian, balloonData.blockTwoColor);
          } catch (error) {
            console.error('Failed to update balloon:', error);
          }
        }
      }

      // Box Four Collision
      else if (playerRight >= boxBounds.boxFour.start && playerLeft <= boxBounds.boxFour.end) {
        if (balloonData.isUnlocked && balloonData.balloonId) {
          try {
            await deleteBalloon(balloonData.balloonId);
            setBalloonData(prevData => ({
              ...prevData,
              isUnlocked: false,
              showBalloon: false,
              balloonId: 0
            }));
            updateGuardians(balloonData.balloonId, guardian, 'noBalloon');
          } catch (error) {
            console.error('Failed to delete balloon:', error);
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boxBounds, guardian, updateGuardians]);

  useEffect(() => {
    if (initialBalloonStatus !== 'noBalloon') {
      setBalloonData({
        isUnlocked: true,
        balloonColor: initialBalloonStatus,
        blockTwoColor: initialBalloonStatus,
        showBalloon: true,
        balloonId: initialBalloonId,
      });
    }
  }, [initialBalloonStatus, initialBalloonId]);


  // React to changes in the game state such as jumpStage
  useEffect(() => {
    if (jumpStage === 2) { // Assuming 2 is the peak of the jump
      checkCollision(playerLeft, playerRight);
    }
  }, [jumpStage, playerLeft, playerRight, checkCollision]);

  return (
    <div className="balloon-box-container" style={{ left: `${left}px` }}>
      {/* Guardian */}
      <Guardian
        // type={guardian}
        color={guardianColor}
        hasBalloon={balloonData.showBalloon}
        favoriteBalloon={balloonData.balloonColor === guardianColor}
      />

      {/* First Box */}
      <div
        className="box"
        style={{ backgroundColor: balloonData.isUnlocked ? 'successGreen' : 'black' }}
      ></div>

      {/* Second Box */}
      <div
        className="box"
        style={{ backgroundColor: balloonData.isUnlocked ? balloonData.blockTwoColor : 'grey', marginLeft: '60px' }}
      ></div>

      {/* Third Box */}
      <div
        className="box"
        style={{ backgroundColor: balloonData.isUnlocked ? 'blue' : 'grey', marginLeft: '60px' }}
      ></div>

      {/* Fourth Box */}
      <div
        className="box"
        style={{ backgroundColor: balloonData.isUnlocked ? 'red' : 'grey', marginLeft: '60px' }}
      ></div>

      {/* Balloon */}
      {balloonData.showBalloon && (
        <div
          className="balloon"
          style={{ backgroundColor: balloonData.balloonColor, top: '-100px' }}
        ></div>
      )}
    </div>
  );
};

export default BalloonBoxes;