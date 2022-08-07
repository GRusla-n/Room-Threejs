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
        const geometry = new THREE.CircleGeometry(5, 64);
        const materialOne = new THREE.MeshStandardMaterial({color: '#e5a1aa'});
        const materialTwo = new THREE.MeshStandardMaterial({color: '#8395CD'});
        const materialThree = new THREE.MeshStandardMaterial({color: '#7AD0AC'});
        this.circleOne = new THREE.Mesh(geometry, materialOne);
        this.circleTwo = new THREE.Mesh(geometry, materialTwo);
        this.circleThree = new THREE.Mesh(geometry, materialThree);

        this.circleOne.position.y = -0.29

        this.circleTwo.position.y = -0.28
        this.circleTwo.position.x = 1.5

        this.circleThree.position.y = -0.27

        this.circleOne.scale.set(0, 0, 0)
        this.circleTwo.scale.set(0, 0, 0)
        this.circleThree.scale.set(0, 0, 0)

        this.circleOne.rotation.x = this.circleTwo.rotation.x = this.circleThree.rotation.x = -Math.PI / 2
        this.circleOne.receiveShadow = this.circleTwo.receiveShadow = this.circleThree.receiveShadow = true


        this.scene.add(this.circleOne);
        this.scene.add(this.circleTwo);
        this.scene.add(this.circleThree);
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

    resize() {
    }

    update() {
    }
}
