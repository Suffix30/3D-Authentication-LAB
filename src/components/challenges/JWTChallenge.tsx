import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';

const JWTChallenge: React.FC = () => {
  const ringRefs = React.useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x += 0.01;
        ring.rotation.y += 0.01;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 3 }, (_, i) => (
        <Torus
          key={i}
          ref={el => ringRefs.current[i] = el!}
          args={[1, 0.1, 16, 100]}
          position={[(i - 1) * 2.5, 0, 0]}
        >
          <meshBasicMaterial color={0x00ff00} wireframe />
        </Torus>
      ))}
    </>
  );
};

export default JWTChallenge;