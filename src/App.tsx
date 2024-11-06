import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LevelScene from './components/LevelScene';
import LoginForm from './components/LoginForm';
import InfoPanel from './components/InfoPanel';
import { levels } from './config/levels';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLoginAttempt = async (credentials: any) => {
    setLoginAttempts(prev => prev + 1);
    const level = levels.find(l => l.id === currentLevel);
    
    if (level?.validation(credentials)) {
      setTimeout(() => {
        setCurrentLevel(prev => Math.min(prev + 1, levels.length));
      }, 2000);
      return true;
    }
    return false;
  };

  return (
    <>
      <div id="info">
        <InfoPanel 
          attempts={loginAttempts}
          currentLevel={currentLevel}
        />
      </div>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#000']} />
        <OrbitControls />
        <LevelScene level={currentLevel} />
      </Canvas>
      <LoginForm 
        level={levels.find(l => l.id === currentLevel)!}
        onSubmit={handleLoginAttempt}
      />
    </>
  );
}

export default App;