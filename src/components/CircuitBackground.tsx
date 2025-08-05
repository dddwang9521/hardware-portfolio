import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CircuitTrace {
  id: number;
  x: number;
  y: number;
  endX: number;
  endY: number;
  opacity: number;
  width: number;
  segments: Array<{
    x: number;
    y: number;
    endX: number;
    endY: number;
  }>;
}

const CircuitBackground = () => {
  const [traces, setTraces] = useState<CircuitTrace[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const traceIdRef = useRef(0);

  // Generate a lightning path between two points
  const generateLightningPath = (startX: number, startY: number, endX: number, endY: number) => {
    const segments = [];
    const numSegments = 8; // More segments for more zigzag
    const dx = (endX - startX) / numSegments;
    const dy = (endY - startY) / numSegments;
    
    let currentX = startX;
    let currentY = startY;
    
    for (let i = 0; i < numSegments; i++) {
      const nextX = currentX + dx + (Math.random() - 0.5) * 30; // More zigzag
      const nextY = currentY + dy + (Math.random() - 0.5) * 30;
      
      segments.push({
        x: currentX,
        y: currentY,
        endX: nextX,
        endY: nextY
      });
      
      currentX = nextX;
      currentY = nextY;
    }
    
    return segments;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create new trace every few mouse movements
      if (Math.random() < 0.3) {
        // Lightning traces with more variation
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 40; // 40-160px
        const endX = e.clientX + Math.cos(angle) * distance;
        const endY = e.clientY + Math.sin(angle) * distance;
        
        // Generate lightning path
        const pathSegments = generateLightningPath(e.clientX, e.clientY, endX, endY);
        
        const newTrace: CircuitTrace = {
          id: traceIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          endX: endX,
          endY: endY,
          opacity: 0.9,
          width: Math.random() * 2 + 1, // Slightly thicker for lightning
          segments: pathSegments
        };
        
        setTraces(prev => [...prev.slice(-6), newTrace]); // Keep only last 6 traces
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent scrolling while touching
      const touch = e.touches[0];
      setMousePos({ x: touch.clientX, y: touch.clientY });
      
      // Create new trace every few touch movements
      if (Math.random() < 0.4) { // Slightly more frequent on touch
        // Lightning traces with more variation
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 30; // Slightly shorter for mobile
        const endX = touch.clientX + Math.cos(angle) * distance;
        const endY = touch.clientY + Math.sin(angle) * distance;
        
        // Generate lightning path
        const pathSegments = generateLightningPath(touch.clientX, touch.clientY, endX, endY);
        
        const newTrace: CircuitTrace = {
          id: traceIdRef.current++,
          x: touch.clientX,
          y: touch.clientY,
          endX: endX,
          endY: endY,
          opacity: 0.9,
          width: Math.random() * 2 + 1,
          segments: pathSegments
        };
        
        setTraces(prev => [...prev.slice(-6), newTrace]);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setMousePos({ x: touch.clientX, y: touch.clientY });
    };

    // Add event listeners for both mouse and touch
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  // Clean up old traces
  useEffect(() => {
    const interval = setInterval(() => {
      setTraces(prev => prev.filter(trace => trace.opacity > 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Fade out traces over time
  useEffect(() => {
    const interval = setInterval(() => {
      setTraces(prev => 
        prev.map(trace => ({
          ...trace,
          opacity: trace.opacity * 0.95 // Faster fade for lightning effect
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full" style={{ filter: 'blur(0.2px)' }}>
        {traces.map((trace) => (
          <g key={trace.id}>
            {/* Lightning segments */}
            {trace.segments.map((segment, index) => (
              <motion.line
                key={`segment-${trace.id}-${index}`}
                x1={segment.x}
                y1={segment.y}
                x2={segment.endX}
                y2={segment.endY}
                stroke="#60A5FA" // Brighter blue for lightning
                strokeWidth={trace.width}
                opacity={trace.opacity * (1 - index * 0.1)} // Fade along the tail
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(96, 165, 250, 0.8))'
                }}
              />
            ))}
          </g>
        ))}
        
        {/* Lightning nodes */}
        {traces.map((trace) => (
          <motion.circle
            key={`node-${trace.id}`}
            cx={trace.x}
            cy={trace.y}
            r="2"
            fill="#60A5FA"
            opacity={trace.opacity}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 1))'
            }}
          />
        ))}
      </svg>
      
      {/* Subtle grid pattern - only in background areas */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          zIndex: -1
        }}
      />
    </div>
  );
};

export default CircuitBackground; 