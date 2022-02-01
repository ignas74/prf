import AbstractView from './AbstractView.js'

export default class Cv extends AbstractView {
    constructor() {
        super('Curriculum Vitae')
    }

    render(el) {
        el.innerHTML = `
            <canvas id="pdf-render"></canvas>
        `

        renderCV(document.querySelector('#pdf-render'))
    }
}
