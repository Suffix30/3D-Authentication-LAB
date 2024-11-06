import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';

const HeaderChallenge: React.FC = () => {
  const cubeRef = React.useRef<THREE.Mesh>(null);
  const headerRefs = React.useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.01;
    }
    headerRefs.current.forEach((header, i) => {
      if (header) {
        header.rotation.z += 0.02;
      }
    });
  });

  return (
    <>
      <Box ref={cubeRef} args={[2, 2, 2]}>
        <meshBasicMaterial color={0x00ff00} wireframe transparent opacity={0.5} />
      </Box>
      {Array.from({ length: 8 }, (_, i) => (
        <Sphere
          key={i}
          ref={el => headerRefs.current[i] = el!}
          args={[0.2, 16, 16]}
          position={[
            Math.cos(i * Math.PI/4) * 3,
            Math.sin(i * Math.PI/4) * 3,
            0
          ]}
        >
          <meshBasicMaterial color={0x00ffff} />
        </Sphere>
      ))}
    </>
  );
};

export default HeaderChallenge;