// src/components/BalloonBoxes/BalloonBoxes.tsx

import React, { useState } from 'react';
import './BalloonBoxes.css';

// Define a type for the component props
interface BalloonBoxesProps {
  left: string; // position from the left
}

const BalloonBoxes: React.FC<BalloonBoxesProps> = ({ left }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [balloonColor, setBalloonColor] = useState('red');
  const [currentColor, setCurrentColor] = useState('red');
  const [showBalloon, setShowBalloon] = useState(false);

  const colors = ['red', 'green', 'orange', 'blue'];
  const nextColor = () => colors[(colors.indexOf(currentColor) + 1) % colors.length];

  return (
    <div className="balloon-box-container" style={{ left }}>
      {/* First Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'successGreen' : 'black' }} 
        onClick={() => { setIsUnlocked(true); setShowBalloon(true); }}
      ></div>

      {/* Second Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? currentColor : 'grey', marginLeft: '40px' }} 
        onClick={() => { if (isUnlocked) setCurrentColor(nextColor()); }}
      ></div>

      {/* Third Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'blue' : 'grey', marginLeft: '40px' }} 
        onClick={() => { if (isUnlocked) setBalloonColor(currentColor); }}
      ></div>

      {/* Fourth Box */}
      <div 
        className="box" 
        style={{ backgroundColor: isUnlocked ? 'red' : 'grey', marginLeft: '40px' }} 
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