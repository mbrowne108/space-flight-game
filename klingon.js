const klingons = []
let lockId = 0

function createKlingons() {
    let x, y;
    for (let i = 0; i < 3; i++) {
        x = Math.random() * 2800 + 1000;
        y = Math.random() * 2800 + 1000;
        klingons.push(newKlingon(x, y));
    }
}

function newKlingon(x, y) {
    let klingon = {
        el: document.getElementById("klingon"),
        elThrust: document.getElementById("klingon-thrusting"),
        x: x,
        y: y,
        height: 30,
        width: 30,
        a: 180 * Math.PI,
        trailPosition: [],
        // torpedoes: [],
        thrusting: false,
        braking: false,
        // firing: false,
        attacking: true,
        locked: false,
        shields: 1020,
        hull: 255,
        thrust: {
            x: 0,
            y: 0
        }
    }
    return klingon;
}

function lockedOnView(klingon) {
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 10 / scale
    if (klingon.x + klingon.width / 2 + cameraOffset.x < 0 || 
        klingon.x + klingon.width / 2 + cameraOffset.x > canvas.width ||
        klingon.y + klingon.width / 2 + cameraOffset.y < 0 ||
        klingon.y + klingon.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.strokeStyle = "rgba(54, 54, 255, 0.1)";
        ctx.lineWidth = 5 / scale
        ctx.setLineDash([50, 50])
        ctx.lineDashOffset = 50 / scale
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        // ctx.lineCap = 'round';
        ctx.lineTo(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y);
        ctx.stroke()
    } else {
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 1 / scale
        ctx.beginPath();
        ctx.moveTo(klingon.x + cameraOffset.x - 10 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 10 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 10 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x - 10 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x + 10 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y + 10 - klingon.thrust.y);
        ctx.moveTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 10 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 30 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.lineTo(klingon.x + cameraOffset.x + 10 - klingon.thrust.x, klingon.y + cameraOffset.y - 30 - klingon.thrust.y);
        ctx.stroke()
    }
}

function klingonShields(klingon) {
    ctx.lineWidth = 2
    ctx.shadowColor = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.shadowBlur = 10
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.1, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.7)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.2, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.5)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.3, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.3)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.4, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.2)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.5, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.strokeStyle = `rgb(${255 - klingon.shields / 4}, ${klingon.shields / 4}, 0, 0.1)`;
    ctx.beginPath();
    ctx.arc(klingon.x + cameraOffset.x - klingon.thrust.x, klingon.y + cameraOffset.y - klingon.thrust.y, klingon.height / 1.6, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}

const klingonMotionTrailLength = 50
const klingonTrailPositions = []
function storeLastKlingonPosition(klingon) {
    klingon.trailPosition.push({
        x: klingon.x,
        y: klingon.y
    })
    if (klingon.trailPosition.length > klingonMotionTrailLength) {
        klingon.trailPosition.shift()
    }
}

function drawKlingonTrail(klingon) {
    for (let i = 0; i < klingon.trailPosition.length; i++) {
        let ratio = (i + 1) / klingon.trailPosition.length
        ctx.shadowColor = 'rgba(254,44,2)'
        ctx.shadowBlur = 10
        let radGrad = ctx.createRadialGradient(
            klingon.trailPosition[i].x + cameraOffset.x, 
            klingon.trailPosition[i].y + cameraOffset.y, 
            1 * ratio, 
            klingon.trailPosition[i].x + cameraOffset.x, 
            klingon.trailPosition[i].y + cameraOffset.y, 
            4 * ratio
        )
        radGrad.addColorStop(0, `rgba(254,44,2,${ratio / 2})`)
        radGrad.addColorStop(0.2, `rgba(254,44,2,${ratio / 2})`)
        radGrad.addColorStop(1, `rgba(254,44,2,0)`)
        ctx.fillStyle = radGrad;
        ctx.fillRect(klingon.trailPosition[i].x + cameraOffset.x - (klingon.width * 4/3) / 2, klingon.trailPosition[i].y + cameraOffset.y - klingon.height / 2, klingon.width * 4/3, klingon.height)
        ctx.shadowBlur = 0;
    }
}

function drawKlingons() {
    for (let i = 0; i < klingons.length; i++) {
        
        drawKlingonTrail(klingons[i])
        
        if (klingons[i].shields < 500) {
            klingons[i].attacking = false;
        } else {
            klingons[i].attacking = true;
        }

        ctx.save();
        if (klingons[i].attacking) {
            klingons[i].a = Math.atan2(-(ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), (ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) / FPS // Point towards ship
        } else {
            klingons[i].a = Math.atan2((ship.y + cameraOffset.y - (klingons[i].y + cameraOffset.y)), -(ship.x + cameraOffset.x - (klingons[i].x + cameraOffset.x))) + (Math.PI / 2) / FPS // Point away from ship
        }
        ctx.translate(klingons[i].x + cameraOffset.x, klingons[i].y + cameraOffset.y);
        ctx.rotate(-klingons[i].a + 90 * Math.PI / 180)
        ctx.translate(-(klingons[i].x + cameraOffset.x), -(klingons[i].y + cameraOffset.y));
        ctx.drawImage(klingons[i].thrusting ? klingons[i].elThrust : klingons[i].el, klingons[i].x - (klingons[i].width / 2) + cameraOffset.x, klingons[i].y - (klingons[i].height / 2) + cameraOffset.y, klingons[i].width, klingons[i].height)
        ctx.restore()

        if (klingons[i].attacking) {
            if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) >= 100) {
                klingons[i].thrusting = true
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 100 && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) >= 50){
                klingons[i].thrusting = false
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 50) {
                klingons[i].thrusting = false
                klingons[i].braking = true
            }
        } else {
            if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) < 500) {
                klingons[i].thrusting = true
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) > 500 && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) <= 800){
                klingons[i].thrusting = false
                klingons[i].braking = false
            } else if (distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) > 800) {
                klingons[i].thrusting = false
                klingons[i].braking = true
            }
        }

        // Move Klingon
        if (klingons[i].thrusting) {
            klingons[i].thrust.x += shipThrust * Math.cos(klingons[i].a) / FPS;
            klingons[i].thrust.y -= shipThrust * Math.sin(klingons[i].a) / FPS;
        } else {
            klingons[i].thrust.x -= friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= friction * klingons[i].thrust.y / FPS;
        }
        if (klingons[i].braking) {
            klingons[i].thrust.x -= 3 * friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= 3 * friction * klingons[i].thrust.y / FPS;
        }
        klingons[i].x += klingons[i].thrust.x
        klingons[i].y += klingons[i].thrust.y
        
        // Locked on
        if (klingons[i].locked && ship.scanning) {
            lockedOnView(klingons[i])
        }

        if (ship.firing && klingons[i].locked && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) <= 500) {
            klingons[i].shields > 0 ? klingonShields(klingons[i]) : klingons[i].shields === 0
        }
        storeLastKlingonPosition(klingons[i])
    }
}