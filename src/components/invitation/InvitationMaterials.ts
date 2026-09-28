import * as THREE from 'three';
import closedRefImg from '../../assets/invitation/closed-reference.png';
import fullyOpenRefImg from '../../assets/invitation/fully-open-reference.png';
import halfOpenRefImg from '../../assets/invitation/half-open-reference.png';

export interface CardTextureSet {
  frontLeftTexture: THREE.Texture;
  frontRightTexture: THREE.Texture;
  innerCenterTexture: THREE.Texture;
  innerLeftTexture: THREE.Texture;
  innerRightTexture: THREE.Texture;
  paperBumpTexture: THREE.Texture;
}

/**
 * Draw a rich royal gold & crimson gatefold facade onto a 2D canvas context.
 */
function drawFrontFlapCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, isRight: boolean) {
  // Rich deep crimson background
  ctx.fillStyle = '#58141C';
  ctx.fillRect(0, 0, width, height);

  // Outer gold foil double border
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 8;
  ctx.strokeRect(16, 16, width - 32, height - 32);
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, width - 56, height - 56);

  // Corner floral filigree accents
  const drawCorner = (x: number, y: number) => {
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.stroke();
  };
  drawCorner(45, 45);
  drawCorner(width - 45, 45);
  drawCorner(45, height - 45);
  drawCorner(width - 45, height - 45);

  // Central Gold Arch & Ganesha Emblem
  ctx.fillStyle = '#FAF6EE';
  ctx.font = 'bold 32px "Cinzel", serif';
  ctx.textAlign = 'center';

  if (!isRight) {
    ctx.fillText('॥ श्री ॥', width / 2, height / 2 - 40);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 44px serif';
    ctx.fillText('卐 ॐ 卐', width / 2, height / 2 + 20);
    ctx.fillStyle = '#FAF6EE';
    ctx.font = 'bold 20px "Cinzel", serif';
    ctx.fillText('SHUBH VIVAH', width / 2, height / 2 + 70);
  } else {
    ctx.fillText('॥ गणेशाय नमः ॥', width / 2, height / 2 - 40);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 44px serif';
    ctx.fillText('🏺 ॐ 🏺', width / 2, height / 2 + 20);
    ctx.fillStyle = '#FAF6EE';
    ctx.font = 'bold 20px "Cinzel", serif';
    ctx.fillText('INVITATION', width / 2, height / 2 + 70);
  }
}

/**
 * Creates dynamic canvas textures for all 5 gatefold card surfaces,
 * blending reference photography with crisp vector text.
 */
