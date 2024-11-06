import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';

const BufferChallenge: React.FC = () => {
  const bufferRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (bufferRef.current) {
      bufferRef.current.rotation.x += 0.01;
      bufferRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Cylinder ref={bufferRef} args={[1, 1, 2, 32]}>
      <meshBasicMaterial 
        color={0x00ff00}
        wireframe
        transparent
        opacity={0.5}
      />
    </Cylinder>
  );
};

export default BufferChallenge;