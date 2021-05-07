import { html } from "../lib.js";

const timerPageTemplate = () => html`
<section id="timerPage">
    <div id="timer" class="centered">
        <div id="display">
            <input id="input" type="text" value="4:35" placeholder="00:00:00" readonly>
        </div>
        <div id="buttonHolder">
                <div id="rowOne" class="centered row">
                    <div id="calculateBtn" class="defaultBtn">Start</div>
                <div class="defaultBtn">Restart</div>
            </div>
        </div>
    </div>
</section>`;

export function showTimerPage(context) {
    context.renderContent(timerPageTemplate());
}