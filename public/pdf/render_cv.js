'use strict'

const url = '/pdf/sample.pdf'
const loadingTask = pdfjsLib.getDocument(url)

async function renderCV(canvas) {
    try {
        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)

        let scale = 1.5
        let viewport = page.getViewport({ scale: scale })
        // Support HiDPI-screens.
        let outputScale = window.devicePixelRatio || 1

        let context = canvas.getContext('2d')

        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = Math.floor(viewport.width) + 'px'
        canvas.style.height = Math.floor(viewport.height) + 'px'

        let transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null

        let renderContext = {
            canvasContext: context,
            transform: transform,
            viewport: viewport,
        }

        page.render(renderContext)
    } catch (error) {
        const div = document.createElement('div')
        div.className = 'error'
        div.appendChild(document.createTextNode(error.message))
    }
}
