import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from 'gsap'
import {convertDivsToSpans} from "./Utils/common";

export default class Preloader extends EventEmitter {
    constructor() {
        super();

        this.expirience = new Experience()
        this.scene = this.expirience.scene
        this.world = this.expirience.world
        this.sizes = this.expirience.sizes
        this.camera = this.expirience.camera
        this.floor = this.expirience.world.floor
        this.device = this.sizes.device

        this.sizes.on('switchDevice', (device) => {
            this.device = device
        })

        this.world.on('worldReady', () => {
            this.setAssets();
            this.playIntro()
        })
    }

    setAssets() {
        convertDivsToSpans(document.querySelector('.intro-text'))
        convertDivsToSpans(document.querySelector('.hero-main-title'))
        convertDivsToSpans(document.querySelector('.hero-main-description'))
        convertDivsToSpans(document.querySelector('.hero-second-title'))
        convertDivsToSpans(document.querySelector('.hero-second-description'))
        this.room = this.expirience.world.room.roomScene
        this.roomChildren = this.expirience.world.room.roomChildren
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline()

            if (this.device === 'desktop') {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 3,
                }).to(this.room.position, {
                    x: -2,
                    ease: 'power1.out',
                    duration: 0.7,
                })
            }

            if (this.device === 'mobile') {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: 'back.out(2.5)',
                    duration: 3,
                }).to(this.room.position, {
                    z: -1,
                    ease: 'power1.out',
                    duration: 0.7,
                })
            }

            this.timeline.to('.intro-text .animatedChar', {
                yPercent: -100,
                stagger: 0.07,
                ease: 'back.out(1.2)',
                onComplete: resolve
            })
        })
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline()

            this.secondTimeline.to('.intro-text .animatedChar', {
                yPercent: 100,
                stagger: 0.05,
                ease: 'back.in(1.7)',
            })

            this.secondTimeline.to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: 'power1.out',
            }, 'same').to(this.roomChildren.cube.rotation, {
                y: 2 * Math.PI + Math.PI / 4
            }, 'same').to(this.roomChildren.cube.scale, {
                x: 8,
                y: 8,
                z: 8
            }, 'same').to(this.camera.orthographicCamera.position, {
                y: 3.5
            }, 'same').to(this.roomChildren.cube.position, {
                x: -0.019586,
                y: 1.52733,
                z: -0.203461,
            }, 'same').to(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 1
            }).to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0
            }).to(Object.values(this.roomChildren).filter(child => child.name !== 'Cube').map(child => child.scale), {
                x: 1,
                y: 1,
                z: 1,
                onComplete: resolve
            })

            // Text animation

            this.secondTimeline.to('.hero-main-title .animatedChar', {
                yPercent: -100,
                stagger: 0.05,
                ease: 'back.out(1.7)',
            }, 'text').to('.hero-main-description .animatedChar', {
                yPercent: -100,
                stagger: 0.05,
                ease: 'back.out(1.7)',
            }, 'text').to('.hero-second-title .animatedChar', {
                yPercent: -100,
                stagger: 0.05,
                ease: 'back.out(1.7)',
            }, 'text').to('.hero-second-description .animatedChar', {
                yPercent: -100,
                stagger: 0.05,
                ease: 'back.out(1.7)',
            }, 'text')
        })
    }

    onScroll(event) {
        if (event.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(event) {
        this.initialY = event.touches[0].clientY;
    }

    onTouchMove(event) {
        let currentY = event.touches[0].clientY;
        let diff = this.initialY - currentY;

        if (diff > 0) {
            this.removeEventListeners()
            this.playSecondIntro()
        }
    }

    removeEventListeners() {
        window.removeEventListener('wheel', this.scrollOnceEvent)
        window.removeEventListener('touchstart', this.toutchStart)
        window.removeEventListener('touchmove', this.toutchMove)
    }


    async playIntro() {
        await this.firstIntro()
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.toutchStart = this.onTouch.bind(this)
        this.toutchMove = this.onTouchMove.bind(this)
        window.addEventListener('wheel', this.scrollOnceEvent)
        window.addEventListener('touchstart', this.toutchStart)
        window.addEventListener('touchmove', this.toutchMove)
    }


    async playSecondIntro() {
        console.log('#1')
        await this.secondIntro()
        console.log('#2')
        this.emit('enableControls')
    };


    resize() {

    }
}
