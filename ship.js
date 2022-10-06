const maxPhaserCharge = 500
const shipThrust = 10
const friction = 0.7
const torpSpeed = 500;
const scanSpeed = 400;

const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    x: 2900,
    y: 2900,
    height: 50 * (4/3),
    width: 50,
    a: 90 / 180 * Math.PI,
    phaserCharge: maxPhaserCharge,
    torpLoaded: true,
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
    if (klingons[lockId].shields === 0) {
        ctx.lineTo(klingons[lockId].x + cameraOffset.x + Math.random() * 2, klingons[lockId].y + cameraOffset.y + Math.random() * 2);
    } else if (ship.x > klingons[lockId].x && ship.y > klingons[lockId].y) {
        ctx.lineTo(klingons[lockId].x + klingons[lockId].width / 2 + cameraOffset.x + Math.random() * 2, klingons[lockId].y + klingons[lockId].height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x > klingons[lockId].x && ship.y < klingons[lockId].y) {
        ctx.lineTo(klingons[lockId].x + klingons[lockId].width / 2 + cameraOffset.x + Math.random() * 2, klingons[lockId].y - klingons[lockId].height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x < klingons[lockId].x && ship.y < klingons[lockId].y) {
        ctx.lineTo(klingons[lockId].x - klingons[lockId].width / 2 + cameraOffset.x + Math.random() * 2, klingons[lockId].y - klingons[lockId].height / 2 + cameraOffset.y + Math.random() * 2);
    } else if (ship.x < klingons[lockId].x && ship.y > klingons[lockId].y) {
        ctx.lineTo(klingons[lockId].x - klingons[lockId].width / 2 + cameraOffset.x + Math.random() * 2, klingons[lockId].y + klingons[lockId].height / 2 + cameraOffset.y + Math.random() * 2);
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
    }

    // Torpedo hits
    let kx, ky, kr, tx, ty
    for(let i = klingons.length - 1; i >=0; i--) {
        kx = klingons[i].x + cameraOffset.x
        ky = klingons[i].y + cameraOffset.y
        kr = klingons[i].height / 1.1
        
        for (let j = ship.torpedoes.length - 1; j >= 0; j--) {
            tx = ship.torpedoes[j].x + cameraOffset.x
            ty = ship.torpedoes[j].y + cameraOffset.y

            if (distBetweenPoints(kx, ky, tx, ty) < kr) {
                ship.torpedoes.splice(j, 1)
                if (klingons[i].shields > 0) {
                    klingonShields(klingons[i])
                    klingons[i].shields -= 260
                } else if (klingons[i].shields <= 0 && klingons[i].hull > 0) {
                    kr = klingons[i].height / 1.1
                    klingons[i].hull -= 260
                } else if (klingons[i].hull <= 0) {
                    kr = klingons[i].height / 1.1
                    klingons.splice(i, 1)
                }
            }
        }
    }
}


function drawScans() {
    for (let i = 0; i < ship.scans.length; i++) {
        ctx.strokeStyle = `rgb(54, 54, 255, ${1 - (ship.scans[i].r * 0.001)})`; 
        ctx.lineWidth = 1
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

function shieldsUpAnim() {
    ctx.lineWidth = 2
    setTimeout(() => {
        ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.1)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 2, ship.height / 1.5, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 0)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.9, ship.height / 1.4, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 100)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.3)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.8, ship.height / 1.3, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 200)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.5)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.7, ship.height / 1.2, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 300)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.7)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.6, ship.height / 1.1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 400)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.5, ship.height / 1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 500)
    
    setTimeout(() => ship.shieldsUp = !ship.shieldsUp, 600)
}

function shipShields() {
    ctx.lineWidth = 2
    ctx.shadowColor = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.shadowBlur = 20
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.5, ship.height / 1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.7)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.6, ship.height / 1.1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.5)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.7, ship.height / 1.2, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.3)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.8, ship.height / 1.3, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.2)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.9, ship.height / 1.4, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.1)`;
    ctx.beginPath();
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 2, ship.height / 1.5, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}

function drawShip() {
    drawShipTrail();
    drawTorpedoes();
    drawScans();

    if (ship.firing) {
        if (klingons[lockId].locked && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500) {
            if (ship.phaserCharge > 0) {
                ship.phaserCharge -= 1
                drawPhasers();
                if (klingons[lockId].shields > 0) {
                    klingons[lockId].shields -= 1
                } else if (klingons[lockId].shields <= 0 && klingons[lockId].hull > 0) {
                    klingons[lockId].hull -= 1
                } else if (klingons[lockId].hull <= 0) {
                    klingons.splice(lockId, 1)
                    klingons[lockId].locked = !klingons[lockId].locked
                }
                
            } else {
                ship.firing = false
            }
        } else if (klingons[lockId].locked && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) > 500) {
            console.log('out of range')
        } else {
            console.log('not locked on')
        }
    } else {
        if (ship.phaserCharge < maxPhaserCharge) {ship.phaserCharge += 0.5}
    }

    // Rotate
    ctx.save();
    ship.a = Math.atan2(-(mouse.y - (ship.y + cameraOffset.y)), (mouse.x - (ship.x + cameraOffset.x))) + (Math.PI / 2) / FPS;
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.rotate(-ship.a + 90 * Math.PI / 180)
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));
    ctx.drawImage(ship.thrusting ? ship.elThrust : ship.el, ship.x - (ship.width / 2) + cameraOffset.x, ship.y - (ship.height / 1.7) + cameraOffset.y, ship.width, ship.height)
    ctx.restore();

    // Move ship
    if (ship.thrusting) {
        ship.thrust.x += shipThrust * Math.cos(ship.a) / FPS;
        ship.thrust.y -= shipThrust * Math.sin(ship.a) / FPS;
    } else {
        ship.thrust.x -= friction * ship.thrust.x / FPS;
        ship.thrust.y -= friction * ship.thrust.y / FPS;
    }

    if (ship.braking) {
        ship.thrust.x -= 3 * friction * ship.thrust.x / FPS;
        ship.thrust.y -= 3 * friction * ship.thrust.y / FPS;
    }
    ship.x += ship.thrust.x
    ship.y += ship.thrust.y

    ship.shieldsUp ? shipShields() : null
}
