import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap'
import GUI from 'lil-gui'

export default class Environment {
    constructor() {
        this.expirience = new Experience()
        this.scene = this.expirience.scene
        this.resources = this.expirience.resources

        this.gui = new GUI()
        this.obj = {
            color: {r: 0, g: 0, b: 0},
            intensity: 3
        }

        this.setSunlight()
        this.setGUI()
    }

    setGUI() {
        this.gui.addColor(this.obj, 'color').onChange(() => {
            console.log(this.obj.color)
            this.sunlight.color.copy(this.obj.color)
            this.ambientLight.color.copy(this.obj.color)
        })

        this.gui.add(this.obj, 'intensity', 0, 10).onChange(() => {
            this.sunlight.intensity = this.obj.intensity
            this.ambientLight.intensity = this.obj.intensity
        })
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight('#ffffff', 3)
        this.sunlight.castShadow = true
        this.sunlight.shadow.camera.far = 20
        this.sunlight.shadow.mapSize.set(2048, 2048)
        this.sunlight.shadow.normalBias = 0.05
        this.sunlight.position.set(-1.5, 7, 3)
        this.scene.add(this.sunlight)

        this.ambientLight = new THREE.AmbientLight('#ffffff', 1)
        this.scene.add(this.ambientLight)
    }

    switchTheme(theme) {
        if (theme === 'dark') {
            GSAP.to(this.sunlight.color, {r: 0.09803921568627451, g: 0.11372549019607843, b: 0.3411764705882353}).duration(0.5)
            GSAP.to(this.ambientLight.color, {r: 0.09803921568627451, g: 0.11372549019607843, b: 0.3411764705882353}).duration(0.5)
            GSAP.to(this.sunlight.intensity, 0.8).duration(0.5)
            GSAP.to(this.ambientLight.intensity, 0.8).duration(0.5)
        } else {
            GSAP.to(this.sunlight.color, {
                r: 1,
                g: 1,
                b: 1,
            }).duration(0.5)
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            }).duration(0.5)
        }
    }

    resize() {
    }

    update() {
    }
}
