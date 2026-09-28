import * as THREE from 'three';
import { createInvitationTextures, createInvitationMaterials } from './InvitationMaterials';

export interface GatefoldMeshStructure {
  cardRoot: THREE.Group;
  leftPivot: THREE.Group;
  rightPivot: THREE.Group;
  leftPanel: THREE.Mesh;
  rightPanel: THREE.Mesh;
  centerPanel: THREE.Mesh;
  bellyBandGroup: THREE.Group;
  bellyBandMesh: THREE.Mesh;
  waxSealMesh: THREE.Mesh;
  materials: ReturnType<typeof createInvitationMaterials>;
  textures: ReturnType<typeof createInvitationTextures>;
}

/**
 * Constructs the authentic 3-panel gatefold 3D geometry with pivot groups
 * and realistic paper thickness slab panels.
 */
export function buildGatefoldInvitation(): GatefoldMeshStructure {
  const textures = createInvitationTextures();
  const materials = createInvitationMaterials(textures);

  const cardRoot = new THREE.Group();
  cardRoot.name = 'CardRoot';

  // Panel Dimensions (Units in Three.js coordinate space)
  const centerWidth = 4.0;
  const sideWidth = 2.0;
  const height = 6.0;
  const thickness = 0.04; // Realistic paper slab thickness

  // -------------------------------------------------------------
  // 1. CENTER PANEL (Fixed Anchor)
  // -------------------------------------------------------------
  // Materials array for box sides: [Right, Left, Top, Bottom, Front (+Z), Back (-Z)]
  const centerMaterials: THREE.Material[] = [
    materials.paperBaseMaterial, // +X
    materials.paperBaseMaterial, // -X
    materials.paperBaseMaterial, // +Y
    materials.paperBaseMaterial, // -Y
    materials.innerCenterMaterial, // Front (+Z)
    materials.paperBaseMaterial, // Back (-Z)
  ];

  const centerGeo = new THREE.BoxGeometry(centerWidth, height, thickness);
  const centerPanel = new THREE.Mesh(centerGeo, centerMaterials);
  centerPanel.name = 'CenterPanel';
  centerPanel.position.set(0, 0, 0);
  centerPanel.castShadow = true;
  centerPanel.receiveShadow = true;
  cardRoot.add(centerPanel);

  // -------------------------------------------------------------
  // 2. LEFT PIVOT & PANEL
  // -------------------------------------------------------------
  const leftPivot = new THREE.Group();
  leftPivot.name = 'LeftPivot';
  leftPivot.position.set(-centerWidth / 2, 0, thickness / 2);

  const leftGeo = new THREE.BoxGeometry(sideWidth, height, thickness);
  // Materials array for Left Panel box:
  // Note: When closed (180° rotation around LeftPivot), the Back (-Z) face of LeftPanel becomes the front-facing exterior!
  const leftMaterials: THREE.Material[] = [
    materials.paperBaseMaterial, // +X
    materials.paperBaseMaterial, // -X
    materials.paperBaseMaterial, // +Y
    materials.paperBaseMaterial, // -Y
    materials.innerLeftMaterial, // Front (+Z): Inner flap artwork
    materials.frontLeftMaterial, // Back (-Z): Closed exterior facade left half
  ];

  const leftPanel = new THREE.Mesh(leftGeo, leftMaterials);
  leftPanel.name = 'LeftPanel';
  // Offset mesh so its right edge lies directly on the pivot origin (0, 0, 0)
  leftPanel.position.set(-sideWidth / 2, 0, 0);
  leftPanel.castShadow = true;
  leftPanel.receiveShadow = true;
  leftPivot.add(leftPanel);
  cardRoot.add(leftPivot);

  // -------------------------------------------------------------
  // 3. RIGHT PIVOT & PANEL
  // -------------------------------------------------------------
  const rightPivot = new THREE.Group();
  rightPivot.name = 'RightPivot';
  rightPivot.position.set(centerWidth / 2, 0, thickness / 2);

  const rightGeo = new THREE.BoxGeometry(sideWidth, height, thickness);
  const rightMaterials: THREE.Material[] = [
    materials.paperBaseMaterial, // +X
    materials.paperBaseMaterial, // -X
    materials.paperBaseMaterial, // +Y
    materials.paperBaseMaterial, // -Y
    materials.innerRightMaterial, // Front (+Z): Inner flap artwork
    materials.frontRightMaterial, // Back (-Z): Closed exterior facade right half
  ];

  const rightPanel = new THREE.Mesh(rightGeo, rightMaterials);
  rightPanel.name = 'RightPanel';
  // Offset mesh so its left edge lies directly on the pivot origin (0, 0, 0)
  rightPanel.position.set(sideWidth / 2, 0, 0);
  rightPanel.castShadow = true;
  rightPanel.receiveShadow = true;
  rightPivot.add(rightPanel);
  cardRoot.add(rightPivot);

  // Initial State: Closed (LeftPivot = Math.PI, RightPivot = -Math.PI)
  leftPivot.rotation.y = Math.PI;
  rightPivot.rotation.y = -Math.PI;

  // -------------------------------------------------------------
  // 4. BURGUNDY VELVET BELLY BAND & GOLD WAX SEAL
  // -------------------------------------------------------------
  const bellyBandGroup = new THREE.Group();
  bellyBandGroup.name = 'BellyBandGroup';
  bellyBandGroup.position.set(0, 0, thickness + 0.02);

  // Velvet band sleeve mesh
  const bandWidth = centerWidth + 0.08;
  const bandHeight = 1.6;
  const bandDepth = 0.06;
  const bandGeo = new THREE.BoxGeometry(bandWidth, bandHeight, bandDepth);
  const bellyBandMesh = new THREE.Mesh(bandGeo, materials.velvetBellyBandMaterial);
  bellyBandMesh.name = 'BellyBandMesh';
  bellyBandMesh.castShadow = true;
  bellyBandMesh.receiveShadow = true;
  bellyBandGroup.add(bellyBandMesh);

  // 3D Embossed Gold Wax Seal Medallion
  const sealGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32);
  // Rotate cylinder to face camera along +Z axis
  sealGeo.rotateX(Math.PI / 2);
  const waxSealMesh = new THREE.Mesh(sealGeo, materials.goldWaxSealMaterial);
  waxSealMesh.name = 'WaxSealMesh';
  waxSealMesh.position.set(0, 0, bandDepth / 2 + 0.04);
  waxSealMesh.castShadow = true;
  waxSealMesh.receiveShadow = true;
  bellyBandGroup.add(waxSealMesh);

  // Add inner seal emblem ring detail
  const sealRingGeo = new THREE.TorusGeometry(0.42, 0.03, 16, 32);
  const sealRingMesh = new THREE.Mesh(sealRingGeo, materials.goldWaxSealMaterial);
  sealRingMesh.position.set(0, 0, bandDepth / 2 + 0.08);
  bellyBandGroup.add(sealRingMesh);

  cardRoot.add(bellyBandGroup);

  return {
    cardRoot,
    leftPivot,
    rightPivot,
    leftPanel,
    rightPanel,
    centerPanel,
    bellyBandGroup,
    bellyBandMesh,
    waxSealMesh,
    materials,
    textures,
  };
}
