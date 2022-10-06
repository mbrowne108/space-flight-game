const orbitColor = 'rgb(100,100,100)';

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
    shadow: "rgb(225, 177, 101)"
}

const venus = {
    el: document.getElementById("venus"),
    name: 'Venus',
    speed: -(0.003502),
    height: 9.5 * 2,
    width: 9.5 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 67 * 6,
    shadow: "rgb(203, 173, 115)"
}

const earth = {
    el: document.getElementById("earth"),
    name: 'Earth',
    speed: 0.002978,
    height: 10 * 2,
    width: 10 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 93 * 6,
    shadow: "rgb(113, 115, 174)",
    hasMoon: true
}

const mars = {
    el: document.getElementById("mars"),
    name: 'Mars',
    speed: 0.0024077,
    height: 5.3 * 2,
    width: 5.3 * (4/3) * 2,
    theta: Math.random() * 2 * Math.PI,
    radius: 142 * 6,
    shadow: "rgb(203, 84, 14)"
}

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 112 * 2,
    width: 112 * (4/3) * 2,
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 484 * 6,
    shadow: "rgb(194, 142, 123)"
}

const saturn = {
    el: document.getElementById("saturn"),
    name: 'Saturn',
    height: 94.5 * 2,
    width: 94.5 * (4/3) * 2,
    speed: 0.000969,
    theta: Math.random() * 2 * Math.PI,
    radius: 889 * 6,
    shadow: "rgb(251, 204, 132)"
}

const uranus = {
    el: document.getElementById("uranus"),
    name: 'Uranus',
    height: 40 * 2,
    width: 40 * (4/3) * 2,
    speed: -(0.000681),
    theta: Math.random() * 2 * Math.PI,
    radius: 1790 * 6,
    shadow: "rgb(207, 245, 247)"
}

const neptune = {
    el: document.getElementById("neptune"),
    name: 'Neptune',
    height: 38.8 * 2,
    width: 38.8 * (4/3) * 2,
    speed: 0.000543,
    theta: Math.random() * 2 * Math.PI,
    radius: 2880 * 6,
    shadow: "rgb(72, 129, 255)"
}

const pluto = {
    el: document.getElementById("pluto"),
    name: 'Pluto',
    height: 2 * 2,
    width: 2 * (4/3) * 2,
    speed: 0.000474,
    theta: Math.random() * 2 * Math.PI,
    radius: 3670 * 6,
    shadow: "rgb(231, 175, 128)"
}

const moon = {
    el: document.getElementById("moon"),
    name: 'Moon',
    height: 2.7 * 2,
    width: 2.7 * (4/3) * 2,
    speed: 0.002978 * 12,
    theta: Math.random() * 2 * Math.PI,
    radius: 5 * 6,
    shadow: "rgb(245, 236, 237)"
}

const asteroidBelt = {
    num: 300,
    size: 20,
    speed: 0.0004077,
    radius: 300 * 6
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

function drawSun() {
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.scale(scale, scale);
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));

    ctx.drawImage(sun.el, sun.x - (sun.width / 2) + cameraOffset.x, sun.y - (sun.height / 2) + cameraOffset.y, sun.width, sun.height)
}

function drawPlanet(planet) {
    // Draw orbit

    ctx.beginPath()
    ctx.strokeStyle = orbitColor
    ctx.lineWidth = 1 / scale
    ctx.arc(sun.x + cameraOffset.x, sun.y + cameraOffset.y, planet.radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Planet movement
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - planet.width / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - planet.height / 2
    ctx.drawImage(planet.el, planet.x + cameraOffset.x, planet.y + cameraOffset.y, planet.width, planet.height)

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
    if ((mouse.x > planet.x + cameraOffset.x && mouse.x < planet.x + planet.width + cameraOffset.x) && 
        (mouse.y > planet.y + cameraOffset.y && mouse.y < planet.y + planet.height + cameraOffset.y)) {
            ctx.fillStyle = "white";
            ctx.font = "16px serif";
            ctx.fillText(planet.name, planet.x + cameraOffset.x, planet.y + cameraOffset.y - 5)
        }
}