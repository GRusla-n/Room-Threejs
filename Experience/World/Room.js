import * as THREE from 'three'
import GSAP from 'gsap'
import Experience from '../Experience'

export default class Room {
    constructor() {
        this.expirience = new Experience()
        this.time = this.expirience.time
        this.scene = this.expirience.scene
        this.resources = this.expirience.resources
        this.room = this.resources.items.room
        this.roomScene = this.room.scene
        this.roomChildren = {}
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.9,
        }

        this.setModel()
        this.setAnimation()
        this.onMouseMove()
    }

    setModel() {
        this.roomScene.children.forEach((child) => {
            child.castShadow = true
            child.receiveShadow = true

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }

            if (child.name === 'DoorGlass') {
                child.material = new THREE.MeshPhysicalMaterial()
                child.material.roughness = 0.2
                child.material.color.set('#ffffff')
                child.material.ior = 3
                child.material.transmission = 0.9
                child.material.opacity = 0.9
            }

            if (child.name === 'Screen') {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen.screen,
                })
            }

            child.scale.set(0, 0, 0)
            if (child.name === 'Cube') {
                // child.scale.set(1, 1, 1)
                child.position.set(0, 0.5, 0)
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        })
        this.scene.add(this.roomScene)
    }

    onMouseMove() {
        window.addEventListener('mousemove', (event) => {
            this.rotation =
                ((event.clientX - window.innerWidth / 2) * 2) /
                window.innerWidth

            this.lerp.target = this.rotation * 0.1
        })
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.roomScene)
    }

    resize() {
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.target,
            this.lerp.current,
            this.lerp.ease
        )

        this.roomScene.rotation.y = this.lerp.current

        this.mixer.update(this.time.delta * 0.0009)
    }
}
