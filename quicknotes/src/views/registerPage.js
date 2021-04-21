import { html } from "../lib.js";
import { authenticate } from "../api/authenticate.js";


const registerPageTemplate = (onSubmit) => html`
<section id="registerPage container">
    <div class="note child">
        <div class="tools">
            <button class="addNote" disabled style="pointer-events: none;"><i class="fas fa-plus"></i></button>
            <button class="edit" disabled style="pointer-events: none;"><i class="fas fa-edit"></i></button>
            <button class="delete" disabled style="pointer-events: none;"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main container" disabled>
            <pre>
register here or go back to <a href="/login">login</a>
            </pre>
            <form class="authentication" id="formContent" @submit=${onSubmit}>
                <input type="text" id="login" class="fadeIn second" name="username" placeholder="username">
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
                <input type="password" id="rePass" class="fadeIn third" name="rePass" placeholder="repeat password">
                <button type="submit"><i class="fas fa-sign-in-alt"></i> register</button>
            </form>
        </div>
    </div>
</section>`;


export function showRegisterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        let username = formData.get("username");
        let password = formData.get("password");
        let rePass = formData.get("rePass");

        try {
            
            validate();
            await authenticate({ username, password }, true);

        } catch (error) { alert(error.message); }

        function validate() {
            if (!username || !password || !rePass) throw new Error("All fields are required!");
            if (password !== rePass) throw new Error("Both passwords must match!");
        }
    }
}