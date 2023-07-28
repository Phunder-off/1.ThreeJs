import * as THREE from 'three';

import Player from './player';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 5);

const player = new Player(scene, camera, renderer.domElement);

const circle = new THREE.Mesh(
    new THREE.CircleGeometry(4.9, 25, 25),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
circle.rotation.x = - Math.PI / 2;
circle.position.set(0, -1.5, 0);
scene.add(circle);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 25, 25),
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
);
scene.add(sphere);


function animate() {
    requestAnimationFrame(animate);
    player.update(0.1)
    renderer.render(scene, camera);
}
animate();