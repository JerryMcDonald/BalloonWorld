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
  const getImage = (): string => {
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


  const imageSrc: string = getImage();

  return (
    <div className={`guardian ${guardian}`}>
      {imageSrc && <img src={imageSrc} alt={`${Guardian} image`} />}
    </div>
  );
};

export default Guardian;