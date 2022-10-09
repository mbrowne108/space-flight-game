const orbitColor = 'rgb(100,100,100)';
let planetLockId = 0

const sun = {
    el: document.getElementById("sun"),
    name: "Sun",
    height: 1500,
    width: 1500,
    x: 3000,
    y: 3000,
    shadow: "rgb(242, 187, 36)"
}

const mercury = {
    el: document.getElementById("mercury"),
    name: 'Mercury',
    height: 3.8 * 2,
    width: 3.8 * (4/3) * 2,
    speed: 0.004787,
    theta: Math.random() * 2 * Math.PI,
    radius: 35 * 6,
    locked: false,
    moons: []
}

const venus = {
    el: document.getElementById("venus"),
    name: 'Venus',
    speed: -(0.003502),
    height: 9.5 * 2,
    width: 9.5 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 67 * 6,
    locked: false,
    moons: []
}

const earth = {
    el: document.getElementById("earth"),
    name: 'Earth',
    speed: 0.002978,
    height: 10 * 2,
    width: 10 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 93 * 6,
    locked: false,
    moons: [{
        el: document.getElementById("moon"),
        name: 'Moon',
        height: 2.7 * 2,
        width: 2.7 * (4/3) * 2,
        speed: 0.0002978 * 12,
        theta: Math.random() * 2 * Math.PI,
        radius: 5 * 6,
        locked: false
    }]
}

const mars = {
    el: document.getElementById("mars"),
    name: 'Mars',
    speed: 0.0024077,
    height: 5.3 * 2,
    width: 5.3 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 142 * 6,
    locked: false,
    moons: []
}

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 112 * 2,
    width: 112 * (4/3) * 2,
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 484 * 6,
    locked: false,
    moons: []
}

const saturn = {
    el: document.getElementById("saturn"),
    name: 'Saturn',
    height: 94.5 * 2,
    width: 94.5 * (4/3) * 2,
    speed: 0.000969,
    theta: Math.random() * 2 * Math.PI,
    radius: 889 * 6,
    locked: false,
    moons: []
}

const uranus = {
    el: document.getElementById("uranus"),
    name: 'Uranus',
    height: 40 * 2,
    width: 40 * (4/3) * 2,
    speed: -(0.000681),
    theta: Math.random() * 2 * Math.PI,
    radius: 1790 * 6,
    locked: false,
    moons: []
}

const neptune = {
    el: document.getElementById("neptune"),
    name: 'Neptune',
    height: 38.8 * 2,
    width: 38.8 * (4/3) * 2,
    speed: 0.000543,
    theta: Math.random() * 2 * Math.PI,
    radius: 2880 * 6,
    locked: false,
    moons: []
}

const pluto = {
    el: document.getElementById("pluto"),
    name: 'Pluto',
    height: 2 * 2,
    width: 2 * (4/3) * 2,
    speed: 0.0000474,
    theta: Math.random() * 2 * Math.PI,
    radius: 3670 * 6,
    locked: false,
    moons: []
}

const asteroidBelt = {
    num: 300,
    size: 20,
    speed: 0.00004077,
    radius: 300 * 6
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

function lockedOnPlanetView(planet) {
    ctx.lineWidth = 10
    if (planet.x + planet.width / 2 + cameraOffset.x < 0 || 
        planet.x + planet.width / 2 + cameraOffset.x > canvas.width ||
        planet.y + planet.width / 2 + cameraOffset.y < 0 ||
        planet.y + planet.width / 2 + cameraOffset.y > canvas.height
    ) {
        ctx.lineWidth = 5 / scale
        ctx.setLineDash([50, 50])
        ctx.strokeStyle = "rgba(0, 155, 255, 0.5)";
        ctx.lineDashOffset = 50
        ctx.beginPath();
        ctx.moveTo(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
        ctx.lineTo(planet.x + cameraOffset.x + planet.width / 2, planet.y + cameraOffset.y + planet.height / 2);
        ctx.stroke();
    } else {
        ctx.strokeStyle = "rgb(0, 155, 255)";
        ctx.lineWidth = 1 / scale
        ctx.beginPath();
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x - 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 10 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 10 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x - 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x + 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y + 10 * planet.height / 30);
        ctx.moveTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 10 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 30 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.lineTo(planet.x + planet.width / 2 + cameraOffset.x + 10 * planet.width / 40, planet.y + planet.height / 2 + cameraOffset.y - 30 * planet.height / 30);
        ctx.stroke();
    }
}

function drawSun() {
    ctx.drawImage(sun.el, sun.x - (sun.width / 2) + cameraOffset.x, sun.y - (sun.height / 2) + cameraOffset.y, sun.width, sun.height)
}

function drawPlanet(planet) {
    // Draw orbit
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.strokeStyle = orbitColor
    ctx.lineWidth = 1 / scale
    ctx.arc(sun.x + cameraOffset.x, sun.y + cameraOffset.y, planet.radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Locked on
    if (planet.locked && ship.scanning) {
        lockedOnPlanetView(planet)
    }

    // Planet movement
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - planet.width / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - planet.height / 2
    ctx.drawImage(planet.el, planet.x + cameraOffset.x, planet.y + cameraOffset.y, planet.width, planet.height)

    // Moon orbit and movement
    planet.moons.map((moon) => {
        ctx.strokeStyle = orbitColor
        ctx.lineWidth = 1 / scale
        ctx.beginPath()
        ctx.arc(planet.x + (planet.width / 2) + cameraOffset.x, planet.y + (planet.height / 2) + cameraOffset.y, moon.radius, 0, 2 * Math.PI)
        ctx.stroke()

        moon.theta -= moon.speed
        moon.x = Math.cos(moon.theta) * moon.radius + planet.x + moon.width
        moon.y = Math.sin(moon.theta) * moon.radius + planet.y + moon.height
        ctx.drawImage(moon.el, moon.x + cameraOffset.x + moon.width / 3, moon.y + cameraOffset.y + moon.height / 3, moon.width, moon.height)
    })

    // Hover over planet
    if ((mouse.x > planet.x + cameraOffset.x && mouse.x < planet.x + planet.width + cameraOffset.x) && 
        (mouse.y > planet.y + cameraOffset.y && mouse.y < planet.y + planet.height + cameraOffset.y)) {
            ctx.fillStyle = "white";
            ctx.font = "16px serif";
            ctx.fillText(planet.name, planet.x + cameraOffset.x, planet.y + cameraOffset.y - 5)
        }
}