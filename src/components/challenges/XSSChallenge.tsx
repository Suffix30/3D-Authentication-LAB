import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Octahedron } from '@react-three/drei';

const XSSChallenge: React.FC = () => {
  const shieldRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (shieldRef.current) {
      shieldRef.current.rotation.x += 0.01;
      shieldRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Octahedron ref={shieldRef} args={[2]}>
      <meshBasicMaterial color={0x00ff00} wireframe />
    </Octahedron>
  );
};

export default XSSChallenge;