import React from 'react';
import { useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';

const DefaultChallenge: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <TorusKnot
      ref={meshRef}
      args={[2, 0.5, 100, 16]}
    >
      <meshBasicMaterial color={0x00ff00} wireframe />
    </TorusKnot>
  );
};

export default DefaultChallenge;