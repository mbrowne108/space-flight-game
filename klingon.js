const klingons = []
let lockId = 0
const disrSpeed = 500
const klingonThrust = 8
const maxKlingonShields = 1020

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
        trail: document.getElementById("klingon-trail"),
        name: "Klingon",
        x: x,
        y: y,
        height: 30,
        width: 30,
        a: 180 * Math.PI,
        trailPositions: [],
        disruptors: [],
        particles: [],
        thrusting: false,
        braking: false,
        // firing: false,
        attacking: true,
        locked: false,
        shields: maxKlingonShields,
        hull: 255,
        exploding: false,
        thrust: {
            x: 0,
            y: 0
        }
    }
    return klingon;
}

const disruptor = {
    el: document.getElementById("disruptor"),
    height: ship.height,
    width: ship.width * 1.95,
    shadow: 'rgb(6, 152, 27)'
}

function lockedOnKlingonView(klingon) {
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.lineWidth = 10
    if (klingon.x + klingon.width / 2 + cameraOffset.x < 0 || 
        klingon.x + klingon.width / 2 + cameraOffset.x > canvas.width ||
        klingon.y + klingon.width / 2 + cameraOffset.y < 0 ||
        klingon.y + klingon.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.save()
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 5
        ctx.setLineDash([50, 50])
        ctx.lineDashOffset = 50
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        ctx.lineTo(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y);
        ctx.stroke()
        ctx.restore()
    } else {
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 1
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

function drawKlingonExplosion(klingon) {
    klingon.particles.forEach((particle, i) => {
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.shadowColor = 'rgb(200, 0, 0)'
        ctx.shadowBlur = 10
        if (particle.random === 0) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment * 158/100)}, ${particle.increment * 94/100}, ${particle.increment * 92/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        } 
        else if (particle.random === 1) {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment * 103/100)}, ${255 - (particle.increment * 101/100)}, ${particle.increment * 142/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${255 - (particle.increment)}, ${80 + (particle.increment * 78/100)}, ${particle.increment * 148/100})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
            ctx.fill();
        }
        ctx.restore();
        
        particle.alpha -= 0.01
        particle.x += particle.dx
        particle.y += particle.dy
        particle.increment += 1.35

        if (particle.alpha <= 0) {
            klingon.particles.splice(i, 1)
        }
    })
}

const klingonMotionTrailLength = 20
function storeLastKlingonPosition(klingon) {
    klingon.trailPositions.push({
        x: klingon.x,
        y: klingon.y
    })
    if (klingon.trailPositions.length > klingonMotionTrailLength) {
        klingon.trailPositions.shift()
    }
}

function drawKlingonTrail(klingon) {
    for (let i = 0; i < klingon.trailPositions.length; i++) {
        let ratio = (i + 1) / klingon.trailPositions.length
        ctx.drawImage(
            klingon.trail, 
            klingon.trailPositions[i].x + cameraOffset.x - klingon.width / 12, 
            klingon.trailPositions[i].y + cameraOffset.y - klingon.height / 12, 
            (klingon.width / 4) * ratio, 
            (klingon.height / 4) * ratio
        )
    }
}

function fireDisruptors(klingon) {
    let random = Math.floor(Math.random() * 10)
    if (distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y) < 500) {
        if (random === 1) {
            klingon.disruptors.push({
                x: klingon.x + 4/3 * klingon.height / 2 * Math.cos(klingon.a) + 12,
                y: klingon.y - 4/3 * klingon.height / 2 * Math.sin(klingon.a) + 12,
                xv: disrSpeed * Math.cos(klingon.a) / FPS,
                yv: -disrSpeed * Math.sin(klingon.a) / FPS
            })
        } else if (random === 2) {
            klingon.disruptors.push({
                x: klingon.x + 4/3 * klingon.height / 1.7 * Math.cos(klingon.a) - 12,
                y: klingon.y - 4/3 * klingon.height / 1.7 * Math.sin(klingon.a) - 12,
                xv: disrSpeed * Math.cos(klingon.a) / FPS,
                yv: -disrSpeed * Math.sin(klingon.a) / FPS
            })
        }
    }
}

