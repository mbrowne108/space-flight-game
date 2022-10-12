const maxPhaserCharge = 500;
const maxShields = 2040;
const maxThrust = 30;
const shipThrust = 5;
const friction = 0.35;
const torpSpeed = 250;
const scanSpeed = 200;
let klingonsDestroyed = 0;

const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    trail: document.getElementById("ship-trail"),
    x: 2300,
    y: 2300,
    height: 75 * (4/3),
    width: 75,
    a: 90 / 180 * Math.PI,
    phaserCharge: maxPhaserCharge,
    torpLoaded: true,
    torpCount: 50,
    passengers: 0,
    torpedoes: [],
    scans: [],
    particles: [],
    thrusting: false,
    braking: false,
    firing: false,
    orbiting: false,
    redAlert: false,
    transporting: false,
    shields: maxShields,
    hull: 1020,
    scanning: false,
    exploding: false,
    thrust: {
        x: 0,
        y: 0
    },
    orbit: {
        speed: 0.00474,
        theta: Math.random() * 2 * Math.PI,
        radius: 1 * 6
    }
}

const torpedo = {
    el: document.getElementById("torpedo"),
    height: ship.height / 2,
    width: ship.width / 2,
    shadow: 'rgb(248,58,37)'
}

function explodeShip() {
    ship.exploding = !ship.exploding
    if (ship.exploding) {
        for (let j = 0; j < 500; j++) {
            ship.particles.push({
                x: ship.x + cameraOffset.x,
                y: ship.y + cameraOffset.y,
                dx: (Math.random() - 0.5) * (Math.random() * 6),
                dy: (Math.random() - 0.5) * (Math.random() * 6),
                r: Math.random() * 3,
                alpha: 1,
                random: Math.floor(Math.random() * 3),
                increment: 1
            })
        }
    }
    setTimeout(() => {
        dead = true;
    }, 3000)
}

function drawShipExplosion() {
    ship.particles.forEach((particle, i) => {
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
        
        particle.alpha -= 0.01
        particle.x += particle.dx
        particle.y += particle.dy
        particle.increment += 1.35

        if (particle.alpha <= 0) {
            ship.particles.splice(i, 1)
        }
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1;
    })
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
    ctx.stroke()
    ctx.shadowBlur = 0
}

function fireTorpedoes() {
    if (ship.torpLoaded) {
        ship.torpLoaded = false
        ship.torpCount -= 1
        if (ship.torpCount > 0) {
            ship.torpedoes.push({
                x: ship.x + 4/3 * ship.height / 1.7 * Math.cos(ship.a),
                y: ship.y - 4/3 * ship.height / 1.7 * Math.sin(ship.a),
                xv: torpSpeed * Math.cos(ship.a) / FPS,
                yv: -torpSpeed * Math.sin(ship.a) / FPS
            })
            setTimeout(() => ship.torpLoaded = true, 3000)
        } else {
            alert("NO TORPEDOES LEFT")
        }
    } else {
        alert("RELOADING TORPEDO")
    }
}


function drawTorpedoes() {
    for (let i = 0; i < ship.torpedoes.length; i++) {
        ctx.shadowColor = torpedo.shadow
        ctx.shadowBlur = torpedo.height * 3
        ctx.drawImage(torpedo.el, ship.torpedoes[i].x + cameraOffset.x - (torpedo.width / 2), ship.torpedoes[i].y + cameraOffset.y - (torpedo.height / 2), ship.width / 2, ship.height / 2)
        ctx.shadowBlur = 0

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
                    kr = klingons[i].height / 2
                    if (klingons[i].hull <= 260) {
                        klingonsDestroyed += 1
                        klingons[i].exploding = !klingons[i].exploding
                        klingons[i].locked = false
                        for (k = 0; k < 300; k++) {
                            klingons[i].particles.push({
                                x: klingons[i].x + cameraOffset.x,
                                y: klingons[i].y + cameraOffset.y,
                                dx: (Math.random() - 0.5) * (Math.random() * 6),
                                dy: (Math.random() - 0.5) * (Math.random() * 6),
                                r: Math.random() * 2,
                                alpha: 1,
                                random: Math.floor(Math.random() * 3),
                                increment: 1
                            })
                        }
                        setTimeout(() => {klingons.splice(i, 1)}, 3000)
                    } else {
                        klingons[i].hull -= 260
                    }
                } else if (klingons[i].hull <= 0) {
                    klingonsDestroyed += 1
                    klingons[i].exploding = !klingons[i].exploding
                    klingons[i].locked = false
                    for (k = 0; k < 300; k++) {
                        klingons[i].particles.push({
                            x: klingons[i].x + cameraOffset.x,
                            y: klingons[i].y + cameraOffset.y,
                            dx: (Math.random() - 0.5) * (Math.random() * 6),
                            dy: (Math.random() - 0.5) * (Math.random() * 6),
                            r: Math.random() * 2,
                            alpha: 1,
                            random: Math.floor(Math.random() * 3),
                            increment: 1
                        })
                    }
                    setTimeout(() => {klingons.splice(i, 1)}, 3000)
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

const shipTrailLength = 15
let shipTrailPositions = []
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
        let ratio = (i + 10) / shipTrailPositions.length
        ctx.drawImage(
            ship.trail, 
            shipTrailPositions[i].x + cameraOffset.x - (ship.width * 4/3) / 6, 
            shipTrailPositions[i].y + cameraOffset.y - ship.height / 6, 
            (ship.width * 4/3 / 4) * ratio, 
            (ship.height / 4) * ratio
        )
    }
}