export function createInvitationTextures(): CardTextureSet {
  const textureLoader = new THREE.TextureLoader();

  // 1. Procedural micro-grain paper bump texture
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 512;
  bumpCanvas.height = 512;
  const bumpCtx = bumpCanvas.getContext('2d');
  if (bumpCtx) {
    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, 512, 512);
    const imgData = bumpCtx.getImageData(0, 0, 512, 512);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      imgData.data[i] = Math.min(255, Math.max(0, 128 + noise));
      imgData.data[i + 1] = Math.min(255, Math.max(0, 128 + noise));
      imgData.data[i + 2] = Math.min(255, Math.max(0, 128 + noise));
    }
    bumpCtx.putImageData(imgData, 0, 0);
  }
  const paperBumpTexture = new THREE.CanvasTexture(bumpCanvas);
  paperBumpTexture.wrapS = THREE.RepeatWrapping;
  paperBumpTexture.wrapT = THREE.RepeatWrapping;
  paperBumpTexture.repeat.set(4, 4);

  // 2. Front Left Flap Canvas Texture
  const frontLeftCanvas = document.createElement('canvas');
  frontLeftCanvas.width = 512;
  frontLeftCanvas.height = 1440;
  const ctxFL = frontLeftCanvas.getContext('2d');
  if (ctxFL) drawFrontFlapCanvas(ctxFL, 512, 1440, false);
  const frontLeftTexture = new THREE.CanvasTexture(frontLeftCanvas);
  frontLeftTexture.colorSpace = THREE.SRGBColorSpace;

  // 3. Front Right Flap Canvas Texture
  const frontRightCanvas = document.createElement('canvas');
  frontRightCanvas.width = 512;
  frontRightCanvas.height = 1440;
  const ctxFR = frontRightCanvas.getContext('2d');
  if (ctxFR) drawFrontFlapCanvas(ctxFR, 512, 1440, true);
  const frontRightTexture = new THREE.CanvasTexture(frontRightCanvas);
  frontRightTexture.colorSpace = THREE.SRGBColorSpace;

  // Load Closed Reference Image & overlay onto Front Flap Canvases
  const imgClosed = new Image();
  imgClosed.src = closedRefImg;
  imgClosed.onload = () => {
    if (ctxFL) {
      ctxFL.drawImage(imgClosed, 0, 0, imgClosed.width / 2, imgClosed.height, 0, 0, 512, 1440);
      frontLeftTexture.needsUpdate = true;
    }
    if (ctxFR) {
      ctxFR.drawImage(imgClosed, imgClosed.width / 2, 0, imgClosed.width / 2, imgClosed.height, 0, 0, 512, 1440);
      frontRightTexture.needsUpdate = true;
    }
  };

  // 4. Inner Center Panel Texture
  const innerCenterCanvas = document.createElement('canvas');
  innerCenterCanvas.width = 1024;
  innerCenterCanvas.height = 1440;
  const ctxCenter = innerCenterCanvas.getContext('2d');
  if (ctxCenter) {
    ctxCenter.fillStyle = '#FAF6EE';
    ctxCenter.fillRect(0, 0, 1024, 1440);

    ctxCenter.strokeStyle = '#D4AF37';
    ctxCenter.lineWidth = 8;
    ctxCenter.strokeRect(30, 30, 964, 1380);
    ctxCenter.lineWidth = 3;
    ctxCenter.strokeRect(44, 44, 936, 1352);

    ctxCenter.fillStyle = '#8B0000';
    ctxCenter.font = 'bold 38px "Cinzel", "Playfair Display", serif';
    ctxCenter.textAlign = 'center';
    ctxCenter.fillText('॥ श्री गणेशाय नमः ॥', 512, 120);

    ctxCenter.fillStyle = '#4A0E17';
    ctxCenter.font = '24px "Cinzel", serif';
    ctxCenter.fillText('वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।', 512, 180);
    ctxCenter.fillText('निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥', 512, 218);

    ctxCenter.strokeStyle = '#D4AF37';
    ctxCenter.lineWidth = 3;
    ctxCenter.beginPath();
    ctxCenter.moveTo(312, 250);
    ctxCenter.lineTo(712, 250);
    ctxCenter.stroke();

    ctxCenter.fillStyle = '#8B0000';
    ctxCenter.font = 'bold 56px "Cinzel", "Playfair Display", serif';
    ctxCenter.fillText('AARAV', 512, 350);
    ctxCenter.fillStyle = '#D4AF37';
    ctxCenter.font = 'italic 36px serif';
    ctxCenter.fillText('&', 512, 410);
    ctxCenter.fillStyle = '#8B0000';
    ctxCenter.font = 'bold 56px "Cinzel", "Playfair Display", serif';
    ctxCenter.fillText('ANANYA', 512, 480);

    ctxCenter.fillStyle = '#2D2926';
    ctxCenter.font = '22px sans-serif';
    ctxCenter.fillText('Solicit your gracious presence at the wedding ceremony of their children', 512, 550);

    ctxCenter.fillStyle = '#4A0E17';
    ctxCenter.font = 'bold 30px "Cinzel", serif';
    ctxCenter.fillText('SUNDAY, DECEMBER 14, 2026', 512, 630);
    ctxCenter.font = '22px sans-serif';
    ctxCenter.fillText('Baraat & Swagat: 7:00 PM | Hastamilan: 9:30 PM', 512, 675);

    ctxCenter.fillStyle = '#8B0000';
    ctxCenter.font = 'bold 28px "Cinzel", serif';
    ctxCenter.fillText('THE ROYAL MANDAP PALACE', 512, 750);
    ctxCenter.fillStyle = '#2D2926';
    ctxCenter.font = '20px sans-serif';
    ctxCenter.fillText('Grand Ballroom, Highway Road, Brajarajnagar, Jharsuguda', 512, 790);

    ctxCenter.strokeStyle = '#D4AF37';
    ctxCenter.lineWidth = 2;
    ctxCenter.beginPath();
    ctxCenter.moveTo(212, 850);
    ctxCenter.lineTo(812, 850);
    ctxCenter.stroke();

    ctxCenter.fillStyle = '#8B0000';
    ctxCenter.font = 'bold 22px "Cinzel", serif';
    ctxCenter.fillText('R.S.V.P: CHHABILAL FAMILY & RELATIVES', 512, 900);
    ctxCenter.fillStyle = '#555';
    ctxCenter.font = '18px sans-serif';
    ctxCenter.fillText('With Best Compliments From All Friends & Relatives', 512, 940);
  }
  const innerCenterTexture = new THREE.CanvasTexture(innerCenterCanvas);
  innerCenterTexture.colorSpace = THREE.SRGBColorSpace;

  // 5. Inner Left Flap Texture
  const innerLeftCanvas = document.createElement('canvas');
  innerLeftCanvas.width = 512;
  innerLeftCanvas.height = 1440;
  const ctxLeft = innerLeftCanvas.getContext('2d');
  if (ctxLeft) {
    ctxLeft.fillStyle = '#F8F4EC';
    ctxLeft.fillRect(0, 0, 512, 1440);

    ctxLeft.strokeStyle = '#D4AF37';
    ctxLeft.lineWidth = 5;
    ctxLeft.strokeRect(20, 20, 472, 1400);

    ctxLeft.fillStyle = '#8B0000';
    ctxLeft.font = 'bold 28px "Cinzel", serif';
    ctxLeft.textAlign = 'center';
    ctxLeft.fillText('PROGRAMME', 256, 120);

    const events = [
      { name: 'GANESH PUJA', time: '10:00 AM', date: 'Dec 13' },
      { name: 'HALDI CEREMONY', time: '04:00 PM', date: 'Dec 13' },
      { name: 'SANGEET NIGHT', time: '08:00 PM', date: 'Dec 13' },
      { name: 'WEDDING CEREMONY', time: '07:00 PM', date: 'Dec 14' },
      { name: 'GRAND RECEPTION', time: '07:30 PM', date: 'Dec 15' },
    ];

    events.forEach((ev, idx) => {
      const y = 220 + idx * 160;
      ctxLeft.fillStyle = '#4A0E17';
      ctxLeft.font = 'bold 22px "Cinzel", serif';
      ctxLeft.fillText(ev.name, 256, y);
      ctxLeft.fillStyle = '#D4AF37';
      ctxLeft.font = 'bold 18px sans-serif';
      ctxLeft.fillText(`${ev.date} • ${ev.time}`, 256, y + 30);
      ctxLeft.strokeStyle = '#E5D6B0';
      ctxLeft.lineWidth = 1;
      ctxLeft.beginPath();
      ctxLeft.moveTo(100, y + 60);
      ctxLeft.lineTo(412, y + 60);
      ctxLeft.stroke();
    });
  }
  const innerLeftTexture = new THREE.CanvasTexture(innerLeftCanvas);
  innerLeftTexture.colorSpace = THREE.SRGBColorSpace;

  // 6. Inner Right Flap Texture
  const innerRightCanvas = document.createElement('canvas');
  innerRightCanvas.width = 512;
  innerRightCanvas.height = 1440;
  const ctxRight = innerRightCanvas.getContext('2d');
  if (ctxRight) {
    ctxRight.fillStyle = '#F8F4EC';
    ctxRight.fillRect(0, 0, 512, 1440);

    ctxRight.strokeStyle = '#D4AF37';
    ctxRight.lineWidth = 5;
    ctxRight.strokeRect(20, 20, 472, 1400);

    ctxRight.fillStyle = '#8B0000';
    ctxRight.font = 'bold 28px "Cinzel", serif';
    ctxRight.textAlign = 'center';
    ctxRight.fillText('LOCATION & HOSTS', 256, 120);

    ctxRight.fillStyle = '#2D2926';
    ctxRight.font = 'bold 20px "Cinzel", serif';
    ctxRight.fillText('GROOM\'S PARENTS', 256, 220);
    ctxRight.font = '18px sans-serif';
    ctxRight.fillText('Mrs. Sunita & Mr. Rajesh Sharma', 256, 255);

    ctxRight.fillStyle = '#2D2926';
    ctxRight.font = 'bold 20px "Cinzel", serif';
    ctxRight.fillText('BRIDE\'S PARENTS', 256, 360);
    ctxRight.font = '18px sans-serif';
    ctxRight.fillText('Mrs. Kavita & Mr. Ramesh Verma', 256, 395);

    ctxRight.fillStyle = '#8B0000';
    ctxRight.font = 'bold 22px "Cinzel", serif';
    ctxRight.fillText('CHHABILAL CARDS', 256, 520);
    ctxRight.fillStyle = '#666';
    ctxRight.font = '16px sans-serif';
    ctxRight.fillText('Crafted with love in Brajarajnagar', 256, 555);
    ctxRight.fillText('Jharsuguda, Odisha', 256, 580);
  }
  const innerRightTexture = new THREE.CanvasTexture(innerRightCanvas);
  innerRightTexture.colorSpace = THREE.SRGBColorSpace;

  // Load Fully Open Reference & Overlay onto Center Canvas when available
  const imgOpen = new Image();
  imgOpen.src = fullyOpenRefImg;
  imgOpen.onload = () => {
    if (ctxCenter) {
      ctxCenter.drawImage(imgOpen, 0, 0, 1024, 1440);
      innerCenterTexture.needsUpdate = true;
    }
  };

  return {
    frontLeftTexture,
    frontRightTexture,
    innerCenterTexture,
    innerLeftTexture,
    innerRightTexture,
    paperBumpTexture
  };
}

