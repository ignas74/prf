export default class AbstractView {
    constructor(title) {
        this.title = title
        this.setTitle(title)
    }

    setTitle(title) {
        document.title = title
    }

    render(el) {}
}
