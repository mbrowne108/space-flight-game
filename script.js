const FPS = 60
const mouse = {x: 0, y: 0}
let scale = 1
const orbitColor = 'rgb(100,100,100)';
const shipThrust = 2
const friction = 0.7
const torpMax = 300;
const torpSpeed = 500;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const space = new Image();
space.src = "images/space.png";
ctx.imageSmoothingEnabled = false;

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
// document.addEventListener("click", (e) => {
//     if (ship.torpedoes.length < torpMax) {
//         ship.torpedoes.push({
//             x: ship.x + 4/3 * ship.height / 1.7 * Math.cos(ship.a),
//             y: ship.y - 4/3 * ship.height / 1.7 * Math.sin(ship.a),
//             xv: torpSpeed * Math.cos(ship.a) / FPS,
//             yv: -torpSpeed * Math.sin(ship.a) / FPS
//         })
//     }
// });
window.addEventListener("mousedown", (e) => {
    ship.firing = true;
});

window.addEventListener('mouseup', (e) => {
    ship.firing = false
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
        case 32: // Spacebar
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

const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    x: 2900,
    y: 2900,
    height: 30 * (4/3),
    width: 30,
    a: 90 / 180 * Math.PI,
    torpedoes: [],
    thrusting: false,
    braking: false,
    firing: false,
    thrust: {
        x: 0,
        y: 0
    }
}

const torpedo = {
    el: document.getElementById("torpedo"),
    height: ship.height / 2,
    width: ship.width / 2
}

const sun = {
    el: document.getElementById("sun"),
    name: "Sun",
    height: 100,
    width: 100 * (4/3),
    x: 3000,
    y: 3000,
    shadow: "rgb(255, 193, 6)"
}

const mercury = {
    el: document.getElementById("mercury"),
    name: 'Mercury',
    height: 3.8,
    width: 3.8 * (4/3),
    speed: 0.004787,
    theta: Math.random() * 2 * Math.PI,
    radius: 35 * 2,
    shadow: "rgb(225, 177, 101)"
}

const venus = {
    el: document.getElementById("venus"),
    name: 'Venus',
    speed: -(0.003502),
    height: 9.5,
    width: 9.5 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 67 * 2,
    shadow: "rgb(203, 173, 115)"
}

const earth = {
    el: document.getElementById("earth"),
    name: 'Earth',
    speed: 0.002978,
    height: 10,
    width: 10 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 93 * 2,
    shadow: "rgb(113, 115, 174)",
    hasMoon: true
}

const mars = {
    el: document.getElementById("mars"),
    name: 'Mars',
    speed: 0.0024077,
    height: 5.3,
    width: 5.3 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 142 * 2,
    shadow: "rgb(203, 84, 14)"
}

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 112,
    width: 112 * (4/3),
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 484 * 2,
    shadow: "rgb(194, 142, 123)"
}

const saturn = {
    el: document.getElementById("saturn"),
    name: 'Saturn',
    height: 94.5,
    width: 94.5 * (4/3),
    speed: 0.000969,
    theta: Math.random() * 2 * Math.PI,
    radius: 889 * 2,
    shadow: "rgb(251, 204, 132)"
}

const uranus = {
    el: document.getElementById("uranus"),
    name: 'Uranus',
    height: 40,
    width: 40 * (4/3),
    speed: -(0.000681),
    theta: Math.random() * 2 * Math.PI,
    radius: 1790 * 2,
    shadow: "rgb(207, 245, 247)"
}

const neptune = {
    el: document.getElementById("neptune"),
    name: 'Neptune',
    height: 38.8,
    width: 38.8 * (4/3),
    speed: 0.000543,
    theta: Math.random() * 2 * Math.PI,
    radius: 2880 * 2,
    shadow: "rgb(72, 129, 255)"
}

const pluto = {
    el: document.getElementById("pluto"),
    name: 'Pluto',
    height: 2,
    width: 2 * (4/3),
    speed: 0.000474,
    theta: Math.random() * 2 * Math.PI,
    radius: 3670 * 2,
    shadow: "rgb(231, 175, 128)"
}

const moon = {
    el: document.getElementById("moon"),
    name: 'Moon',
    height: 2.7,
    width: 2.7 * (4/3),
    speed: 0.002978 * 12,
    theta: Math.random() * 2 * Math.PI,
    radius: 10 * 2,
    shadow: "rgb(245, 236, 237)"
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

// Position stars
const stars = []
for (i = 0; i < 4000; i++) {
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
    ctx.shadowBlur = sun.height * scale
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
        ctx.drawImage(moon.el, moon.x + cameraOffset.x, moon.y + cameraOffset.y, moon.width, moon.height)
    }

    // Hover over planet
    if ((mouse.x > planet.x + cameraOffset.x && mouse.x < planet.x + planet.width + cameraOffset.x) && (mouse.y > planet.y + cameraOffset.y && mouse.y < planet.y + planet.height + cameraOffset.y)) {
        ctx.fillStyle = "red";
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

    // Move ship
    ship.x += ship.thrust.x;
    ship.y += ship.thrust.y;
}

function drawTorpedoes() {
    for (var i = 0; i < ship.torpedoes.length; i++) {
        ctx.shadowColor = torpedo.shadow
        ctx.shadowBlur = torpedo.height * scale
        ctx.drawImage(torpedo.el, ship.torpedoes[i].x + cameraOffset.x - (torpedo.width / 2), ship.torpedoes[i].y + cameraOffset.y - (torpedo.height / 2), ship.width / 2, ship.height / 2)
        ctx.shadowBlur = 0
    }

    for (var i = 0; i < ship.torpedoes.length; i++) {
        ship.torpedoes[i].x += ship.torpedoes[i].xv;
        ship.torpedoes[i].y += ship.torpedoes[i].yv;

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

// Game Loop
setInterval(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    camera.x = ship.x - (canvas.width / 2)
    camera.y = ship.y - (canvas.height / 2)
    cameraOffset.x = canvas.width / 2 - ship.x
    cameraOffset.y = canvas.height / 2 - ship.y

    // Background?
    // ctx.drawImage(space, camera.x - cameraOffset.x, camera.y - cameraOffset.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    drawStars();
    drawSun();
    planets.forEach(drawPlanet);
    drawShip();
    drawTorpedoes();

    // ctx.fillStyle = "red";
    // ctx.font = "15px serif";
    // ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
    // ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
    // ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
    // ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, 5, 60);
    // ctx.fillText(`Canvas: ${Math.round(canvas.width)}, ${Math.round(canvas.width)}`, 5, 75);
    // ctx.fillText(`Space: ${Math.round(space.width)}, ${Math.round(space.height)}`, 5, 90);
    // ctx.fillText(`Scale: ${scale}`, 5, 105);

}, 1000 / FPS)