import React, { useRef } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { Mesh } from 'three';

interface ModelCoordinate {
  id: string;
  x: number;
  y: number;
  z: number;
  label: string;
  status: string;
}

interface ModelVisualizationProps {
  coordinates: ModelCoordinate[];
  selectedSystem: string;
  setSelectedSystem: (id: string) => void;
  getStatusColor: (status: string) => string;
}

// Subsystem Box component for 3D visualization
const SubsystemBox = ({ 
  position, 
  color, 
  size = [1, 1, 1], 
  onClick, 
  isSelected, 
  label 
}: {
  position: [number, number, number];
  color: string;
  size?: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
  label: string;
}) => {
  const mesh = useRef<Mesh>(null);
  
  return (
    <mesh
      position={position}
      ref={mesh}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      scale={isSelected ? 1.2 : 1}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent opacity={0.8} />
      <Html distanceFactor={10}>
        <div className="text-white bg-black bg-opacity-50 px-2 py-1 rounded text-xs">
          {label}
        </div>
      </Html>
    </mesh>
  );
};

const ModelVisualization: React.FC<ModelVisualizationProps> = ({
  coordinates,
  selectedSystem,
  setSelectedSystem,
  getStatusColor
}) => {
  return (
    <div className="h-80 w-full border border-gray-200 rounded-lg">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {coordinates.map((coord) => (
          <SubsystemBox 
            key={coord.id}
            position={[coord.x * 10 - 5, coord.y * 10 - 5, coord.z * 10 - 5]}
            color={getStatusColor(coord.status)}
            size={[1.5, 1.5, 1.5]}
            onClick={() => setSelectedSystem(coord.id)}
            isSelected={selectedSystem === coord.id}
            label={coord.label}
          />
        ))}
        
        <OrbitControls />
      </Canvas>
      <div className="mt-2 text-sm text-center text-gray-500">
        Click on a subsystem to view details. Use mouse to rotate and zoom.
      </div>
    </div>
  );
};

export default ModelVisualization; 