function shieldsUpAnim() {
    ctx.lineWidth = 2
    setTimeout(() => {
        ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.1)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 2), (ship.height / 1.5), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 0)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 1.9), (ship.height / 1.4), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 100)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.3)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 1.8), (ship.height / 1.3), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 200)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.5)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 1.7), (ship.height / 1.2), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 300)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.7)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 1.6), (ship.height / 1.1), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 400)
    setTimeout(() => {
        ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
        ctx.beginPath();
        ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, (ship.height / 1.5), (ship.height / 1), -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
        ctx.stroke();
    }, 500)
    
    setTimeout(() => ship.redAlert = !ship.redAlert, 600)
}

function drawShipShields() {
    ctx.lineWidth = 2
    ctx.shadowColor = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.shadowBlur = 20
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 1)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.5, ship.height / 1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.7)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.6, ship.height / 1.1, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.5)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.7, ship.height / 1.2, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.3)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.8, ship.height / 1.3, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.2)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 1.9, ship.height / 1.4, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${255 - ship.shields / 4}, 0, ${ship.shields / 4}, 0.1)`;
    ctx.ellipse(ship.x + cameraOffset.x - ship.thrust.x, ship.y + cameraOffset.y - ship.thrust.y, ship.height / 2, ship.height / 1.5, -ship.a + 90 / 180 * Math.PI, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.shadowBlur = 0
}

function orbitPlanet(planet) {
    if (distBetweenPoints(ship.x, ship.y, planet.x + planet.width / 2, planet.y + planet.height / 2) < planet.width + 100) {
        ship.orbit.theta -= ship.orbit.speed
        ship.x = Math.cos(ship.orbit.theta) * (ship.orbit.radius + planet.width / 2) + planet.x + planet.width / 2
        ship.y = Math.sin(ship.orbit.theta) * (ship.orbit.radius + planet.height / 2) + planet.y + (planet.height * 4/3) / 2
    } else {
        ship.orbiting = !ship.orbiting
        alert(`TOO FAR TO ORBIT ${planet.name.toUpperCase()}`)
    }
}

function beamUpPassengers(planet) {
    if (ship.transporting && !ship.redAlert && ship.orbiting) {
        if (planet.name === "Earth") {
            alert('TRANSPORTING PASSENGERS TO EARTH...')
            if (ship.passengers > 0) {
                ship.passengers -= 1
                planet.passengers += 1
            } else {
                ship.transporting = !ship.transporting
                alert('ALL PASSENGERS SAFE ON EARTH')
            }
        }
        alert('TRANSPORTING PASSENGERS...')
        let rand = Math.floor(Math.random() * 5)
        if (rand === 1) {
            if (planet.passengers > 0) {
                planet.passengers -= 1
                ship.passengers += 1
            } else {
                ship.transporting = !ship.transporting
                alert('ALL PASSENGERS TRANSPORTED')
            }
        } else {
            null
        }
    } else if (ship.transporting && ship.redAlert && ship.orbiting) {
        alert('CAN\'T USE TRANSPORTER WHILE AT RED ALERT')
    } else if (ship.transporting && !ship.redAlert && !ship.orbiting) {
        alert('MUST BE IN ORBIT TO BEAM UP PASSENGERS')
    }
}

function findClosestTarget() {
    const distances = []
    klingons.map((klingon, i) => {
        let dist = distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y)
        distances.push({dist, i})
    })
    distances.sort((a, b) => {
        if (a.dist > b.dist) return 1;
        else if (a.dist < b.dist) return -1;
        else return 0;
    })
    lockId = distances[0].i
    klingons[distances[0].i].locked = true
}

function drawShip() {
    if (!ship.exploding) {
        if ((ship.thrust.x > 0.1 || ship.thrust.x < -0.1) || (ship.thrust.y > 0.1 || ship.thrust.y < -0.1)) {
            drawShipTrail()
        }    
        drawTorpedoes();
        drawScans();
    } else {
        drawShipExplosion();
    }
    
    if (ship.orbiting) {
        planets.map((planet) => {
            if (planet.locked) {
                orbitPlanet(planet)
            }
        })
    }

    if (ship.transporting) {
        planets.map((planet) => {
            if (planet.locked) {
                beamUpPassengers(planet)
            }
        })
    }

    if (ship.firing) {
        if (klingons[lockId].locked && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500) {
            if (ship.phaserCharge > 0) {
                ship.phaserCharge -= 1
                drawPhasers();
                if (klingons[lockId].shields > 0) {
                    klingons[lockId].shields -= 3
                } else if (klingons[lockId].shields <= 0 && klingons[lockId].hull > 0) {
                    klingons[lockId].hull -= 3
                } else if (klingons[lockId].hull <= 0) {
                    klingonsDestroyed += 1
                    klingons[lockId].exploding = !klingons[lockId].exploding
                    klingons[lockId].locked = false
                    for (i = 0; i < 300; i++) {  
                        klingons[lockId].particles.push({
                            x: klingons[lockId].x + cameraOffset.x,
                            y: klingons[lockId].y + cameraOffset.y,
                            dx: (Math.random() - 0.5) * (Math.random() * 6),
                            dy: (Math.random() - 0.5) * (Math.random() * 6),
                            r: Math.random() * 2,
                            alpha: 1,
                            random: Math.floor(Math.random() * 3),
                            increment: 1
                        })
                    }
                    setTimeout(() => {klingons.splice(lockId, 1)}, 3000)
                }
            } else {
                ship.firing = false
            }
        } else if (klingons[lockId].locked && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) > 500) {
            alert('NOT IN PHASER RANGE')
        }
    } else {
        if (ship.phaserCharge < maxPhaserCharge) {ship.phaserCharge += 0.5}
    }

    if (distBetweenPoints(ship.x, ship.y, sun.x, sun.y) < 150) {
        if (ship.shields <= 0 && !ship.exploding) {
            ship.hull = 0
            ship.shields = -100
            explodeShip()
        } else if (ship.shields > 0 && !ship.exploding) {
            ship.shields -= 1 / distBetweenPoints(ship.x, ship.y, sun.x, sun.y) * 1000
            shieldsUpAnim()
            alert("ALERT: SUN IS HOT")
        }
    }

    // Rotate
    ctx.save();
    ship.a = Math.atan2(-(mouse.y - (ship.y + cameraOffset.y)), (mouse.x - (ship.x + cameraOffset.x))) + (Math.PI / 2) / FPS;
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.rotate(-ship.a + 90 * Math.PI / 180)
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));
    !ship.exploding ? ctx.drawImage(ship.thrusting ? ship.elThrust : ship.el, ship.x - (ship.width / 2) + cameraOffset.x, ship.y - (ship.height / 1.7) + cameraOffset.y, ship.width, ship.height) : null
    ctx.restore();

    // Move ship
    if (ship.thrusting && ship.thrust.x <= maxThrust && ship.thrust.x >= -maxThrust && ship.thrust.y <= maxThrust && ship.thrust.y >= -maxThrust) {
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

    if (!ship.exploding) {
        ship.redAlert ? drawShipShields() : null
        if (ship.shields > 0 && ship.redAlert) {
            drawShipShields()
        } else {
            ship.redAlert = false
            ship.shields === 0
        }    
    }

    storeLastShipPosition(ship.x, ship.y)

    if (ship.redAlert) {
        if (ship.shields < maxShields) ship.shields += 1
    }
    
}
