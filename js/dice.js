
const sides = 20;
const initialSide = 1;
let    lastFace;
const    transitionDuration = 500;
const     animationDuration  = 2250;

function main() {
    let dice = document.getElementsByClassName("die");
    const timeouts = [];
    for (let i=0; i<dice.length; i++) {
        rollDice(dice[i], timeouts[i]);
    }
}

function randomFace() {
    let face = Math.floor((Math.random() * sides)) + initialSide
    lastFace = face == lastFace ? randomFace() : face
    return face;
}

function rollTo(die, face, timeoutId) {
    clearTimeout(timeoutId);
    die.setAttribute('data-face', face);
}

function reset(die) {
    die.setAttribute('data-face', null);
    die.classList.remove('rolling');
}

function rollDice(die, timeoutId) {
    die.classList.add("rolling");
    clearTimeout(timeoutId);

    let random = Math.floor((Math.random() * 8)) + 4;
    let duration = random * 250;

    timeoutId = setTimeout(function () {
        die.classList.remove('rolling');
        let randomVal = randomFace();
        rollTo(die, randomVal, timeoutId);
        console.log(randomVal);
    }, duration);

    return false;
}

