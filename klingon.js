
const klingon = {
    el: document.getElementById("klingon"),
    // elThrust: document.getElementById("ship-thrusting"),
    x: 2800,
    y: 2800,
    height: 30,
    width: 30,
    a: 180 * Math.PI,
    // torpedoes: [],
    thrusting: false,
    braking: false,
    // firing: false,
    locked: false,
    shields: 1020,
    thrust: {
        x: 0,
        y: 0
    }
}

function lockedOnView() {
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 1 / scale
    ctx.beginPath();
    ctx.moveTo(klingon.x + cameraOffset.x - 10, klingon.y + cameraOffset.y - 30);
    ctx.lineTo(klingon.x + cameraOffset.x - 30, klingon.y + cameraOffset.y - 30);
    ctx.lineTo(klingon.x + cameraOffset.x - 30, klingon.y + cameraOffset.y - 10);
    ctx.moveTo(klingon.x + cameraOffset.x - 30, klingon.y + cameraOffset.y + 10);
    ctx.lineTo(klingon.x + cameraOffset.x - 30, klingon.y + cameraOffset.y + 30);
    ctx.lineTo(klingon.x + cameraOffset.x - 10, klingon.y + cameraOffset.y + 30);
    ctx.moveTo(klingon.x + cameraOffset.x + 10, klingon.y + cameraOffset.y + 30);
    ctx.lineTo(klingon.x + cameraOffset.x + 30, klingon.y + cameraOffset.y + 30);
    ctx.lineTo(klingon.x + cameraOffset.x + 30, klingon.y + cameraOffset.y + 10);
    ctx.moveTo(klingon.x + cameraOffset.x + 30, klingon.y + cameraOffset.y - 10);
    ctx.lineTo(klingon.x + cameraOffset.x + 30, klingon.y + cameraOffset.y - 30);
    ctx.lineTo(klingon.x + cameraOffset.x + 10, klingon.y + cameraOffset.y - 30);
    ctx.stroke()
}

function klingonShields() {
    ctx.lineWidth = 1
    ctx.shadowColor = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.shadowBlur = 10
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.7)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3.2, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.5)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3.4, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.3)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3.5, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.2)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3.7, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y, ship.height / 3.9, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}