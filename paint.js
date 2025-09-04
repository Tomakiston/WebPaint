const ctx = canvas.getContext("2d");
const colorSelector = document.getElementById("colorOptions");
const btnColor = document.getElementById("btnColor");
const txtLine = document.getElementById("txtLine");

let colorSelect;
let hue;
let paintColor;
let drawLine;
let pX, pY;
let upX, upY;
let eventMouse;

start();
function start() {
    canvas.addEventListener("mousedown", newEventMouse);
    canvas.addEventListener("mouseleave", newEventMouse);
    canvas.addEventListener("mouseup", newEventMouse);
    canvas.addEventListener("mousemove", drawMouse);
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("touchmove", drawTouch);

    colorSelector.addEventListener("change", changePaintColor);
    colorSelect = colorSelector.value;

    hue = 0;
    drawLine = 4;
    txtLine.value = drawLine;
}

function newEventMouse(e) {
    eventMouse = e.type;
}

function touchStart(e) {
    pX = e.touches[0].clientX - (canvas.offsetLeft + canvas.clientLeft);
    pY = e.touches[0].clientY - (canvas.offsetTop + canvas.clientTop);
}

function drawMouse(e) {
    upX = pX;
    upY = pY;
    pX = e.offsetX;
    pY = e.offsetY;

    if(eventMouse === "mousedown") {
        paint();
    }
}

function drawTouch(e) {
    const offsetX = e.touches[0].clientX - (canvas.offsetLeft + canvas.clientLeft);
    const offsetY = e.touches[0].clientY - (canvas.offsetTop + canvas.clientTop);

    upX = pX;
    upY = pY;
    pX = offsetX;
    pY = offsetY;

    paint();
}

function paint() {
    drawLine = txtLine.value;

    ctx.beginPath();
    ctx.lineWidth = drawLine;
    ctx.strokeStyle = definePaintColor();
    ctx.moveTo(upX, upY);
    ctx.lineTo(pX, pY);
    ctx.stroke();
}

function changePaintColor() {
    colorSelect = colorSelector.value;

    if(colorSelect === "color") {
        btnColor.value = ctx.strokeStyle;
        btnColor.style.display = "inline-block";
    }
    else {
        btnColor.style.display = "none";
    }
}

function definePaintColor() {
    switch(colorSelect) {
        case "rainbow":
            paintColor = "hsl(" + hue + ", 100%, 50%)";
            hue++;
            if(hue >= 360) {
                hue = 0;
            }
            break;
        case "random":
            paintColor = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
            break;
        default:
            paintColor = btnColor.value;
    }
    return paintColor;
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}