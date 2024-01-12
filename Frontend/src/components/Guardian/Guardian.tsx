/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Guardian/Guardian.tsx


// King
import BalloonKingHappy from '../../assets/balloonKing/BalloonKingHappy.png';
import BalloonKingNormal from '../../assets/balloonKing/BalloonKingNormal.png';
import BalloonKingSad from '../../assets/balloonKing/BalloonKingSad.png';


// Genie
import BalloonGenieHappy from '../../assets/balloonGenie/BalloonGenieHappy.png';
import BalloonGenieNormal from '../../assets/balloonGenie/BalloonGenieNormal.png';
import BalloonGenieSad from '../../assets/balloonGenie/BalloonGenieSad.png';

// Alien
import BalloonAlienHappy from '../../assets/balloonAlien/BalloonAlienHappy.png';
import BalloonAlienNormal from '../../assets/balloonAlien/BalloonAlienNormal.png';
import BalloonAlienSad from '../../assets/balloonAlien/BalloonAlienSad.png';

// Balloons
import BlueBalloon from '../../assets/balloons/BlueBalloon.png';
import GreenBalloon from '../../assets/balloons/GreenBalloon.png';
import PurpleBalloon from '../../assets/balloons/PurpleBalloon.png';
import RedBalloon from '../../assets/balloons/RedBalloon.png';
import YellowBalloon from '../../assets/balloons/YellowBalloon.png';




import React from 'react';
import './Guardian.css';



interface GuardianProps {
  guardian: string;
  showBalloon: boolean;
  currentBalloon: string;
}

const Guardian: React.FC<GuardianProps> = ({ guardian, showBalloon, currentBalloon }) => {
  const balloonKingFavoriteColor: string = 'green';
  const balloonGenieFavoriteColor: string = 'purple';
  const balloonAlienFavoriteColor: string = 'blue';


  // function to determine which Guardian image to show
  const getGuardianImage = (): string => {
    if (guardian === 'BalloonKing') {
      if (showBalloon) {
        if (currentBalloon === balloonKingFavoriteColor) {
          return BalloonKingHappy
        } else {
          return BalloonKingSad
        }
      } else {
        return BalloonKingNormal
      }
    }
    if (guardian === 'BalloonGenie') {
      if (showBalloon) {
        if (currentBalloon === balloonGenieFavoriteColor) {
          return BalloonGenieHappy
        } else {
          return BalloonGenieSad
        }
      } else {
        return BalloonGenieNormal
      }
    }
    if (guardian === 'BalloonAlien') {
      if (showBalloon) {
        if (currentBalloon === balloonAlienFavoriteColor) {
          return BalloonAlienHappy
        } else {
          return BalloonAlienSad
        }
      } else {
        return BalloonAlienNormal
      }
    }
    return BalloonKingNormal
  }

  const getBalloonImage = (): string => {
    switch (currentBalloon) {
      case 'blue':
        return BlueBalloon
      case 'green':
        return GreenBalloon
      case 'purple':
        return PurpleBalloon
      case 'yellow':
        return YellowBalloon
      default:
        return RedBalloon
    }
  }


  const guardianImageSrc: string = getGuardianImage();
  const balloonImageSrc: string = getBalloonImage();

  return (
    <div>
      <div className={`guardian ${guardian}`}>
        {guardianImageSrc && <img src={guardianImageSrc} alt={`${Guardian} image`} />}
      </div>
      {showBalloon && (
        <div className={`balloon ${guardian}`}>
          {balloonImageSrc && <img src={balloonImageSrc} alt={`${currentBalloon} balloon`} />}
        </div>
      )}
    </div>
  );
};

export default Guardian;