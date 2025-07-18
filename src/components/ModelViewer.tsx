'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url)
  return <primitive object={gltf.scene} scale={1.5} />
}

export default function ModelViewer({ url }: { url: string }) {
  if (!url) {
    return (
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl border">
        <span className="text-gray-400">No 3D model available 😢</span>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border bg-white shadow">
      <Canvas
        shadows
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ backgroundColor: '#f9fafb' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
        <Environment preset="sunset" />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={1.5}
          maxDistance={6}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
          autoRotate={true}
          autoRotateSpeed={1.2}
          enableDamping={true}
          dampingFactor={0.1}
        />

        <Suspense fallback={
          <Html center>
            <div className="text-gray-500 text-sm">Loading 3D model...</div>
          </Html>
        }>
          <Model url={url} />
        </Suspense>
      </Canvas>
    </div>
  )
}
