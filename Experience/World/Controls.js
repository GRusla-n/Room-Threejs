import * as THREE from 'three'
import GSAP from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Experience from '../Experience'
import ASScroll from '@ashthornton/asscroll'

const isTouch = ('ontouchstart' in document.documentElement)

export default class Controls {
    static instance

    constructor() {
        if (Controls.instance) {
            return Controls.instance
        }
        Controls.instance = this

        this.expirience = new Experience()
        this.scene = this.expirience.scene
        this.room = this.expirience.world.room.roomScene
        this.sizes = this.expirience.sizes
        this.camera = this.expirience.camera
        this.floor = this.expirience.world.floor

        this.cicleOne = this.floor.circleOne
        this.cicleTwo = this.floor.circleTwo
        this.cicleThree = this.floor.circleThree

        GSAP.registerPlugin(ScrollTrigger)

        this.setSmoothScroll();
        this.setScrollTrigger()

        this.progress = 0
        this.position = new THREE.Vector3()

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.9,
        }

        this.onWheel()
    }

    setSmoothScroll() {
        const asscroll = new ASScroll({
            disableRaf: true,
            ease: 0.1,
        });

        this.asscroll = asscroll


        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });


        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                return arguments.length ? asscroll.currentPos = value : asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            }
        });


        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        // this.asscroll.enable()
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
                "(min-width: 969px)": () => {

                    this.room.scale.set(1, 1, 1)

                    this.firstMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: '.first-move',
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }
                    })

                    this.firstMoveTimeline.to(this.room.position, {
                            x: () => (this.sizes.width * 0.0017)
                        }
                    )

                    this.secondMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: '.second-move',
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }
                    })

                    this.secondMoveTimeline.to(this.room.position, {
                            x: () => 1,
                            z: () => (this.sizes.height * 0.0032)
                        }, 'same'
                    )
                    this.secondMoveTimeline.to(this.room.scale, {
                            x: 3,
                            y: 3,
                            z: 3
                        }, 'same'
                    )

                    this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: '.third-move',
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }
                    }).to(this.camera.orthographicCamera.position, {
                            y: -2,
                            x: -6,
                        }, 'same'
                    )
                },
                "(max-width: 968px)":
                    () => {

                        this.room.scale.set(0.7, 0.7, 0.7)

                        this.firstMoveTimeline = new GSAP.timeline({
                            scrollTrigger: {
                                trigger: '.first-move',
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            }
                        }).to(this.room.scale, {
                            x: 1,
                            y: 1,
                            z: 1
                        })

                        this.secondMoveTimeline = new GSAP.timeline({
                            scrollTrigger: {
                                trigger: '.second-move',
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            }
                        })

                        this.thirdMoveTimeline = new GSAP.timeline({
                            scrollTrigger: {
                                trigger: '.third-move',
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: 0.6,
                                invalidateOnRefresh: true,
                            }
                        })
                    },
                "all":
                    () => {
                        this.sections = document.querySelectorAll('.section');
                        this.sections.forEach(section => {
                            this.progressWrapper = section.querySelector('.progress-wrapper')
                            this.progressBar = section.querySelector('.progress-wrapper')

                            // Start circle animation ------------------------------------------------------------------

                            this.firstMoveTimeline = new GSAP.timeline({
                                scrollTrigger: {
                                    trigger: '.first-move',
                                    start: 'top top',
                                    end: 'bottom bottom',
                                    scrub: 0.6,
                                    invalidateOnRefresh: true,
                                }
                            }).to(this.cicleOne.scale, {
                                x: 3,
                                y: 3,
                                z: 3,
                            },)

                            this.secondMoveTimeline = new GSAP.timeline({
                                scrollTrigger: {
                                    trigger: '.second-move',
                                    start: 'top top',
                                    end: 'bottom bottom',
                                    scrub: 0.6,
                                    invalidateOnRefresh: true,
                                }
                            }).to(this.cicleTwo.scale, {
                                x: 3,
                                y: 3,
                                z: 3,
                            }, 'same').to(this.room.position, {
                                y: 0.7
                            }, 'same')

                            this.thirdMoveTimeline = new GSAP.timeline({
                                scrollTrigger: {
                                    trigger: '.third-move',
                                    start: 'top top',
                                    end: 'bottom bottom',
                                    scrub: 0.6,
                                    invalidateOnRefresh: true,
                                }
                            }).to(this.cicleThree.scale, {
                                x: 3,
                                y: 3,
                                z: 3,
                            })

                            // End circle animation ------------------------------------------------------------------

                            if (section.classList.contains('right')) {
                                GSAP.to(section, {
                                    borderTopLeftRadius: 10,
                                    scrollTrigger: {
                                        trigger: section,
                                        start: 'top bottom',
                                        end: 'top top',
                                        scrub: 0.6,
                                    }
                                })

                                GSAP.to(section, {
                                    borderBottomLeftRadius: 700,
                                    scrollTrigger: {
                                        trigger: section,
                                        start: 'bottom bottom',
                                        end: 'bottom top',
                                        scrub: 0.6,
                                    }
                                })
                            } else {
                                GSAP.to(section, {
                                    borderTopRightRadius: 10,
                                    scrollTrigger: {
                                        trigger: section,
                                        start: 'top bottom',
                                        end: 'top top',
                                        scrub: 0.6,
                                    }
                                })

                                GSAP.to(section, {
                                    borderBottomRightRadius: 700,
                                    scrollTrigger: {
                                        trigger: section,
                                        start: 'bottom bottom',
                                        end: 'bottom top',
                                        scrub: 0.6,
                                    }
                                })
                            }

                            GSAP.from(this.progressBar, {
                                scaleY: 0,
                                scrollTrigger: {
                                    trigger: section,
                                    start: 'top top',
                                    end: 'bottom bottom',
                                    scrub: 0.4,
                                    pin: this.progressWrapper,
                                    pinSpacing: false,
                                }
                            })
                        })

                    }

            }
        )
    }

    onWheel() {
        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                this.lerp.target += 0.01
                this.back = true
            } else {
                this.lerp.target -= 0.01
                this.back = false
            }
        })
    }

    resize() {
    }

    update() {
    }
}
