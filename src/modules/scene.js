import * as THREE from 'three';
import { DOM } from './DOM';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// -------------------------- SCENE 🎭 -------------------------- //

export const scene = new THREE.Scene();



// -------------------------- LIGHT 💡 -------------------------- //


const backLight = new THREE.PointLight(0xffffff, 100);
backLight.position.set(-5, -2.5, -3)
scene.add(backLight);

const frontLight = new THREE.PointLight(0xffffff, 100);
frontLight.position.set(-5, -2.5, 2)
scene.add(frontLight);



// -------------------------- CAMERA 📷 -------------------------- //

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
camera.position.z = 10;
camera.position.y = -2.5;


// -------------------------- AXES ⬆️➡️ -------------------------- //

// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

// ---------------------------------------------
// Blue: Z    |     Green: Y    |    Red: X  |
// ---------------------------------------------


// -------------------------- RENDERER 📷 -------------------------- //

const renderer = new THREE.WebGLRenderer(
    { 
        antialias: true,
        canvas: DOM.mainCanvas
    }
);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, DOM.mainCanvas);
controls.enableDamping = true;
controls.autoRotate = true;

const renderLoop = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderLoop);
}

renderLoop();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})
