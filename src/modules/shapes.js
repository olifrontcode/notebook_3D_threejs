import * as THREE from 'three';
import { scene } from './scene';


// -------------------------- Wires ⭕ -------------------------- //

const wiresInfo = {
    ringCount: 6, 
    ringSpacing: 0.6, 
    ringRadius: 0.15,  
    tubeRadius: 0.03,
}

const ringMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888, 
    metalness: 0.8, 
    roughness: 0.2 
})

for (let i = 0; i < wiresInfo.ringCount; i++) {
    const ringGeometry = new THREE.TorusGeometry(wiresInfo.ringRadius, wiresInfo.tubeRadius, 16, 100);
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);

    ringMesh.position.x = -((wiresInfo.ringCount - 1) * wiresInfo.ringSpacing) / 2 + i * wiresInfo.ringSpacing;
    ringMesh.position.y = 0;
    ringMesh.position.z = 0;
    ringMesh.rotation.y = Math.PI / 2;

    scene.add(ringMesh);
}


// -------------------------- Notebook 📔 -------------------------- //

const textureLoader = new THREE.TextureLoader();

export let currentPage = 0
export const pages = [];

const pictures = [
  "https://i.postimg.cc/SRDL44Yv/1000014341.webp", 
  "https://i.postimg.cc/593SLBKS/1000014343.webp",
  "https://i.postimg.cc/ZK5FcW1t/1000014344.webp",
  "https://i.postimg.cc/fTq7gwN3/1000014345.webp",
  "https://i.postimg.cc/8zFR2qpZ/1000014346.webp",
  "https://i.postimg.cc/NjW6BpLB/1000014347.webp",
];

const loadTextureAsync = (url) => {
    return new Promise((resolve, reject) => {
      textureLoader.load(
        url,
        (texture) => resolve(texture),
        undefined,
        (err) => reject(err)
      );
    });
}

for (let [index, url] of pictures.entries()) {

  const texture = await loadTextureAsync(url);
  const geometry = new THREE.PlaneGeometry(4, 5);
  const material = new THREE.MeshPhongMaterial();
  const page = new THREE.Mesh(geometry, material);

  material.shininess = 90;
  material.map = texture;
  material.side = THREE.DoubleSide;
  
  page.position.z = index * 0.001;
  page.position.y = -2.5;
  
  scene.add(page);
  pages.push(page);
  
  currentPage = pages.length - 1;
}