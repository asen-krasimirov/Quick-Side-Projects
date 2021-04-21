import { html } from "../lib.js";


const homePageTemplate = () => html`
<section id="homePage container">
    <div class="note child">
        <div class="tools">
            <button class="addNote" disabled style="pointer-events: none;"><i class="fas fa-plus"></i></button>
            <button class="edit" disabled style="pointer-events: none;"><i class="fas fa-edit"></i></button>
            <button class="delete" disabled style="pointer-events: none;"><i class="fas fa-trash-alt"></i></button>
        </div>
        <a href="/login" id="loginBtn" class="customBtn">sign in</a>
        <textarea class="main" disabled>

welcome to Quick Notes...

the place where you can quickly store your thoughts.

just sign in and you are set.
        </textarea>
    </div>
</section>`;


export function showHomePage(context) {
    context.renderContent(homePageTemplate());
}