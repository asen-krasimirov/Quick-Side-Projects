import { render, page } from "./lib.js";

import { showHomePage } from "./views/homePage.js";
import { showLoggedPage } from "./views/loggedPage.js";
import { showLoginPage } from "./views/loginPage.js";
import { showRegisterPage } from "./views/registerPage.js";


const main = document.querySelector("main");

/* Router Set-Up */
page.redirect("/", "/home");
page("*", decorateContext);

page("/home", showHomePage);
page("/login", showLoginPage);
page("/register", showRegisterPage);
page("/loggedIn", showLoggedPage);

page.start();


function decorateContext(context, next) {
    context.renderContent = (content) => render(content, main);
    context.pageContent = page;
    next();
}