import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './BalloonBoxes.css';
import Guardian from '../Guardian/Guardian';
import Button from '../Button/Button';
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

  const AwesomeAfroLeft = playerPosition + 50; // players awesome afro starts at about 50px in from playerPosition
  const AwesomeAfroRight = playerPosition + 80; // players awesome afro is about 30px wide
  const jumpPeakStage = 2; // 2 is the peak of the jump

  // Calculate the left and right bounds of this component's buttons
  const buttonBounds = useMemo(() => ({
    boxOne: { start: left, end: left + 60 },
    boxTwo: { start: left + 90, end: left + 150 },
    boxThree: { start: left + 180, end: left + 240 },
    boxFour: { start: left + 270, end: left + 330 }
  }), [left]);

  const handleAddBalloon = async () => {
    const response = await addBalloon({ color: balloonData.blockTwoColor, guardian: guardian });
    if (response && response.id) {
      const responseId: number = response.id; // Extracting ID for clarity.
      setBalloonData(prevData => ({
        ...prevData,
        isUnlocked: true,
        showBalloon: true,
        balloonColor: balloonData.blockTwoColor,
        balloonId: responseId
      }));
      updateGuardians(response.id, guardian, balloonData.blockTwoColor);
    } else {
      console.error('Failed to add balloon');
    }
  };

  const handleUpdateBalloon = async () => {
    if (balloonData.balloonId) {
      const updatedBalloon = await updateBalloon({
        id: balloonData.balloonId,
        color: balloonData.blockTwoColor,
        guardian: guardian
      });

      if (updatedBalloon) {
        setBalloonData(prevData => ({
          ...prevData,
          balloonColor: balloonData.blockTwoColor
        }));
        updateGuardians(balloonData.balloonId, guardian, balloonData.blockTwoColor);
      } else {
        console.error('Failed to update balloon');
      }
    }
  };

  const handleDeleteBalloon = async () => {
    if (balloonData.balloonId) {
      const deleteSuccess = await deleteBalloon(balloonData.balloonId);

      if (deleteSuccess) {
        setBalloonData(prevData => ({
          ...prevData,
          isUnlocked: false,
          showBalloon: false,
          balloonId: 0
        }));
        updateGuardians(balloonData.balloonId, guardian, 'noBalloon');
      } else {
        console.error('Failed to delete balloon');
      }
    }
  };

  const handleCheckCollision = useCallback(async (AwesomeAfroLeft: number, AwesomeAfroRight: number) => {
    if (AwesomeAfroRight >= buttonBounds.boxOne.start && AwesomeAfroLeft <= buttonBounds.boxFour.end) {

      // Box One Collision
      if (AwesomeAfroRight >= buttonBounds.boxOne.start && AwesomeAfroLeft <= buttonBounds.boxOne.end && !balloonData.isUnlocked) {
        await handleAddBalloon();
      }

      // Box Two Collision
      else if (AwesomeAfroRight >= buttonBounds.boxTwo.start && AwesomeAfroLeft <= buttonBounds.boxTwo.end && balloonData.isUnlocked) {
        const colors = ['blue', 'green', 'purple', 'red', 'yellow'];

        const currentColorIndex: number = colors.indexOf(balloonData.blockTwoColor);
        let nextColorIndex: number = (currentColorIndex + 1) % colors.length;
        // we do not want to include the current balloon color on ButtonTwoColor change
        if (colors[nextColorIndex] === balloonData.balloonColor) {
          nextColorIndex  = (nextColorIndex + 1) % colors.length;
        }
        const newBlockTwoColor: string = colors[nextColorIndex];
        setBalloonData(prevData => ({
          ...prevData,
          blockTwoColor: newBlockTwoColor
        }));
      }

      // Box Three Collision
      else if (AwesomeAfroRight >= buttonBounds.boxThree.start && AwesomeAfroLeft <= buttonBounds.boxThree.end && balloonData.isUnlocked) {
        await handleUpdateBalloon();
      }

      // Box Four Collision
      else if (AwesomeAfroRight >= buttonBounds.boxFour.start && AwesomeAfroLeft <= buttonBounds.boxFour.end && balloonData.isUnlocked) {
        await handleDeleteBalloon();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonBounds, guardian, updateGuardians]);

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
    if (jumpStage === jumpPeakStage) {
      handleCheckCollision(AwesomeAfroLeft, AwesomeAfroRight);
    }
  }, [jumpStage, AwesomeAfroLeft, AwesomeAfroRight, handleCheckCollision]);

  return (
    <div className="balloon-box-container" style={{ left: `${left}px` }}>

      {/* Guardian */}
      <Guardian guardian={guardian} showBalloon={balloonData.showBalloon} currentBalloon={balloonData.balloonColor} />

      {/* Buttons */}
      <Button type='first' isUnlocked={balloonData.isUnlocked} blockTwoColor={balloonData.blockTwoColor} />
      <Button type='second' isUnlocked={balloonData.isUnlocked} blockTwoColor={balloonData.blockTwoColor} />
      <Button type='third' isUnlocked={balloonData.isUnlocked} blockTwoColor={balloonData.blockTwoColor} />
      <Button type='fourth' isUnlocked={balloonData.isUnlocked} blockTwoColor={balloonData.blockTwoColor} />
    </div>
  );
};

export default BalloonBoxes;