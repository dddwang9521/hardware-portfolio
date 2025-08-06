import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ThreeDViewerProps {
  xyzData: string;
  title?: string;
}

const ThreeDViewer: React.FC<ThreeDViewerProps> = ({ xyzData, title = "3D Mapping Visualization" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Parse XYZ data
      const points: Point3D[] = xyzData
        .trim()
        .split('\n')
        .map(line => {
          const [x, y, z] = line.split(' ').map(Number);
          return { x, y, z };
        })
        .filter(point => !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z));

      if (points.length === 0) {
        setError('No valid data points found');
        return;
      }

      // Find bounds for scaling
      const bounds = {
        minX: Math.min(...points.map(p => p.x)),
        maxX: Math.max(...points.map(p => p.x)),
        minY: Math.min(...points.map(p => p.y)),
        maxY: Math.max(...points.map(p => p.y)),
        minZ: Math.min(...points.map(p => p.z)),
        maxZ: Math.max(...points.map(p => p.z)),
      };

      const rangeX = bounds.maxX - bounds.minX;
      const rangeY = bounds.maxY - bounds.minY;
      const rangeZ = bounds.maxZ - bounds.minZ;
      const maxRange = Math.max(rangeX, rangeY, rangeZ);

      // Normalize coordinates to [-1, 1] range
      const normalizedPoints = points.map(point => ({
        x: ((point.x - bounds.minX) / rangeX) * 2 - 1,
        y: ((point.y - bounds.minY) / rangeY) * 2 - 1,
        z: ((point.z - bounds.minZ) / rangeZ) * 2 - 1,
      }));

      // Create scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf0f0f0);
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );
      camera.position.set(3, 3, 3);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

                    // Add orbit controls
       const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 1;
      controls.maxDistance = 10;
      controlsRef.current = controls;

      // Create coordinate axes
      const axesHelper = new THREE.AxesHelper(1.5);
      scene.add(axesHelper);

      // Create point cloud geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(normalizedPoints.length * 3);
      const colors = new Float32Array(normalizedPoints.length * 3);

      normalizedPoints.forEach((point, index) => {
        positions[index * 3] = point.x;
        positions[index * 3 + 1] = point.y;
        positions[index * 3 + 2] = point.z;

        // Color based on Z coordinate (elevation)
        const zRatio = (point.z + 1) / 2; // Normalize to [0, 1]
        const color = new THREE.Color();
        color.setHSL(0.6 - zRatio * 0.6, 0.8, 0.5 + zRatio * 0.3); // Blue to Red

        colors[index * 3] = color.r;
        colors[index * 3 + 1] = color.g;
        colors[index * 3 + 2] = color.b;
      });

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Create point cloud material
      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      });

      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);

      // Create line connections (similar to your Python code)
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      // Create connections within each slice
      const numberOfMeasurements = 7;
      const sliceSize = Math.floor(normalizedPoints.length / numberOfMeasurements);

      for (let x = 0; x < numberOfMeasurements; x++) {
        const startIndex = x * sliceSize;
        for (let i = 1; i < sliceSize; i++) {
          const point1 = normalizedPoints[startIndex + i - 1];
          const point2 = normalizedPoints[startIndex + i];
          
          linePositions.push(point1.x, point1.y, point1.z);
          linePositions.push(point2.x, point2.y, point2.z);
          
          // Line color (gray)
          lineColors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        }
        
        // Connect last point to first point in slice
        if (sliceSize > 1) {
          const firstPoint = normalizedPoints[startIndex];
          const lastPoint = normalizedPoints[startIndex + sliceSize - 1];
          
          linePositions.push(lastPoint.x, lastPoint.y, lastPoint.z);
          linePositions.push(firstPoint.x, firstPoint.y, firstPoint.z);
          lineColors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
        }
      }

      // Create connections between adjacent slices
      for (let x = 0; x < numberOfMeasurements - 1; x++) {
        const startIndex = x * sliceSize;
        for (let i = 0; i < sliceSize; i++) {
          const point1 = normalizedPoints[startIndex + i];
          const point2 = normalizedPoints[startIndex + sliceSize + i];
          
          linePositions.push(point1.x, point1.y, point1.z);
          linePositions.push(point2.x, point2.y, point2.z);
          lineColors.push(0.3, 0.3, 0.3, 0.3, 0.3, 0.3);
        }
      }

      if (linePositions.length > 0) {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
        });

        const lineSet = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lineSet);
      }

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !camera || !renderer) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);
      setIsLoading(false);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };

    } catch (err) {
      setError('Failed to initialize 3D viewer');
      console.error('3D Viewer error:', err);
    }
  }, [xyzData]);

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="text-center text-red-600 dark:text-red-400">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Interactive 3D visualization with rotation controls. Points are colored by elevation (Z-coordinate).
          Use mouse to rotate, scroll to zoom, and right-click to pan.
        </p>
      </div>
      
      <div 
        ref={containerRef}
        className="relative border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
        style={{ height: '500px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="text-gray-600 dark:text-gray-300">Loading 3D visualization...</div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>Data points: {xyzData.trim().split('\n').length}</p>
        <p>Controls: Left-click + drag to rotate • Scroll to zoom • Right-click + drag to pan</p>
        <p>Colors: Blue = Lower elevation • Red = Higher elevation</p>
      </div>
    </div>
  );
};

export default ThreeDViewer; 