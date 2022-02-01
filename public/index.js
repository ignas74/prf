import Dashboard from '/views/Dashboard.js'
import Cv from '/views/Cv.js'
import ContactForm from '/views/ContactForm.js'

document.querySelectorAll('#nav > a').forEach(element => {
    element.addEventListener('click', event => {
        event.preventDefault()
        const path = event.target.getAttribute('href')
        const view = renderView(path)
        history.pushState(null, view.title, path)
    })
})

const routes = new Map([
    ['/home', Dashboard],
    ['/cv', Cv],
    ['/contact', ContactForm],
])

function renderView(path) {
    const route = routes.get(path)
    const view = new route()
    view.render(document.querySelector('#app'))
    return view
}

window.addEventListener('popstate', event => {
    renderView(event.target.location.pathname)
})

const path = window.location.pathname
renderView(path === '/' ? '/home' : path)

/*
    i can see above code as:

    let view;
    if(path == '/home') view = new Dashboard();
    if(path == '/cv') view = new Cv();
    if(path == '/contact') view = new ContactForm();

    routes.get(path) is returning the class
    then 'new' is called to instantiate it(the returned value, aka. the class)

    const view = new (routes.get(path))()
*/
