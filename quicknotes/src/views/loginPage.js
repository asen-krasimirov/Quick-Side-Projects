import { html } from "../lib.js";
import { authenticate } from "../api/authenticate.js";


const loginPageTemplate = (onSubmit) => html`
<section id="loginPage container">
    <div class="note child">
        <div class="tools">
            <button class="addNote" disabled style="pointer-events: none;"><i class="fas fa-plus"></i></button>
            <button class="edit" disabled style="pointer-events: none;"><i class="fas fa-edit"></i></button>
            <button class="delete" disabled style="pointer-events: none;"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main container" disabled>
            <pre>
sign In here or click <a href="/register">here</a>
if you haven't registered yet.
            </pre>
            <form class="authentication" id="formContent" @submit=${onSubmit}>
                <input type="text" id="login" class="fadeIn second" name="username" placeholder="username">
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
                <button type="submit"><i class="fas fa-sign-in-alt"></i> login</button>
            </form>
        </div>
    </div>
</section>`;


export function showLoginPage(context) {
    context.renderContent(loginPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        let username = formData.get("username");
        let password = formData.get("password");

        try {
            
            validate();
            await authenticate({ username, password }, false);

        } catch (error) { alert(error.message); }

        function validate() {
            if (!username || !password) throw new Error("All fields are required!");
        }
    }
}