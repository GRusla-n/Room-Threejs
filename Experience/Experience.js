import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Time from "./Utils/Time";
import World from "./World/World";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";
import Theme from "./World/Theme";
import Preloader from "./Preloader";
import Controls from "./World/Controls";

export default class Experience {
    static instance

    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.theme = new Theme()
        this.scene = new THREE.Scene()
        this.time = new Time()
        this.sizes = new Sizes()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.world = new World()
        this.preloader = new Preloader()

        this.preloader.on('enableControls', () => {
            this.controls = new Controls()
            this.controls.asscroll.enable()
        })

        this.time.on('update', this.update.bind(this))
        this.sizes.on('resize', this.resize.bind(this))
    }

    update() {
        this.camera.update();
        this.renderer.update()
        this.world.update()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

}
