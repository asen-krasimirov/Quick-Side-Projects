import { html } from "../lib.js";

const timerPageTemplate = ({ onStart, onRestart }) => html`
<section id="timerPage">
    <div id="timer" class="centered">
        <div id="display">
            <input id="input" type="text" value="00:00:00" placeholder="00:00:00">
        </div>
        <div id="buttonHolder">
                <div id="rowOne" class="centered row">
                <div id="calculateBtn" class="defaultBtn" @click=${onStart}>Start</div>
                <div id="restartBtn" class="defaultBtn" @click=${onRestart}>Restart</div>
            </div>
        </div>
    </div>
</section>`;

export function showTimerPage(context) {
    context.renderContent(timerPageTemplate({ onStart, onRestart }));

    const ctx = new AudioContext(); 

    const display = document.getElementById("input");
    const startBtn = document.getElementById("calculateBtn");
    const restartBtn = document.getElementById("restartBtn");

    let lastTimeValue;
    let globalTimerInterval;

    function onStart() {
        const [hours, minutes, seconds] = display.value.split(":").map(Number);
        
        const deadline = makeDeadline(hours, minutes, seconds);
        lastTimeValue = formatTime(getTimeRemaining(deadline));

        initializeClock(deadline);
        changeBtnColors(true);
   }

    function onRestart() {
        clearInterval(globalTimerInterval);
        display.value = lastTimeValue;
        changeBtnColors(false);
    }

    function initializeClock(endtime) {
        const timeinterval = setInterval(updateClock, 1000);
        globalTimerInterval = timeinterval;

        function updateClock() {
            const t = getTimeRemaining(endtime);
            display.value = formatTime(t);
        }

        updateClock();
    }

    function changeBtnColors(isStarting=true) {
        startBtn.style["background-color"] = (isStarting) ?  "#353434" : "#456264";
        restartBtn.style["background-color"] = (isStarting) ? "#456264" : "#353434";
    }
    
    function formatTime(timeObj) {
    
        let hoursSpan = ('0' + timeObj.hours).slice(-2);
        let minutesSpan = ('0' + timeObj.minutes).slice(-2);
        let secondsSpan = ('0' + timeObj.seconds).slice(-2);
    
        if (timeObj.total <= 0) {
            clearInterval(globalTimerInterval);
            onRestart();
            
        }
    
        return `${hoursSpan}:${minutesSpan}:${secondsSpan}`;
    }

    function playBeep() {
        var o = ctx.createOscillator(), g = ctx.createGain(), playLength = 0.4;
        o.type = 'sine';
        o.frequency.value = 300;
        o.start(ctx.currentTime);
        o.stop(ctx.currentTime + playLength);
    
        g.gain.value = 0.5;
        g.gain.setValueAtTime(1,ctx.currentTime + playLength - 0.02);
        g.gain.linearRampToValueAtTime(0,ctx.currentTime + playLength);
        o.connect(g);
        g.connect(ctx.destination);
    }
}

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
}

function makeDeadline(hours=0, minutes=0, seconds=0) {
    hours *= 3600 * 1000;
    minutes *= 60 * 1000;
    seconds *= 1000;

    const newDeadline = new Date(Date.parse(new Date()) + 1 * hours + minutes + seconds);  // + {days} * {hours} * {minutes} * {seconds}
    return newDeadline;
}