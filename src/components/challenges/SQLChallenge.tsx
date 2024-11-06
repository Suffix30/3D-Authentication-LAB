import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SQLChallenge: React.FC = () => {
  const databaseRef = React.useRef<THREE.Mesh>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(300);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (databaseRef.current) {
      databaseRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <Cylinder ref={databaseRef} args={[1, 1, 2, 32]}>
        <meshBasicMaterial color={0xff0000} wireframe />
      </Cylinder>
      <Points positions={particles}>
        <PointMaterial size={0.05} color={0x00ff00} />
      </Points>
    </>
  );
};

export default SQLChallenge;