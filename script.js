const FPS = 60
const mouse = {x: 0, y: 0}
let scale = 1
const orbitColor = 'rgb(100,100,100)';
const shipThrust = 5
const friction = 0.7
const torpMax = 300;
const torpSpeed = 500;
const scanMax = 30;
const scanSpeed = 700;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

asteroids = [];
createAsteroids();

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
window.addEventListener("mousedown", (e) => {
    ship.firing = true;
});

window.addEventListener('mouseup', (e) => {
    ship.firing = false;
})

canvas.addEventListener('wheel', (e) => {
    if (e.wheelDelta >= 0 ) {
        scale += 0.1 * scale
    } else {
        if (scale > 0.1) {
            scale -= 0.1 * scale
        }
    }
})

function keyDown(e) {
    switch(e.keyCode) {
        case 87: // W
            ship.thrusting = true;
            break;
        case 83: // S
            ship.braking = true;
            break;
        case 70: // F (Scan)
            ship.scanning = true
            // setTimeout(() => {ship.scanning = false}, 5000)
            if (ship.scans.length < scanMax) {
                ship.scans.push({
                    x: ship.x + ship.width,
                    y: ship.y + ship.height,
                    r: 50,
                    sv: scanSpeed / FPS
                })
            }
            break;
        case 32: // Spacebar (Torpedo)
            if (ship.torpedoes.length < torpMax) {
                ship.torpedoes.push({
                    x: ship.x + 4/3 * ship.height / 1.7 * Math.cos(ship.a),
                    y: ship.y - 4/3 * ship.height / 1.7 * Math.sin(ship.a),
                    xv: torpSpeed * Math.cos(ship.a) / FPS,
                    yv: -torpSpeed * Math.sin(ship.a) / FPS
                })
            }
            break;
    }
}

function keyUp(e) {
    switch(e.keyCode) {
        case 87: // W
            ship.thrusting = false;
            break;
        case 83: // S
            ship.braking = false;
            break;
    }
}

// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

// Position stars
const stars = []
for (let i = 0; i < 4000; i++) {
    let star = {
        x: Math.random() * 7680,
        y: Math.random() * 4320,
        size: Math.random() + 1
    }
    stars.push(star)
}

function drawStars() {
    stars.map((star) => {
        ctx.fillStyle = `rgb(${(Math.random() * 10)+ 245}, ${(Math.random() * 10)+ 245}, ${(Math.random() * 10) + 200})`
        ctx.beginPath()
        ctx.fillRect(star.x, star.y, star.size, star.size)
        ctx.stroke()
    })
}

function drawSun() {
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.scale(scale, scale);
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));

    ctx.shadowColor = sun.shadow
    ctx.shadowBlur = sun.height
    ctx.drawImage(sun.el, sun.x - (sun.width / 2) + cameraOffset.x, sun.y - (sun.height / 2) + cameraOffset.y, sun.width, sun.height)
    ctx.shadowBlur = 0
}

