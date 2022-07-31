import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience'

export default class Floor {
    constructor() {
        this.expirience = new Experience()
        this.time = this.expirience.time
        this.scene = this.expirience.scene
        this.resources = this.expirience.resources
        this.room = this.resources.items.room
        this.roomScene = this.room.scene

        this.setFloor()
        this.setCircles()
    }

    setCircles() {

    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100)
        this.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            side: THREE.BackSide,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.rotation.x = Math.PI / 2
        this.plane.position.y = -0.3
        this.plane.receiveShadow = true
        this.scene.add(this.plane)
    }

    resize() {}

    update() {}
}
