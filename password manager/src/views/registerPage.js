import { html } from "../lib.js";
import { registerUser } from "../api/data.js";


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
            <a href="/login">Sign in here</a>
        </footer>
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
        let rePass = formData.get("repass");

        try {
            validate();
            
            try {

                const response = await registerUser({ username, password });
                sessionStorage.setItem("authToken", response.sessionToken);
                sessionStorage.setItem("userId", response.objectId);
                context.pageContent.redirect("/main");

            } catch { alert("This username is already taken!"); }

        } catch (error) { alert(error.message); }

        function validate() {
            if (!username || !password || !rePass) throw new Error("All fields are required!");
            if (password != rePass) throw new Error("Both passwords must match!");
        }
    }
}