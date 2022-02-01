import AbstractView from './AbstractView.js'

export default class ContactForm extends AbstractView {
    constructor() {
        super('Contact Form')
    }

    render(el) {
        el.innerHTML = `
            <section>
                <form action="/contact" id="contact-form" method="post" enctype="multipart/form-data">
                    <input type="hidden" name="_csrf" value="">

                    <div class="input-container">
                        <label for="name-input"><h3>
                        Name
                        </h3></label>
                        <input type="text" id="name-input" name="name-input" />
                    </div>

                    <div class="input-container">
                        <label for="email-input"><h3>
                        Email
                        </h3></label>
                        <input type="email" id="email-input" name="email-input" />
                    </div>

                    <div class="input-container">
                        <label for="subject-input"><h3>
                        Subject
                        </h3></label>
                        <input type="text" id="subject-input" name="subject-input" />
                    </div>

                    <div class="input-container">
                        <label for="msg-input"><h3>
                        Message
                        </h3></label>
                        <textarea id="msg-input" name="msg-input"></textarea>
                    </div>

                    <button type="submit" value="submit" id="submit-input"><h3>Send</h3></button>
                </form>
            </section>
        `

        formSubmission()
    }
}
