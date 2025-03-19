// Global JSX namespace augmentation for Three.js elements
import { Object3D } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Three.js elements
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
      // Add other Three.js elements as needed
      group: any;
      sphereGeometry: any;
      planeGeometry: any;
      meshBasicMaterial: any;
      meshPhongMaterial: any;
      directionalLight: any;
      spotLight: any;
    }
  }
} 