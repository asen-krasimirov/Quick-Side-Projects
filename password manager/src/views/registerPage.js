import { html } from "../lib.js";


const registerPageTemplate = (onSubmit) => html`
<section id="register" class="authenticate">
    <div class="main-container">
            <h1>Register</h1>
        <form @submit=${onSubmit}>
            <label>Username:&nbsp;<input class="smallBtn" type="text" name="username" /></label>
            <label>Password:&nbsp;&nbsp;<input class="smallBtn" type="password" name="password" /></label>
            <label>Repeat:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="smallBtn" type="password" name="repass" /></label>
            <input id="submitBtn" class="smallBtn" type="submit" value="Create Account" />
        </form>
        <footer>
            <p>Already have an account?</p>
            <a href="#">Sign in here</a>
        </footer>
    </div>
</section>`;


export function showRegisterPage(context) {
    context.renderContent(registerPageTemplate(onSubmit));

    function onSubmit(event) {
        event.preventDefault();

        const form = document.querySelector("form");
        const formData = new FormData(form);

        let username = formData.get("username");
        let password = formData.get("password");
        let rePass = formData.get("repass");

        try {
            validate();

            console.log(username, password, rePass);

        } catch (error) { alert(error.message); }

        function validate() {
            if (!username || !password || !rePass) throw new Error("All fields are required!");
            if (password != rePass) throw new Error("Both passwords must match!");
        }

    }
}