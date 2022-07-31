import EventEmitter from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = 'light'
        this.toggleButton = document.querySelector('.toggle-button')
        this.toggleCircle = document.querySelector('.toggle-circle')

        this.setEventListeners()
    }

    setEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.toggleCircle.classList.toggle('slide')
            document.body.classList.toggle('dark-theme')
            document.body.classList.toggle('light-theme')
            this.theme = this.theme === 'light' ? 'dark' : 'light'

            this.emit('switch', this.theme)
        })
    }
}
