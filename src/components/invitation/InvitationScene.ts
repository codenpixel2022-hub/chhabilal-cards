import * as THREE from 'three';
import { buildGatefoldInvitation, GatefoldMeshStructure } from './InvitationGeometry';

export interface SceneOptions {
  container: HTMLDivElement;
  onLoaded?: () => void;
}

export class InvitationSceneManager {
  private container: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private gatefold: GatefoldMeshStructure;
  private animationFrameId: number | null = null;
  private isAutoRotating: boolean = false;
  private openingProgress: number = 0; // 0 = Closed, 1 = Fully Open
  private targetProgress: number = 0;
  private currentCameraAngleY: number = 0;
  private isDestroyed: boolean = false;

  constructor(options: SceneOptions) {
    this.container = options.container;

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.background = null; // Transparent canvas to seamlessly blend with site hero background

    // 2. Camera Setup
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 500;
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    this.camera.position.set(0, 1.2, 9.5);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Setup (Product Photography Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xfffaee, 1.4);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(5, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe6f0ff, 0.8);
    fillLight.position.set(-6, 4, 5);
    this.scene.add(fillLight);

    const goldRimLight = new THREE.PointLight(0xffd700, 2.0, 15);
    goldRimLight.position.set(0, 3, -4);
    this.scene.add(goldRimLight);

    // 5. Contact Shadow Ground Plane
    const shadowGeo = new THREE.PlaneGeometry(20, 20);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -3.2;
    shadowPlane.receiveShadow = true;
    this.scene.add(shadowPlane);

    // 6. Build Gatefold Geometry
    this.gatefold = buildGatefoldInvitation();
    this.scene.add(this.gatefold.cardRoot);

    // 7. Initial State Setup
    this.updateOpeningState(0);

    // 8. Window Resize Listener
    window.addEventListener('resize', this.handleResize);

    // 9. Start Render Loop
    this.renderLoop();

    if (options.onLoaded) {
      options.onLoaded();
    }
  }

  /**
   * Sets opening progress continuously from 0 (Closed) to 1 (Fully Open)
   */
  public setProgress(target: number): void {
    this.targetProgress = Math.max(0, Math.min(1, target));
  }

  /**
   * Returns current opening progress
   */
  public getProgress(): number {
    return this.openingProgress;
  }

  /**
   * Toggles auto-rotate
   */
  public setAutoRotate(rotate: boolean): void {
    this.isAutoRotating = rotate;
  }

  public isAutoRotatingActive(): boolean {
    return this.isAutoRotating;
  }

  /**
   * Updates panel rotation angles and belly band positions based on progress value
   */
  private updateOpeningState(p: number): void {
    // Left Pivot: Math.PI (180° closed) -> 0 (0° fully open)
    const leftAngle = Math.PI * (1 - p);
    this.gatefold.leftPivot.rotation.y = leftAngle;

    // Right Pivot: -Math.PI (-180° closed) -> 0 (0° fully open)
    const rightAngle = -Math.PI * (1 - p);
    this.gatefold.rightPivot.rotation.y = rightAngle;

    // Belly Band Slide & Scale Out
    if (p < 0.3) {
      const bandFactor = p / 0.3;
      this.gatefold.bellyBandGroup.position.y = -bandFactor * 3.5;
      this.gatefold.bellyBandGroup.scale.setScalar(1 - bandFactor * 0.2);
      this.gatefold.bellyBandGroup.visible = true;
    } else {
      this.gatefold.bellyBandGroup.position.y = -3.5;
      this.gatefold.bellyBandGroup.visible = false;
    }

    // Dynamic Camera Zoom & Tilt
    // At fully open state, bring camera slightly closer and center
    const camZ = 9.5 - p * 1.5;
    const camY = 1.2 - p * 0.4;
    this.camera.position.z = camZ;
    this.camera.position.y = camY;
  }

  private renderLoop = (): void => {
    if (this.isDestroyed) return;

    // Smoothly interpolate current progress towards target progress
    const delta = (this.targetProgress - this.openingProgress) * 0.08;
    if (Math.abs(delta) > 0.0001) {
      this.openingProgress += delta;
      this.updateOpeningState(this.openingProgress);
    }

    // Auto rotate around Y axis if enabled
    if (this.isAutoRotating) {
      this.currentCameraAngleY += 0.005;
      this.gatefold.cardRoot.rotation.y = Math.sin(this.currentCameraAngleY) * 0.25;
    } else {
      // Return to center smoothly
      this.gatefold.cardRoot.rotation.y *= 0.92;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.renderLoop);
  };

  private handleResize = (): void => {
    if (this.isDestroyed || !this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 500;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    // Mobile camera distance scaling
    if (width < 640) {
      this.gatefold.cardRoot.scale.setScalar(0.75);
    } else {
      this.gatefold.cardRoot.scale.setScalar(1.0);
    }
  };

  /**
   * Cleans up WebGL resources and event listeners
   */
  public dispose(): void {
    this.isDestroyed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);

    // Dispose Geometries & Materials
    this.gatefold.cardRoot.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else if (child.material) {
          child.material.dispose();
        }
      }
    });

    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
