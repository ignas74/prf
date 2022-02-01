const express = require('express')
const path = require('path')
const app = express()
const csrf = require('csurf')
const router = express.Router()
const nodemailer = require('nodemailer')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT

// setup route middlewares
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

const viewPages = ['home', 'cv', 'contact']

app.use('/', router)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

router.get('/*', (request, response, next) => {
    if (viewPages.includes(request.url.substring(1))) {
        response.sendFile(path.join(__dirname, 'public', 'index.html'))
    } else {
        next()
    }
})

app.get('/c92', csrfProtection, (request, response) => {
    response.send({ csrfToken: request.csrfToken() })
})

app.post('/contact', parseForm, csrfProtection, (request, response) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })

    const mail = {
        from: request.body.email,
        to: process.env.EMAIL,
        subject: request.body.subject,
        text: `<<< Message from: ${request.body.name}, ${request.body.email} >>>\n${request.body.message}`,
    }

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            response.json({ statusCode: 400, message: 'fail' })
        } else {
            response.json({ statusCode: 200, message: 'ok' })
        }
    })
})

app.listen(PORT)

console.log(`Server is running on http://localhost:${PORT}`)
