// src/components/Button/Button.tsx

import React from 'react';
import './Button.css';

// swaps
import BlueSwap from '../../assets/buttons/BlueSwap.png';
import GraySwap from '../../assets/buttons/GraySwap.png';
import GreenSwap from '../../assets/buttons/GreenSwap.png';
import PurpleSwap from '../../assets/buttons/PurpleSwap.png';
import RedSwap from '../../assets/buttons/RedSwap.png';
import YellowSwap from '../../assets/buttons/YellowSwap.png';

// adds
import GreenAdd from '../../assets/buttons/GreenAdd.png';
import GrayAdd from '../../assets/buttons/GrayAdd.png';

// gives
import GrayGive from '../../assets/buttons/GrayGive.png';
import GreenGive from '../../assets/buttons/GreenGive.png';

// deletes
import GrayDelete from '../../assets/buttons/GrayDelete.png';
import RedDelete from '../../assets/buttons/RedDelete.png';


interface ButtonProps {
  type: string;
  isUnlocked: boolean;
  blockTwoColor: string;
}

const Button: React.FC<ButtonProps> = ({ type, isUnlocked, blockTwoColor }) => {
  // function to determine which button image to show
  const getImage = (): string => {
    if (type === 'first') {
      return isUnlocked ? GrayAdd : GreenAdd;
    } 
    if (type === 'second') {
      if (!isUnlocked) return GraySwap
      switch(blockTwoColor) {
        case 'blue':
          return BlueSwap
        case 'green':
          return GreenSwap
        case 'purple':
          return PurpleSwap
        case 'red':
          return RedSwap
        default:
          return YellowSwap
      }
    }
    if (type === 'third') {
      return isUnlocked ?  GreenGive : GrayGive;
    }
    if (type === 'fourth') {
      return isUnlocked ?  RedDelete : GrayDelete;
    }
    return GrayAdd;
  };

  const imageSrc:string = getImage();
  const requiresMargin:boolean = type !== 'first'

  return (
    <div 
    className="button" 
    style={{ marginLeft: requiresMargin ? '30px' : '0px' }}
    >
      {imageSrc && <img src={imageSrc} alt="Button Image" />}
    </div>
  );
};

export default Button;