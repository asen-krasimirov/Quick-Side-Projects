import { html } from "../lib.js";
import { loginUser } from "../api/data.js";


const loginPageTemplate = (onSubmit) => html`
<section id="login" class="authenticate">
    <div class="main-container">
            <h1>Login</h1>
        <form @submit=${onSubmit}>
            <label>Username:&nbsp;<input class="smallBtn" type="text" name="username" /></label>
            <label>Password:&nbsp;&nbsp;<input class="smallBtn" type="password" name="password" /></label>
            <input id="submitBtn" class="smallBtn" type="submit" value="Log in" />
        </form>
        <footer>
            <p>Don't have an account?</p>
            <a href="/register">Sign up here</a>
        </footer>
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
            
            try {
                
                const response = await loginUser({ username, password });
                sessionStorage.setItem("authToken", response.sessionToken);
                sessionStorage.setItem("userId", response.objectId);
                context.pageContent.redirect("/main");

            } catch { alert("Check you username and password!"); }

        } catch (error) { alert(error.message); }

        function validate() {
            if (!username || !password) throw new Error("All fields are required!");
        }
    }
}