'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Optimized Floating Element Component
function FloatingElement({ 
  position, 
  color, 
  speed = 1, 
  type = 'sphere' 
}: { 
  position: [number, number, number], 
  color: string, 
  speed?: number,
  type?: 'sphere' | 'box' | 'torus'
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed
      meshRef.current.rotation.x = time * 0.5
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.3
    }
  })

  const renderElement = () => {
    switch (type) {
      case 'box':
        return <Box ref={meshRef} position={position} args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color={color} />
        </Box>
      case 'torus':
        return <Torus ref={meshRef} position={position} args={[0.25, 0.08, 8, 16]}>
          <meshStandardMaterial color={color} />
        </Torus>
      default:
        return <Sphere ref={meshRef} position={position} args={[0.25, 16, 16]}>
          <meshStandardMaterial color={color} />
        </Sphere>
    }
  }

  return renderElement()
}

// Main 3D Scene Component
function Scene3D() {
  return (
    <>
      {/* Optimized Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      
      {/* Floating Elements with restaurant theme colors */}
      <FloatingElement position={[-1.5, 0, 0]} color="#10B981" speed={0.8} type="sphere" />
      <FloatingElement position={[1.5, 0.5, -0.5]} color="#F59E0B" speed={1.0} type="box" />
      <FloatingElement position={[0, -0.5, 0.5]} color="#8B5CF6" speed={0.6} type="torus" />
      <FloatingElement position={[-0.8, 1, 0]} color="#EF4444" speed={1.2} type="sphere" />
      <FloatingElement position={[0.8, -0.8, -0.3]} color="#06B6D4" speed={0.9} type="box" />
      
      {/* Gentle auto-rotation */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

// Main Component
export default function FloatingElementsSimple() {
  return (
    <div className="w-full h-80 relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <Scene3D />
      </Canvas>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🍽️ Interactive 3D</h3>
          <p className="text-sm text-gray-600">Drag to explore our digital space</p>
        </div>
      </div>
    </div>
  )
}
