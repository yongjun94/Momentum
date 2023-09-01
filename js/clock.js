const clock = document.querySelector(".clock .clock_text");

function getClock(){
    const date = new Date();
    const hours =String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");

    clock.innerHTML = `${hours}:${minutes}`;

    return;
}

function init() {
    getClock();
    setInterval(getClock, 1000);
    return;
}

init();