function drawPlanet(planet) {
    // Draw orbit
    ctx.strokeStyle = orbitColor
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(sun.x + cameraOffset.x, sun.y + cameraOffset.y, planet.radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Planet movement
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - planet.width / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - planet.height / 2
    ctx.shadowColor = planet.shadow
    ctx.shadowBlur = planet.height * 3
    ctx.drawImage(planet.el, planet.x + cameraOffset.x, planet.y + cameraOffset.y, planet.width, planet.height)
    ctx.shadowBlur = 0

    // Moon orbit and movement
    if (planet.hasMoon) {
        ctx.strokeStyle = orbitColor
        ctx.beginPath()
        ctx.arc(planet.x + (planet.width / 2) + cameraOffset.x, planet.y + (planet.height / 2) + cameraOffset.y, moon.radius, 0, 2 * Math.PI)
        ctx.stroke()

        moon.theta -= moon.speed
        moon.x = Math.cos(moon.theta) * moon.radius + planet.x + moon.width
        moon.y = Math.sin(moon.theta) * moon.radius + planet.y + moon.height
        ctx.drawImage(moon.el, moon.x + cameraOffset.x + moon.width / 3, moon.y + cameraOffset.y + moon.height / 3, moon.width, moon.height)
    }

    // Hover over planet
    if ((mouse.x > planet.x + cameraOffset.x && mouse.x < planet.x + planet.width + cameraOffset.x) && (mouse.y > planet.y + cameraOffset.y && mouse.y < planet.y + planet.height + cameraOffset.y)) {
        ctx.fillStyle = "white";
        ctx.font = "15px serif";
        ctx.fillText(planet.name, planet.x + cameraOffset.x, planet.y + cameraOffset.y)
    }
}

function drawShip() {
    if (ship.firing) {
        ctx.lineWidth = 1
        ctx.shadowColor = 'rgb(200, 0, 0)'
        ctx.shadowBlur = 10
        ctx.strokeStyle = 'rgb(235, 119, 52)'
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
        ctx.shadowBlur = 0
    }

    // Rotate
    ctx.save();
    ship.a = Math.atan2(-(mouse.y - (ship.y + cameraOffset.y)), (mouse.x - (ship.x + cameraOffset.x))) + (Math.PI / 2) / FPS;
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.rotate(-ship.a + 90 * Math.PI / 180)
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));
    ctx.drawImage(ship.thrusting ? ship.elThrust : ship.el, ship.x - (ship.width / 2) + cameraOffset.x, ship.y - (ship.height / 1.7) + cameraOffset.y, ship.width, ship.height)
    ctx.restore()

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
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
}

