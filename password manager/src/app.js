import { page, render } from "./lib.js";

import { showHomePage } from "./views/homePage.js";
import { showLoginPage } from "./views/loginPage.js";
import { showMainPage } from "./views/mainPage.js";
import { showRegisterPage } from "./views/registerPage.js";


const main = document.getElementById("contentContainer");


/* Router Set-Up */
page("*", decorateContext);

page.redirect("/", "/home");
page("/home", showHomePage);
page("/register", showRegisterPage);
page("/login", showLoginPage);
page("/main", showMainPage);

page.start();

function decorateContext(context, next) {
    context.renderContent = (content) => render(content, main);
    context.pageContent = page;
    next();
}