import Experience from '../Experience'
import * as THREE from 'three'
import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'
import Floor from './Floor'

export default class World {
    constructor() {
        this.expirience = new Experience()
        this.scene = this.expirience.scene
        this.resourses = this.expirience.resources
        this.theme = this.expirience.theme

        this.resourses.on('ready', () => {
            this.environment = new Environment()
            this.room = new Room()
            this.controls = new Controls()
            this.floor = new Floor()
        })

        this.theme.on('switch', (theme) => {
            this.switchTheme(theme)
        })
    }

    switchTheme(theme) {
        if(this.environment) {
            this.environment.switchTheme(theme)
        }
    }

    resize() {}

    update() {
        if (this.room) {
            this.room.update()
        }
        if (this.controls) {
            this.controls.update()
        }
    }
}
