const express = require('express')
const path = require('path')
const router = express.Router()
require('dotenv').config()

const PORT = process.env.PORT
const app = express()

const viewPages = ['home', 'cv', 'contact']

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

router.get('/*', (request, response, next) => {
    if (viewPages.includes(request.url.substring(1))) {
        response.sendFile(path.join(__dirname, 'public', 'index.html'))
    } else {
        next()
    }
})

app.listen(PORT)

console.log(`Server is running on http://localhost:${PORT}`)