/**
 * Creates luxury PBR materials for ivory cotton paper, burgundy velvet, and champagne gold.
 */
export function createInvitationMaterials(textures: CardTextureSet) {
  const paperBaseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FAF6EE'),
    roughness: 0.65,
    metalness: 0.05,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.015,
  });

  const frontLeftMaterial = new THREE.MeshStandardMaterial({
    map: textures.frontLeftTexture,
    roughness: 0.45,
    metalness: 0.25,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.01,
  });

  const frontRightMaterial = new THREE.MeshStandardMaterial({
    map: textures.frontRightTexture,
    roughness: 0.45,
    metalness: 0.25,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.01,
  });

  const innerCenterMaterial = new THREE.MeshStandardMaterial({
    map: textures.innerCenterTexture,
    roughness: 0.5,
    metalness: 0.15,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.015,
  });

  const innerLeftMaterial = new THREE.MeshStandardMaterial({
    map: textures.innerLeftTexture,
    roughness: 0.5,
    metalness: 0.15,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.015,
  });

  const innerRightMaterial = new THREE.MeshStandardMaterial({
    map: textures.innerRightTexture,
    roughness: 0.5,
    metalness: 0.15,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.015,
  });

  const velvetBellyBandMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#58141C'),
    roughness: 0.9,
    metalness: 0.05,
    bumpMap: textures.paperBumpTexture,
    bumpScale: 0.03,
  });

  const goldWaxSealMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D4AF37'),
    roughness: 0.25,
    metalness: 0.85,
    envMapIntensity: 1.2,
  });

  return {
    paperBaseMaterial,
    frontLeftMaterial,
    frontRightMaterial,
    innerCenterMaterial,
    innerLeftMaterial,
    innerRightMaterial,
    velvetBellyBandMaterial,
    goldWaxSealMaterial,
  };
}
