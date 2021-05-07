import { html } from "../lib.js";

const homePageTemplate = () => html`
<section id="homePage">
    <h1 id="homeHeading" class="centered">Welcome to Tool Box</h1>
    <div id="homeBtns" class="centered">
        <div class="circleBtn firstHomeBtn"><a href="/calculator"><i class="fas fa-calculator"></i></a></div>
        <div class="circleBtn"><a href="/timer"><i class="fas fa-hourglass-half"></i></a></div>
        <div class="circleBtn"><a href="#"><i class="far fa-comment"></i></a></div>
    </div>
</section>`;

export function showHomePage(context) {
    context.renderContent(homePageTemplate());
}