// Type definitions for React Three Fiber and related libraries
declare module '@react-three/fiber' {
  import * as THREE from 'three';
  import { ReactNode } from 'react';

  export type ThreeEvent<T> = {
    stopPropagation: () => void;
    target: Object3D;
    // Add other properties as needed
  } & T;

  export interface CanvasProps {
    children?: ReactNode;
    camera?: any;
    gl?: any;
    shadows?: boolean;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }

  export const Canvas: React.FC<CanvasProps>;
}

declare module '@react-three/drei' {
  import { ReactNode } from 'react';

  export interface OrbitControlsProps {
    enableZoom?: boolean;
    enablePan?: boolean;
    enableRotate?: boolean;
    [key: string]: any;
  }

  export const OrbitControls: React.FC<OrbitControlsProps>;

  export interface HtmlProps {
    distanceFactor?: number;
    zIndexRange?: [number, number];
    portal?: React.MutableRefObject<HTMLElement>;
    transform?: boolean;
    sprite?: boolean;
    prepend?: boolean;
    center?: boolean;
    fullscreen?: boolean;
    occlude?: React.RefObject<THREE.Mesh>[] | boolean;
    onOcclude?: (visible: boolean) => null;
    as?: string;
    wrapperClass?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
    [key: string]: any;
  }

  export const Html: React.FC<HtmlProps>;
}

declare module 'three' {
  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    // Add other properties and methods as needed
  }

  export class Mesh extends Object3D {
    geometry: BufferGeometry;
    material: Material | Material[];
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
  }

  export class Euler {
    x: number;
    y: number;
    z: number;
    order: string;
    constructor(x?: number, y?: number, z?: number, order?: string);
  }

  export class BufferGeometry {
    // Add properties and methods as needed
  }

  export class Material {
    // Add properties and methods as needed
  }

  // Add other classes and types as needed
} 