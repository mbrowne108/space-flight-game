
const klingon = {
    el: document.getElementById("klingon"),
    elThrust: document.getElementById("klingon-thrusting"),
    x: 2800,
    y: 2800,
    height: 30,
    width: 30,
    a: 180 * Math.PI,
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

function lockedOnView() {
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 10 / scale
    if (klingon.x + klingon.width / 2 + cameraOffset.x < 0 || 
        klingon.x + klingon.width / 2 + cameraOffset.x > canvas.width ||
        klingon.y + klingon.width / 2 + cameraOffset.y < 0 ||
        klingon.y + klingon.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 5 / scale
        ctx.setLineDash([30, 100 / scale])
        ctx.lineDashOffset = 200 / scale
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        ctx.lineCap = 'round';
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

function klingonShields() {
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
function storeLastKlingonPosition(xPos, yPos) {
    klingonTrailPositions.push({
        x: xPos,
        y: yPos
    })
    if (klingonTrailPositions.length > klingonMotionTrailLength) {
        klingonTrailPositions.shift()
    }
}

function drawKlingonTrail() {
    for (let i = 0; i < klingonTrailPositions.length; i++) {
        let ratio = (i + 1) / klingonTrailPositions.length
        ctx.shadowColor = 'rgba(254,44,2)'
        ctx.shadowBlur = 10
        let radGrad = ctx.createRadialGradient(
            klingonTrailPositions[i].x + cameraOffset.x, 
            klingonTrailPositions[i].y + cameraOffset.y, 
            1 * ratio, 
            klingonTrailPositions[i].x + cameraOffset.x, 
            klingonTrailPositions[i].y + cameraOffset.y, 
            4 * ratio
        )
        radGrad.addColorStop(0, `rgba(254,44,2,${ratio / 2})`)
        radGrad.addColorStop(0.2, `rgba(254,44,2,${ratio / 2})`)
        radGrad.addColorStop(1, `rgba(254,44,2,0)`)
        ctx.fillStyle = radGrad;
        ctx.fillRect(klingonTrailPositions[i].x + cameraOffset.x - (klingon.width * 4/3) / 2, klingonTrailPositions[i].y + cameraOffset.y - klingon.height / 2, klingon.width * 4/3, klingon.height)
        ctx.shadowBlur = 0;
    }
}