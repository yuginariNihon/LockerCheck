'use client';
import React from 'react'
import Cube from "@/components/3D/Cube";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Locker = () => {
    const totalLockers = 315;
    const cols = 4;
    const rowsPerLayer = 16;
    const spacing = 1.2;
    const colors = ["royalblue", "teal", "tomato", "orange", "limegreen", "gold", "indigo", "deeppink"]

    const cubes : {position: [number,number,number]; color: string }[] = [];
    for(let i = 0; i < totalLockers; i++){
        const layer = Math.floor(i / (cols * rowsPerLayer));
        const indexLayer = i % (cols * rowsPerLayer);
        const row = Math.floor(indexLayer / cols);
        const col = indexLayer % cols;

        const position : [number,number,number] = [
            col * spacing,
            -layer * spacing * 1.2,
            -row * spacing,
        ];

        const color = colors[Math.floor(Math.random() * colors.length)];
        cubes.push({ position, color });
    }

  return (
    <div className='w-full h-screen'>
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            {cubes.map((cube,index) => (
                <Cube key={index} position={cube.position} size={[1, 1, 1]} color={cube.color} />
            ))}
            <OrbitControls 
                enablePan={true}      // ลากกล้องได้ (ซ้าย-ขวา)
                enableZoom={true}     // ซูมเข้าออกได้
                enableRotate={true}
            />
        </Canvas>
    </div>
  )
}

export default Locker
