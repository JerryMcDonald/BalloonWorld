// src/components/Player/Player.tsx

import React from 'react';
import './Player.css';

// player
import PlayerStanding from '../../assets/player/PlayerStanding.png';
import PlayerLeftFoot from '../../assets/player/PlayerLeftFoot.png';
import PlayerRightFoot from '../../assets/player/PlayerRightFoot.png';
import PlayerHighJump from '../../assets/player/PlayerHighJump.png';
import PlayerMidJump from '../../assets/player/PlayerMidJump.png';


interface PlayerProps {
    jumpStage: number;
    walkStage: number
    playerPosition: number;
}

const Player: React.FC<PlayerProps> = ({ jumpStage, walkStage, playerPosition }) => {

    // Function to determine player's bottom position based on jump stage
    const getJumpPosition = (): string => {
        switch (jumpStage) {
            case 1: return 'calc(5% + 60px)'; // Mid-jump
            case 2: return 'calc(5% + 120px)'; // Top of jump
            default: return 'calc(5%)'; // On ground
        }
    };

    // function to determine which Player image to show
    const getImage = (): string => {
        if (!jumpStage) {
            if (!walkStage) return PlayerStanding // standing
            if (walkStage === 1) return PlayerLeftFoot
            else return PlayerRightFoot
        }
        if (jumpStage === 1) {
            return PlayerMidJump // mid jump
        }
        if (jumpStage === 2) {
            return PlayerHighJump
        }
        return PlayerStanding;
    };

    const imageSrc: string = getImage();

    return (
        <div className="player" 
        style={{ left: `${playerPosition}px`, bottom: getJumpPosition() }}>
            {imageSrc && <img src={imageSrc} alt="Player Image" />}
        </div>
    );
};

export default Player;