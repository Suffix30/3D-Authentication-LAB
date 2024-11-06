import React from 'react';
import DefaultChallenge from './challenges/DefaultChallenge';
import TwoFactorChallenge from './challenges/TwoFactorChallenge';
import PatternChallenge from './challenges/PatternChallenge';
import HeaderChallenge from './challenges/HeaderChallenge';
import SQLChallenge from './challenges/SQLChallenge';
import JWTChallenge from './challenges/JWTChallenge';
import XSSChallenge from './challenges/XSSChallenge';
import SteganographyChallenge from './challenges/SteganographyChallenge';
import BufferChallenge from './challenges/BufferChallenge';
import ZKPChallenge from './challenges/ZKPChallenge';

interface LevelSceneProps {
  level: number;
}

const LevelScene: React.FC<LevelSceneProps> = ({ level }) => {
  const getChallengeComponent = () => {
    switch(level) {
      case 1: return <DefaultChallenge />;
      case 2: return <TwoFactorChallenge />;
      case 3: return <PatternChallenge />;
      case 4: return <HeaderChallenge />;
      case 5: return <SQLChallenge />;
      case 6: return <JWTChallenge />;
      case 7: return <XSSChallenge />;
      case 8: return <SteganographyChallenge />;
      case 9: return <BufferChallenge />;
      case 10: return <ZKPChallenge />;
      default: return <DefaultChallenge />;
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {getChallengeComponent()}
    </>
  );
};

export default LevelScene;