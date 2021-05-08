import { html } from "../lib.js";

const timerPageTemplate = ({ onStart }) => html`
<section id="timerPage">
    <div id="timer" class="centered">
        <div id="display">
            <input id="input" type="text" value="" placeholder="enter in minutes...">
        </div>
        <div id="buttonHolder">
                <div id="rowOne" class="centered row">
                    <div id="calculateBtn" class="defaultBtn" @click=${onStart}>Start</div>
                <div class="defaultBtn">Restart</div>
            </div>
        </div>
    </div>
</section>`;

export function showTimerPage(context) {
    context.renderContent(timerPageTemplate({ onStart }));

    const display = document.getElementById("input");

    function onStart(event) {
        const time = display.value;
        console.log(time);
    }
}