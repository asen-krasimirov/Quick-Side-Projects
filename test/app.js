const ctx = new AudioContext(); 
const clickme = document.getElementById('clickme');
clickme.addEventListener('click',clickHandler);

function clickHandler(e) {
    playBeep();
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