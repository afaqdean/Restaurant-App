'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus, Text3D } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating Sphere Component
function FloatingSphere({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

// Floating Box Component
function FloatingBox({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + 1) * 0.3
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

// Floating Torus Component
function FloatingTorus({ position, color, speed = 1 }: { position: [number, number, number], color: string, speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + 2) * 0.4
    }
  })

  return (
    <Torus ref={meshRef} position={position} args={[0.3, 0.1, 16, 32]}>
      <meshStandardMaterial color={color} />
    </Torus>
  )
}

// Main 3D Scene Component
function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Floating Elements */}
      <FloatingSphere position={[-2, 0, 0]} color="#10B981" speed={0.8} />
      <FloatingSphere position={[2, 1, -1]} color="#F59E0B" speed={1.2} />
      <FloatingBox position={[0, -1, 1]} color="#8B5CF6" speed={0.6} />
      <FloatingBox position={[-1.5, 1.5, 0]} color="#EF4444" speed={1.0} />
      <FloatingTorus position={[1.5, -0.5, -0.5]} color="#06B6D4" speed={0.9} />
      <FloatingTorus position={[-0.5, 2, 1]} color="#84CC16" speed={1.1} />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// Main Component
export default function FloatingElements3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene3D />
      </Canvas>
      
      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Experience</h3>
          <p className="text-gray-600">Drag to explore • Scroll to zoom</p>
        </div>
      </div>
    </div>
  )
}
