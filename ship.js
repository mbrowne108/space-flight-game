const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    x: 2900,
    y: 2900,
    height: 50 * (4/3),
    width: 50,
    a: 90 / 180 * Math.PI,
    torpedoes: [],
    scans: [],
    thrusting: false,
    braking: false,
    firing: false,
    scanning: false,
    thrust: {
        x: 0,
        y: 0
    }
}

const torpedo = {
    el: document.getElementById("torpedo"),
    height: ship.height / 2,
    width: ship.width / 2,
    shadow: 'rgb(248,58,37)'
}

function drawPhasers() {
    ctx.lineWidth = 1
    ctx.shadowColor = 'rgb(200, 0, 0)'
    ctx.shadowBlur = 10
    ctx.strokeStyle = 'rgb(235, 119, 52)'
    ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y)
    if (klingon.shields === 0) {
        ctx.lineTo(klingon.x + cameraOffset.x + Math.random() * 2, klingon.y + cameraOffset.y + Math.random() * 2);
    } else if (ship.x > klingon.x && ship.y > klingon.y) {
        ctx.lineTo(klingon.x + klingon.width / 2 + cameraOffset.x + Math.random() * 2, klingon.y + klingon.height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x > klingon.x && ship.y < klingon.y) {
        ctx.lineTo(klingon.x + klingon.width / 2 + cameraOffset.x + Math.random() * 2, klingon.y - klingon.height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x < klingon.x && ship.y < klingon.y) {
        ctx.lineTo(klingon.x - klingon.width / 2 + cameraOffset.x + Math.random() * 2, klingon.y - klingon.height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x < klingon.x && ship.y > klingon.y) {
        ctx.lineTo(klingon.x - klingon.width / 2 + cameraOffset.x + Math.random() * 2, klingon.y + klingon.height / 2 + cameraOffset.y + Math.random() * 2);
    }
    
    ctx.stroke();
    ctx.shadowBlur = 0
}

function drawTorpedoes() {
    for (var i = 0; i < ship.torpedoes.length; i++) {
        ctx.shadowColor = torpedo.shadow
        ctx.shadowBlur = torpedo.height * 3
        ctx.drawImage(torpedo.el, ship.torpedoes[i].x + cameraOffset.x - (torpedo.width / 2), ship.torpedoes[i].y + cameraOffset.y - (torpedo.height / 2), ship.width / 2, ship.height / 2)
        ctx.shadowBlur = 0
    }

    for (var i = 0; i < ship.torpedoes.length; i++) {
        ship.torpedoes[i].x += ship.torpedoes[i].xv + ship.thrust.x;
        ship.torpedoes[i].y += ship.torpedoes[i].yv + ship.thrust.y;

        if (ship.torpedoes[i].x < 0) {
            ship.torpedoes[i].xv = 0;
            ship.torpedoes[i].yv = 0;
        } 
        if (ship.torpedoes[i].y < 0) {
            ship.torpedoes[i].xv = 0;
            ship.torpedoes[i].yv = 0;
        } 
    }
}

function drawScans() {
    for (let i = 0; i < ship.scans.length; i++) {
        ctx.strokeStyle = "rgb(30, 90, 208)"; 
        ctx.lineWidth = 1 / scale
        ctx.beginPath();
        ctx.arc(ship.scans[i].x + cameraOffset.x - ship.width, ship.scans[i].y + cameraOffset.y - ship.height, ship.scans[i].r, Math.PI * 2, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ship.scans[i].x + cameraOffset.x - ship.width, ship.scans[i].y + cameraOffset.y - ship.height, 2 * ship.scans[i].r, Math.PI * 2, false);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(ship.scans[i].x + cameraOffset.x - ship.width, ship.scans[i].y + cameraOffset.y - ship.height, 3 * ship.scans[i].r, Math.PI * 2, false);
        ctx.stroke();
    }

    for (let i = 0; i < ship.scans.length; i++) {
        ship.scans[i].r += ship.scans[i].sv;
    }
}

const motionTrailLength = 50
const positions = []
function storeLastPosition(xPos, yPos) {
    positions.push({
        x: xPos,
        y: yPos
    })
    if (positions.length > motionTrailLength) {
        positions.shift()
    }
}
