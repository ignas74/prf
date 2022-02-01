'use strict'

function formSubmission() {
    try {
        const contactForm = document.getElementById('contact-form')

        const name = document.getElementById('name-input'),
            email = document.getElementById('email-input'),
            subject = document.getElementById('subject-input'),
            message = document.getElementById('msg-input')

        contactForm.addEventListener('submit', event => {
            event.preventDefault()

            let formData = {
                name: name.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
            }

            const responseMessage = document.createElement('div')
            contactForm.appendChild(responseMessage)
            responseMessage.innerHTML = 'Loading'

            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.statusCode === 200) {
                        responseMessage.id = 'response-ok'
                        responseMessage.innerHTML = 'data response === ok'
                    } else {
                        responseMessage.id = 'response-fail'
                        responseMessage.innerHTML = 'data response === fail'
                    }

                    setTimeout(() => {
                        contactForm.removeChild(responseMessage)
                    }, 3000)
                })
        })
    } catch (error) {
        const div = document.createElement('div')
        div.className = 'error'
        div.appendChild(document.createTextNode(error.message))
    }
}

////////////////////////////////////////////////////
//// XMLHttpRequest way to do

// let xhr = new XMLHttpRequest()
// xhr.open('POST', '/contact')
// xhr.setRequestHeader('Content-Type', 'application/json')

// xhr.onload = function() {
//     console.log(xhr.responseText)

//     if (xhr.responseText == 'success') {
//         alert('Email sent')
//         name.value = ''
//         email.value = ''
//         subject.value = ''
//         message.value = ''
//     } else {
//         alert('Error in xhr')
//     }
// }

// xhr.send(JSON.stringify(formData))
