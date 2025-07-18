// types/three-extensions.d.ts
declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three'
  import { Group, LoadingManager } from 'three'

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager)
    load(
      url: string,
      onLoad: (gltf: { scene: Group }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent | unknown) => void
    ): void
  }
}

declare module 'three/examples/jsm/webxr/ARButton' {
  import { WebGLRenderer } from 'three'
  export class ARButton {
    static createButton(renderer: WebGLRenderer): HTMLButtonElement
  }
}
