'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export default function Product3DViewer() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border bg-white shadow">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <OrbitControls enableZoom={true} />
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#1e40af" />
        </mesh>
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
