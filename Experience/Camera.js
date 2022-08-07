import Experience from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
    constructor() {
        this.expirience = new Experience()
        this.sizes = this.expirience.sizes
        this.scene = this.expirience.scene
        this.canvas = this.expirience.canvas

        this.createPerspectiveCamera()
        this.createOrthographicCamera()
        this.setOrbitControls()
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        )
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x = 18
        this.perspectiveCamera.position.y = 7
        this.perspectiveCamera.position.z = 14
    }

    createOrthographicCamera() {
        this.frustrum = 6
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.frustrum) / 2,
            (this.sizes.aspect * this.frustrum) / 2,
            this.frustrum / 2,
            -this.frustrum / 2,
            -60,
            60
        )

        this.orthographicCamera.position.y = 1.5
        this.orthographicCamera.position.z = 3
        this.orthographicCamera.rotation.x = -Math.PI / 6

        this.scene.add(this.orthographicCamera)

        const size = 10
        const divisions = 10

        this.helper = new THREE.CameraHelper(this.orthographicCamera)
        // this.scene.add(this.helper)

        const gridHelper = new THREE.GridHelper(size, divisions)
        // this.scene.add(gridHelper)

        const axesHelper = new THREE.AxesHelper(5)
        // this.scene.add(axesHelper)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
        this.controls.enableZoom = false
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        this.orthographicCamera.left = (-this.sizes.aspect * this.frustrum) / 2
        this.orthographicCamera.right = (this.sizes.aspect * this.frustrum) / 2
        this.orthographicCamera.top = this.frustrum / 2
        this.orthographicCamera.bottom = -this.frustrum / 2
        this.orthographicCamera.updateProjectionMatrix()
    }

    update() {
        // console.log(this.perspectiveCamera.position)
        this.controls.update()
        this.helper.matrixWorldNeedsUpdate = true
        this.helper.update()
        this.helper.position.copy(this.orthographicCamera.position)
        this.helper.rotation.copy(this.orthographicCamera.rotation)
    }
}
