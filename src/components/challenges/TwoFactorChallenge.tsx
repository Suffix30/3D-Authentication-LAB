import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';

const TwoFactorChallenge: React.FC = () => {
  const ring1Ref = React.useRef<THREE.Mesh>(null);
  const ring2Ref = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.rotation.x += 0.01;
      ring2Ref.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[2, 0.1, 16, 100]}>
        <meshBasicMaterial color={0x00ff00} wireframe />
      </Torus>
      <Torus ref={ring2Ref} args={[1.5, 0.1, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={0x00ffff} wireframe />
      </Torus>
    </>
  );
};

export default TwoFactorChallenge;