function drawDisruptors(klingon) {
    for (let i = 0; i < klingon.disruptors.length; i++) {
        ctx.save();
        ctx.translate(klingon.disruptors[i].x + cameraOffset.x, klingon.disruptors[i].y + cameraOffset.y);
        ctx.rotate(-klingon.a - 90 * Math.PI / 180)
        ctx.translate(-(klingon.disruptors[i].x + cameraOffset.x), -(klingon.disruptors[i].y + cameraOffset.y));
        ctx.drawImage(disruptor.el, klingon.disruptors[i].x + cameraOffset.x - (disruptor.width / 2), klingon.disruptors[i].y + cameraOffset.y - (disruptor.height / 2), klingon.width / 1.95 / 4, klingon.height / 4)
        ctx.restore()
    }

    for (let i = 0; i < klingon.disruptors.length; i++) {
        klingon.disruptors[i].x += klingon.disruptors[i].xv + klingon.thrust.x;
        klingon.disruptors[i].y += klingon.disruptors[i].yv + klingon.thrust.y;
    }

    // Disruptor hits
    let sr = ship.height
    for (let i = klingon.disruptors.length - 1; i >= 0; i--) {
        tx = klingon.disruptors[i].x + cameraOffset.x
        ty = klingon.disruptors[i].y + cameraOffset.y

        ship.shields <= 0 ? sr = ship.height / 2 : ship.height
        if (distBetweenPoints(ship.x + cameraOffset.x, ship.y + cameraOffset.y, klingon.disruptors[i].x + cameraOffset.x, klingon.disruptors[i].y + cameraOffset.y) < sr) {
            klingon.disruptors.splice(i, 1)
            if (ship.shields > 0) {
                !ship.exploding ? drawShipShields() : null
                ship.shields -= 40
            } else if (ship.shields <= 0 && ship.hull > 0) {
                ship.hull -= 40
            } else if (ship.hull <= 0) {
                // Death here!
            }
        }
    }
}

function drawKlingons() {
    for (let i = 0; i < klingons.length; i++) {
        if (!klingons[i].exploding) {
            drawKlingonTrail(klingons[i])
            klingons[i].attacking ? fireDisruptors(klingons[i]) : null;
            drawDisruptors(klingons[i]);
        } else {
            drawKlingonExplosion(klingons[i])
        }

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
        !klingons[i].exploding ? ctx.drawImage(klingons[i].thrusting ? klingons[i].elThrust : klingons[i].el, klingons[i].x - (klingons[i].width / 2) + cameraOffset.x, klingons[i].y - (klingons[i].height / 2) + cameraOffset.y, klingons[i].width, klingons[i].height) : null
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
            klingons[i].thrust.x += klingonThrust * Math.cos(klingons[i].a) / FPS;
            klingons[i].thrust.y -= klingonThrust * Math.sin(klingons[i].a) / FPS;
        } else {
            klingons[i].thrust.x -= friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= friction * klingons[i].thrust.y / FPS;
        }
        if (klingons[i].braking) {
            klingons[i].thrust.x -= 3 * friction * klingons[i].thrust.x / FPS;
            klingons[i].thrust.y -= 3 * friction * klingons[i].thrust.y / FPS;
        }
        // klingons[i].x += klingons[i].thrust.x
        // klingons[i].y += klingons[i].thrust.y
        
        // Locked on
        if (klingons[i].locked && ship.scanning) {
            lockedOnKlingonView(klingons[i])
        }

        if (ship.firing && klingons[i].locked && distBetweenPoints(ship.x, ship.y, klingons[i].x, klingons[i].y) <= 500) {
            klingons[i].shields > 0 ? klingonShields(klingons[i]) : klingons[i].shields === 0
        }
        storeLastKlingonPosition(klingons[i])
    }
}