/*
function parse(str) {
    return Function(`'use strict'; return (${str})`)()
}
  
parse('4.12345 * 3.2344 - 9') // 4.336886679999999

console.log(parse('10 - (3 + 2)')) // logs 5
*/

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

function makeDeadline(hours=1, minutes=1, seconds=1) {
    const newDeadline = new Date(Date.parse(new Date()) + 1000 + (hours * 24 * 1000) + (minutes * 60 * 1000) + (seconds * 60  * 1000));  // + {days} * {hours} * {minutes} * {seconds}
    // const newDeadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    return newDeadline;
}

function initializeClock(endtime) {

    function updateClock() {
        const t = getTimeRemaining(endtime);

        let daysSpan = t.days;
        let hoursSpan = ('0' + t.hours).slice(-2);
        let minutesSpan = ('0' + t.minutes).slice(-2);
        let secondsSpan = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }

        console.log(`days left: ${daysSpan}, hours left: ${hoursSpan}, minutes left: ${minutesSpan}, seconds left: ${secondsSpan}`);
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

const deadline = makeDeadline();
initializeClock(deadline);