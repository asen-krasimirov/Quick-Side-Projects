import { html } from "../lib.js";


const homePageTemplate = () => html`
<section id="homePage" class="show">
    <div class="main-container">
        <h1>Password Manager</h1>
        <p>Welcome to Password Manager!</p>
        <p>Here is the place to keep your passwords secure!</p>
        <a href="/register">Join Now!</a>
    </div>
</section>`;


export function showHomePage(context) {
    context.renderContent(homePageTemplate());
}