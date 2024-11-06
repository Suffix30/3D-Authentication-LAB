import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';

const PatternChallenge: React.FC = () => {
  const nodes = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      position: [
        Math.cos(i * Math.PI/2) * 3,
        Math.sin(i * Math.PI/2) * 3,
        0
      ]
    }));
  }, []);

  const points = useMemo(() => nodes.map(node => node.position), [nodes]);

  return (
    <>
      {nodes.map((node, i) => (
        <Sphere key={i} args={[0.3, 32, 32]} position={node.position}>
          <meshBasicMaterial color={0x00ff00} />
        </Sphere>
      ))}
      <Line points={points} color={0x00ff00} lineWidth={1} />
    </>
  );
};

export default PatternChallenge;