import Experience from '../Experience'
import * as THREE from 'three'
import Room from './Room'
import Environment from './Environment'
import Controls from './Controls'
import Floor from './Floor'
import EventEmitter from "events";

export default class World extends EventEmitter {
    constructor() {
        super();

        this.expirience = new Experience()
        this.scene = this.expirience.scene
        this.resourses = this.expirience.resources
        this.theme = this.expirience.theme

        this.resourses.on('ready', () => {
            this.environment = new Environment()
            this.floor = new Floor()
            this.room = new Room()
            this.controls = new Controls()

            this.emit('worldReady')
        })

        this.theme.on('switch', (theme) => {
            this.switchTheme(theme)
        })
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme)
        }
    }

    resize() {
    }

    update() {
        if (this.room) {
            this.room.update()
        }
        if (this.controls) {
            this.controls.update()
        }
    }
}
