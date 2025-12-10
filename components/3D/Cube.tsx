'use client';
import React from 'react'
import { Box } from '@react-three/drei';

interface CuboidProps{
  position?: [number,number,number];
  size?: [number,number,number];
  color?: string;
}

const Cube: React.FC<CuboidProps> = ({position = [0,0,0], size = [1,1,1],color = 'hotpink'}) => {
  return (
    <Box position={position} args={size}>
        <meshStandardMaterial attach="material" color={color} />
    </Box>
  )
}

export default Cube