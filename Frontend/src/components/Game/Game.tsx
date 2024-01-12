// src/components/Game/Game.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BalloonBoxes from '../BalloonBoxes/BalloonBoxes';
import Barrier from '../Barrier/Barrier';
import HotAirBalloon from '../HotAirBalloon/HotAirBalloon';
import './Game.css';
import { getBalloons } from '../../services/balloonService';
import Land from '../Land/Land';
import Player from '../Player/Player';

interface Guardians {
  // [key: string]: string;
  BalloonKing: {
    balloonStatus: string,
    balloonId: number,
  },
  BalloonGenie: {
    balloonStatus: string,
    balloonId: number,
  },
  BalloonAlien: {
    balloonStatus: string,
    balloonId: number,
  }
}

const Game: React.FC = () => {
  // useRef is like having a backstage pass in a React component. It lets you directly access and interact with the DOM, manipulate it, and keep some values around without causing any drama (re-renders). 
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const landWidth = 6000; // Specific width of the land

  const barrierPosition = 3700; // Position of the barrier

  const playerWidth = 30; // the player is 30px wide

  // Set initial player position to the middle of the viewport
  // const [playerPosition, setPlayerPosition] = useState(window.innerWidth / 2);
  const [playerPosition, setPlayerPosition] = useState(2000); // for testing balloon

  // tracks whether the player is on the hot air balloon so we can make the original player disappear 
  const [isPlayerOnBalloon, setIsPlayerOnBalloon] = useState(false);

  const [jumpStage, setJumpStage] = useState(0); // 0: standing, 1: mid-jump, 2: high-jump
  const [walkStage, setWalkStage] = useState(0); // 0: standing, 1: left-foot, 2: right-foot
  const [leftFootLast, setLeftFootLast] = useState(false); // keep track of last foot used while walking

  // maintain a state that tracks whether each Guardian has the correct balloon color
  const [openBarrier, setOpenBarrier] = useState(false);

  const [guardians, setGuardians] = useState<Guardians>({
    BalloonKing: {
      balloonStatus: 'noBalloon',
      balloonId: 0,
    },
    BalloonGenie: {
      balloonStatus: 'noBalloon',
      balloonId: 0,
    },
    BalloonAlien: {
      balloonStatus: 'noBalloon',
      balloonId: 0,
    },
  });

  const updatePlayerPosition = (newPosition: number): void => {
    // Ensure that the player does not move beyond the left edge of the land
    newPosition = Math.max(newPosition, 0);

    // Prevent the player from moving past the barrier if it's not open
    if (!openBarrier && newPosition >= barrierPosition - playerWidth) {
      newPosition = barrierPosition - playerWidth;
    }

    // Ensure that the player does not move beyond the right edge of the land
    newPosition = Math.min(newPosition, landWidth - playerWidth);

    setPlayerPosition(newPosition);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    const moveStep = 30; // Define the step the player moves on each key press

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
        // Walk logic: Start walk only if standing
        if (walkStage === 0) {
          if (leftFootLast) {
            setWalkStage(2)
            setLeftFootLast(false)
          } else {
            setWalkStage(1)
            setLeftFootLast(true)
          }
          setTimeout(() => setWalkStage(0), 100); // Top of jump
          updatePlayerPosition(playerPosition - moveStep);
        }
        break;
      case 'ArrowRight':
      case 'd':
        // Walk logic: Start walk only if standing
        if (walkStage === 0) {
          if (leftFootLast) {
            setWalkStage(2)
            setLeftFootLast(false)
          } else {
            setWalkStage(1)
            setLeftFootLast(true)
          }
          setTimeout(() => setWalkStage(0), 100); // Top of jump
          updatePlayerPosition(playerPosition + moveStep);
        }
        break;
      case ' ':
      case 'w':
      case 'ArrowUp':
        // Jump logic: Start jump only if standing
        if (jumpStage === 0) {
          setJumpStage(1); // Mid-jump
          setTimeout(() => setJumpStage(2), 200); // Top of jump
          setTimeout(() => setJumpStage(1), 400); // Mid-jump again
          setTimeout(() => setJumpStage(0), 600); // Back to ground
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPosition, jumpStage, openBarrier, barrierPosition, playerWidth, landWidth, walkStage]);



  useEffect(() => {
    const fetchBalloons = async () => {
      try {
        const fetchedBalloons = await getBalloons();
        // iterate through each balloon update the guardian status for each balloon
        // Initialize a local variable with the initial guardianStatus values


        // Use the local variable to build the updated status
        const updatedGuardianStatus = {
          BalloonKing: {
            balloonStatus: 'noBalloon',
            balloonId: 0,
          },
          BalloonGenie: {
            balloonStatus: 'noBalloon',
            balloonId: 0,
          },
          BalloonAlien: {
            balloonStatus: 'noBalloon',
            balloonId: 0,
          },
        };

        fetchedBalloons.forEach(balloon => {
          const key = balloon.guardian as keyof typeof updatedGuardianStatus;
          if (key in updatedGuardianStatus && balloon.id) {
            updatedGuardianStatus[key] = {
              balloonStatus: balloon.color,
              balloonId: balloon.id,
            };
          }
        });

        setGuardians(updatedGuardianStatus)
        // console.log('guardians', updatedGuardianStatus)
      } catch (error) {
        console.error('Failed to fetch balloons:', error);
        // Handle the error appropriately
      }
    };

    fetchBalloons();
  }, []); // Empty dependency array ensures this runs once on mount


  // This useEffect is the key to the scrolling and jumping effect
  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Return a cleanup function that removes the event listener
    // This is important for preventing memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);




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
      // console.log(playerPosition, 'position')
    }
  }, [playerPosition]);

  // UseEffect to check if barrier should be open
  useEffect(() => {
    // This checks if the game container (div with ref={gameContainerRef}) is currently available in the DOM. It's a safety check to ensure the container exists before trying to modify it.
    if (guardians.BalloonKing.balloonStatus === 'green' && guardians.BalloonGenie.balloonStatus === 'purple' && guardians.BalloonAlien.balloonStatus === 'blue') {
      setOpenBarrier(true)
    } else {
      setOpenBarrier(false)
    }
  }, [guardians]);


  const updateGuardians = (id: number, guardianName: string, color: string) => {
    setGuardians(prevStatus => ({
      ...prevStatus,
      [guardianName]: {
        balloonStatus: color,
        balloonId: id
      }
    }));
  };

  //  callback to pass to the HotAirBalloon component to be triggered when the player jumps on the hot air balloon.
  const handlePlayerJumpOnBalloon = () => {
    setIsPlayerOnBalloon(true);
  };



  return (
    <div ref={gameContainerRef} className="game-container">
      <Land />
      {!isPlayerOnBalloon && (
        <Player jumpStage={jumpStage} playerPosition={playerPosition} walkStage={walkStage} />
      )}
      <BalloonBoxes left={2200} playerPosition={playerPosition} jumpStage={jumpStage} initialBalloonStatus={guardians.BalloonKing.balloonStatus} guardian={'BalloonKing'} updateGuardians={updateGuardians} initialBalloonId={guardians.BalloonKing.balloonId} />
      <BalloonBoxes left={2700} playerPosition={playerPosition} jumpStage={jumpStage} initialBalloonStatus={guardians.BalloonGenie.balloonStatus} guardian={'BalloonGenie'} updateGuardians={updateGuardians} initialBalloonId={guardians.BalloonGenie.balloonId} />
      <BalloonBoxes left={3200} playerPosition={playerPosition} jumpStage={jumpStage} initialBalloonStatus={guardians.BalloonAlien.balloonStatus} guardian={'BalloonAlien'} updateGuardians={updateGuardians} initialBalloonId={guardians.BalloonAlien.balloonId} />
      <Barrier isLifted={openBarrier} />
      <HotAirBalloon playerPosition={playerPosition} jumpStage={jumpStage} playerWidth={playerWidth} onPlayerJumpOn={handlePlayerJumpOnBalloon} />
    </div>
  );
};

export default Game;