function drawKlingon() {
    if (ship.a > 0 && ship.a > klingon.a) {
        klingon.a += 0.01
    } else if (ship.a > 0 && ship.a < klingon.a) {
        klingon.a -= 0.01
    } else if (ship.a < 0 && ship.a > klingon.a) {
        klingon.a += 0.01
    } else if (ship.a < 0 && ship.a < klingon.a) {
        klingon.a -= 0.01
    }

    ctx.save();
    ctx.translate(klingon.x + cameraOffset.x, klingon.y + cameraOffset.y);
    ctx.rotate(-klingon.a + 90 * Math.PI / 180)
    ctx.translate(-(klingon.x + cameraOffset.x), -(klingon.y + cameraOffset.y));
    ctx.drawImage(klingon.el, klingon.x - (klingon.width / 2) + cameraOffset.x, klingon.y - (klingon.height / 2) + cameraOffset.y, klingon.width, klingon.height)
    ctx.restore()

    setInterval(() => {
        if (Math.floor(Math.random() * 10) < 5) {
            klingon.thrusting = true
            klingon.braking = false
        } else if (Math.floor(Math.random() * 10) > 5 && Math.floor(Math.random() * 10) < 10){
            klingon.thrusting = false
            klingon.braking = false
        } else if (Math.floor(Math.random() * 10) === 10) {
            klingon.thrusting = false
            klingon.braking = true
        }
    }, 3000)

    if (klingon.thrusting) {
        klingon.thrust.x += shipThrust * Math.cos(klingon.a) / FPS;
        klingon.thrust.y -= shipThrust * Math.sin(klingon.a) / FPS;
    } else {
        klingon.thrust.x -= friction * klingon.thrust.x / FPS;
        klingon.thrust.y -= friction * klingon.thrust.y / FPS;
    }
    if (klingon.braking) {
        klingon.thrust.x -= 3 * friction * klingon.thrust.x / FPS;
        klingon.thrust.y -= 3 * friction * klingon.thrust.y / FPS;
    }
    klingon.x += klingon.thrust.x;
    klingon.y += klingon.thrust.y;

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

function drawMotionTrail() {
    for (let i = 0; i < positions.length; i++) {
        let ratio = (i + 1) / positions.length
        ctx.beginPath();
        ctx.shadowColor = 'rgba(101,150,240)'
        ctx.shadowBlur = 10
        ctx.arc(positions[i].x + cameraOffset.x, positions[i].y + cameraOffset.y, (ship.height / 10) * ratio, 0, 2 * Math.PI, true);
        ctx.fillStyle = `rgba(101,150,240,${ratio / 2})`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function createAsteroids() {
    let x, y;
    for (let i = 0; i < asteroidBelt.num; i++) {
        let theta = Math.random() * Math.PI * 2
        do {
            x = Math.cos(theta) * asteroidBelt.radius * 2;
            y = Math.sin(theta) * asteroidBelt.radius * 2;
        } while (distBetweenPoints(ship.x, ship.y, x, y) < asteroidBelt.size * 2 + ship.height / 2);
        asteroids.push(newAsteroid(x, y, theta));
    }
}

function newAsteroid(x, y, theta) {
    let asteroid = {
        x: x,
        y: y,
        size: Math.random() * asteroidBelt.size,
        theta: theta,
        a: Math.random() * 360 * Math.PI / 180,
        radius: asteroidBelt.radius + Math.random() * 50,
        speed: asteroidBelt.speed * Math.random(),
        img: document.getElementById(`asteroid${Math.floor(Math.random() * 10) + 1}`),
    }

    return asteroid;
}

function drawAsteroids() {
    let x, y;
    for (let i = 0; i < asteroids.length; i++) {
        x = asteroids[i].x + cameraOffset.x;
        y = asteroids[i].y + cameraOffset.y;
        
        asteroids[i].a > 3 ? asteroids[i].a = asteroids[i].a + Math.random() * 0.01 : asteroids[i].a = asteroids[i].a + Math.random() * -0.01;

        ctx.save();
        ctx.translate(x + cameraOffset.x, y + cameraOffset.y);
        ctx.rotate(asteroids[i].a)
        ctx.translate(-(x + cameraOffset.x), -(y + cameraOffset.y));
        ctx.drawImage(asteroids[i].img, x + cameraOffset.x, y + cameraOffset.y, asteroids[i].size, asteroids[i].size)
        ctx.restore()

        // Move asteroids
        Math.random > 0.5 ? asteroids[i].theta -= asteroids[i].speed : asteroids[i].theta += asteroids[i].speed
        asteroids[i].x = Math.cos(asteroids[i].theta) * asteroids[i].radius + sun.x - asteroidBelt.size / 2 - cameraOffset.x;
        asteroids[i].y = Math.sin(asteroids[i].theta) * asteroids[i].radius + sun.y - asteroidBelt.size / 2 - cameraOffset.y;

    }
}

function drawOverlay() {
    ctx.fillStyle = "red";
    ctx.font = "15px serif";
    ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
    ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
    ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
    ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, 5, 60);
    ctx.fillText(`Canvas: ${Math.round(canvas.width)}, ${Math.round(canvas.width)}`, 5, 75);
    ctx.fillText(`Sun: ${sun.x}, ${sun.y}`, 5, 90);
    ctx.fillText(`Ship Angle: ${ship.a}, Klingon Angle: ${klingon.a}`, 5, 105);
}

// Game Loop
function loop() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    camera.x = ship.x - (canvas.width / 2)
    camera.y = ship.y - (canvas.height / 2)
    cameraOffset.x = canvas.width / 2 - ship.x
    cameraOffset.y = canvas.height / 2 - ship.y

    ship.scanning ? drawOverlay() : null;
    drawMotionTrail();
    drawShip();
    drawTorpedoes();
    drawScans();
    drawStars();
    drawSun();
    planets.forEach(drawPlanet);
    drawAsteroids();
    drawKlingon();
    
    storeLastPosition(ship.x, ship.y)

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / FPS)
    
}

requestAnimationFrame(loop);