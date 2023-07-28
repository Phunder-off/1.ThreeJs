import * as THREE from 'three';

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const _vector = new THREE.Vector3();

class Player {


    /**
     * Player constructor
     * @param {THREE.Camera} camera
     * @param {HTMLElement} domElement
     */
    constructor(scene, camera, domElement) {
        this.camera = camera;
        this.domElement = domElement;


        this.movementSpeed = 1.0;
        this.speedFactor = 3;

        this.controls = new PointerLockControls(camera, domElement);

        this._onKeyDown = this.onKeyDown.bind(this);
        this._onKeyUp = this.onKeyUp.bind(this);
        this._onClick = this.onClick.bind(this);

        window.addEventListener('click', this._onClick);
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);

        this.player = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        );
        scene.add(this.player);

    }

    onClick = () => {
        this.controls.lock();
    };

    onKeyDown = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = true; break;

            case 'ControlLeft': this.speed = true; break;

            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = true; break;

            case 'ArrowDown':
            case 'KeyS': this.moveBackward = true; break;

            case 'ArrowRight':
            case 'KeyD': this.moveRight = true; break;

            case 'Space': this.moveUp = true; break;
            case 'ShiftLeft': this.moveDown = true; break;
        }
    };

    onKeyUp = (event) => {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW': this.moveForward = false; break;

            case 'ControlLeft': this.speed = false; break;

            case 'ArrowLeft':
            case 'KeyA': this.moveLeft = false; break;

            case 'ArrowDown':
            case 'KeyS': this.moveBackward = false; break;

            case 'ArrowRight':
            case 'KeyD': this.moveRight = false; break;

            case 'Space': this.moveUp = false; break;
            case 'ShiftLeft': this.moveDown = false; break;
        }
    };


    movementUp(moveSpeed) {
        this.camera.position.y += moveSpeed;
    }

    move(delta) {
        const actualMoveSpeed = delta * this.movementSpeed;

        if (this.moveForward) this.controls.moveForward(actualMoveSpeed * (this.speed ? this.speedFactor : 1));
        if (this.moveBackward) this.controls.moveForward(-actualMoveSpeed);

        if (this.moveLeft) this.controls.moveRight(- actualMoveSpeed);
        if (this.moveRight) this.controls.moveRight(actualMoveSpeed);

        if (this.moveUp) this.movementUp(actualMoveSpeed);

        if (this.moveDown) this.movementUp(-actualMoveSpeed);
    };

    movePlayer() {
        if (!this.controls.isLocked) return;
        const camPos = this.camera.position;
        this.player.position.set(camPos.x - 1, camPos.y - 0.5, camPos.z);
    };

    update(delta) {
        this.move(delta);
        this.movePlayer();
    };
}

export default Player;
