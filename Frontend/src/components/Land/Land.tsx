// src/components/Land/Land.tsx

import React from 'react';
import './Land.css';
import LandFullWithMountians from '../../assets/land/LandFullWithMountians.png'

const Land: React.FC = () => {
  return (
    <div>
        <div className="land">

        <img src={LandFullWithMountians}></img>
        </div>

    </div>
  );
};

export default Land;