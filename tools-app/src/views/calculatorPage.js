import { html } from "../lib.js";

const calculatorPageTemplate = () => html`
<section id="calculatorPage">
    <div id="calculator" class="centered">
        <div id="display">
            <p>Ans = 0.3333333333333333</p>
            <input id="input" type="text"  value="2 + 3" readonly>
        </div>
        <div id="buttonHolder">
            <div id="rowZero" class="centered row">
                <div class="defaultBtn bracketBtn funcBtn">(</div>
                <div class="defaultBtn bracketBtn funcBtn">)</div>
                <div class="defaultBtn funcBtn">AC</div>
            </div>
            <div id="rowOne" class="centered row">
                <div class="defaultBtn">7</div>
                <div class="defaultBtn">8</div>
                <div class="defaultBtn">9</div>
                <div class="defaultBtn funcBtn">/</div>
            </div>
            <div id="rowTwo" class="centered row">
                <div class="defaultBtn">4</div>
                <div class="defaultBtn">5</div>
                <div class="defaultBtn">6</div>
                <div class="defaultBtn funcBtn">x</div>
            </div>
                <div id="rowThree" class="centered row">
                <div class="defaultBtn">1</div>
                <div class="defaultBtn">2</div>
                <div class="defaultBtn">3</div>
                <div class="defaultBtn funcBtn">-</div>
            </div>
                <div id="rowFour" class="centered row">
                <div class="defaultBtn">0</div>
                <div class="defaultBtn">.</div>
                <div id="calculateBtn" class="defaultBtn">=</div>
                <div class="defaultBtn funcBtn">+</div>
            </div>
        </div>
    </div>
</section>`;

export function showCalculatorPage(context) {
    context.renderContent(calculatorPageTemplate());
}