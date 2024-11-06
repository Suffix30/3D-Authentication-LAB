import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const SteganographyChallenge: React.FC = () => {
  const pixelRefs = React.useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    pixelRefs.current.forEach((pixel, i) => {
      if (pixel) {
        pixel.rotation.x += 0.01;
        pixel.rotation.y += 0.01;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 64 }, (_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        return (
          <Box
            key={i}
            ref={el => pixelRefs.current[i] = el!}
            args={[0.2, 0.2, 0.2]}
            position={[
              (col - 3.5) * 0.3,
              (row - 3.5) * 0.3,
              0
            ]}
          >
            <meshBasicMaterial 
              color={Math.random() > 0.5 ? 0x00ff00 : 0x008800} 
            />
          </Box>
        );
      })}
    </>
  );
};

export default SteganographyChallenge;