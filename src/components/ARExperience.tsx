'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js'

export default function ARExperience({ modelUrl }: { modelUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let model: THREE.Object3D
    let controller: THREE.Group

    const init = () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.xr.enabled = true
      renderer.xr.setReferenceSpaceType('local')
      container.appendChild(renderer.domElement)

      const arButton = ARButton.createButton(renderer)
      document.body.appendChild(arButton)

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20)

      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
      light.position.set(0.5, 1, 0.25)
      scene.add(light)

      controller = renderer.xr.getController(0) as THREE.Group
      controller.addEventListener('select', () => {
        if (model) {
          const newModel = model.clone()
          newModel.position.set(0, 0, -0.5).applyMatrix4(controller.matrixWorld)
          newModel.quaternion.setFromRotationMatrix(controller.matrixWorld)
          scene.add(newModel)
        }
      })
      scene.add(controller)

      const loader = new GLTFLoader()
      loader.load(
        modelUrl,
        (gltf) => {
          model = gltf.scene
          model.scale.set(0.2, 0.2, 0.2)
        },
        undefined,
        (err) => {
          console.error('Model loading error:', err)
          setError('Failed to load model')
        }
      )

      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera)
      })
    }

    init()

    return () => {
      renderer?.setAnimationLoop(null)
      renderer?.dispose()
      if (container) container.innerHTML = ''
      const arButton = document.body.querySelector('button[style*="AR"]')
      if (arButton) arButton.remove()
    }
  }, [modelUrl])

  return (
    <div
      ref={containerRef}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}
    >
      {error && (
        <div className="text-red-600 absolute top-4 left-4 bg-white p-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}
