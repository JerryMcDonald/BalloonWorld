// src/components/Land/Land.tsx

import React from 'react';
import './Land.css';
import LandFullWithMountains from '../../assets/land/LandFullWithMountains.png'

const Land: React.FC = () => {
  return (
    <div>
        <div className="land">

        <img src={LandFullWithMountains}></img>
        </div>

    </div>
  );
};

export default Land;