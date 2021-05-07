import { render, page } from "./lib.js";
import { showCalculatorPage } from "./views/calculatorPage.js";

import { showHomePage } from "./views/homePage.js";
import { showTimerPage } from "./views/timerPage.js";

const main = document.getElementById("content");

/* Router Set-Up */
page.redirect("/", "/home");
page("*", decorateContext);

page("/home", showHomePage);
page("/calculator", showCalculatorPage);
page("/timer", showTimerPage);

page.start();

function decorateContext(context, next) {
    context.renderContent = content => render(content, main);
    context.pageContent = page.redirect;
    next();
}