const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    x: 2900,
    y: 2900,
    height: 50 * (4/3),
    width: 50,
    a: 90 / 180 * Math.PI,
    torpCount: 250,
    torpedoes: [],
    scans: [],
    thrusting: false,
    braking: false,
    firing: false,
    shieldsUp: false,
    shields: 2040,
    hull: 510,
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
    ctx.beginPath();
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
        ctx.strokeStyle = `rgb(30, 90, 208, ${1 - (ship.scans[i].r * 0.001)})`; 
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

const shipTrailLength = 50
const shipTrailPositions = []
function storeLastShipPosition(xPos, yPos) {
    shipTrailPositions.push({
        x: xPos,
        y: yPos
    })
    if (shipTrailPositions.length > shipTrailLength) {
        shipTrailPositions.shift()
    }
}

function drawShipTrail() {
    for (let i = 0; i < shipTrailPositions.length; i++) {
        let ratio = (i + 1) / shipTrailPositions.length
        ctx.shadowColor = 'rgba(101,150,240)'
        ctx.shadowBlur = 10
        let radGrad = ctx.createRadialGradient(
            shipTrailPositions[i].x + cameraOffset.x, 
            shipTrailPositions[i].y + cameraOffset.y, 
            0 * ratio, 
            shipTrailPositions[i].x + cameraOffset.x, 
            shipTrailPositions[i].y + cameraOffset.y, 
            10 * ratio
        )
        radGrad.addColorStop(0, `rgba(101,150,240,${ratio / 2})`)
        radGrad.addColorStop(0.2, `rgba(101,150,240,${ratio / 2})`)
        radGrad.addColorStop(1, `rgba(101,150,240,0)`)
        ctx.fillStyle = radGrad;
        ctx.fillRect(shipTrailPositions[i].x + cameraOffset.x - (ship.width * 4/3) / 2, shipTrailPositions[i].y + cameraOffset.y - ship.height / 2, ship.width * 4/3, ship.height)
        ctx.shadowBlur = 0;
    }
}

function shipShields() {
    ctx.lineWidth = 2
    ctx.shadowColor = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.shadowBlur = 20
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.5, ship.height / 1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.7)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.6, ship.height / 1.1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.5)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.7, ship.height / 1.2, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.3)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.8, ship.height / 1.3, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.2)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.9, ship.height / 1.4, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.1)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 2, ship.height / 1.5, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}
