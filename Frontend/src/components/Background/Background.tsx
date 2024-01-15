// src/components/Background/Background.tsx

import React, { useEffect, useState } from 'react';
import './Background.css';
import CoolSun1 from '../../assets/background/CoolSun1.png'
import CoolSun2 from '../../assets/background/CoolSun2.png'

const Background: React.FC = () => {

    const [currentImage, setCurrentImage] = useState(CoolSun1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prevImage => (prevImage === CoolSun1 ? CoolSun2 : CoolSun1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>

            <div className='sun'>
                <img src={currentImage} alt='sun' />
            </div>
                <div className="movingBackground">
                </div>

        </div>
    );
};

export default Background;