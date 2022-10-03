const FPS = 60
const orbitColor = 'rgb(100, 100, 100)'
const mouse = {x: 0, y: 0}
let scale = 1

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const stars = []

canvas.addEventListener('wheel', (e) => {
    e.wheelDelta >= 0 ? scale += 0.01 : scale -= 0.01
})


// Position stars
for (i = 0; i < 2000; i++) {
    let star = {
        x: Math.random() * canvas.width * 2,
        y: Math.random() * canvas.height * 2,
        size: Math.random() + 1
    }
    stars.push(star)
}

const sun = {
    el: document.getElementById("sun"),
    name: "Sun",
    height: 100,
    width: 100 * (4/3),
    x: canvas.width * 2,
    y: canvas.height * 2,
    shadow: "rgb(255, 193, 6)"
}

const mercury = {
    el: document.getElementById("mercury"),
    name: 'Mercury',
    height: 3.8,
    width: 3.8 * (4/3),
    speed: 0.004787,
    theta: Math.random() * 2 * Math.PI,
    radius: 80,
    shadow: "rgb(225, 177, 101)"
}

const venus = {
    el: document.getElementById("venus"),
    name: 'Venus',
    speed: -(0.003502),
    height: 9.5,
    width: 9.5 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 110,
    shadow: "rgb(203, 173, 115)"
}

const earth = {
    el: document.getElementById("earth"),
    name: 'Earth',
    speed: 0.002978,
    height: 10,
    width: 10 * (4/3),
    theta: Math.random() * 2 * Math.PI,
    radius: 150,
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
    radius: 180,
    shadow: "rgb(203, 84, 14)"
}

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 72,
    width: 72 * (4/3),
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 235,
    shadow: "rgb(194, 142, 123)"
}

const saturn = {
    el: document.getElementById("saturn"),
    name: 'Saturn',
    height: 60,
    width: 60 * (4/3),
    speed: 0.000969,
    theta: Math.random() * 2 * Math.PI,
    radius: 280,
    shadow: "rgb(251, 204, 132)"
}

const uranus = {
    el: document.getElementById("uranus"),
    name: 'Uranus',
    height: 50,
    width: 50 * (4/3),
    speed: -(0.000681),
    theta: Math.random() * 2 * Math.PI,
    radius: 330,
    shadow: "rgb(207, 245, 247)"
}

const neptune = {
    el: document.getElementById("neptune"),
    name: 'Neptune',
    height: 48.8,
    width: 48.8 * (4/3),
    speed: 0.000543,
    theta: Math.random() * 2 * Math.PI,
    radius: 385,
    shadow: "rgb(72, 129, 255)"
}

const pluto = {
    el: document.getElementById("pluto"),
    name: 'Pluto',
    height: 2,
    width: 2 * (4/3),
    speed: 0.000474,
    theta: Math.random() * 2 * Math.PI,
    radius: 450,
    shadow: "rgb(231, 175, 128)"
}

const moon = {
    el: document.getElementById("moon"),
    name: 'Moon',
    height: 2.7,
    width: 2.7 * (4/3),
    speed: 0.002978 * 12,
    theta: Math.random() * 2 * Math.PI,
    radius: 15,
    shadow: "rgb(245, 236, 237)"
}

const planets = [mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto]

function drawStars() {
    ctx.translate(sun.x,sun.y);
    ctx.scale(scale, scale);
    ctx.translate(-sun.x,-sun.y);

    stars.map((star) => {
        ctx.fillStyle = `rgb(${(Math.random() * 10)+ 245}, ${(Math.random() * 10)+ 245}, ${(Math.random() * 10) + 200})`
        ctx.beginPath()
        ctx.fillRect(star.x, star.y, star.size, star.size)
        ctx.stroke()
    })
}

function drawSun() {
    ctx.translate(sun.x, sun.y);
    ctx.scale(scale, scale);
    ctx.translate(-sun.x, -sun.y);

    ctx.shadowColor = sun.shadow
    ctx.shadowBlur = sun.height
    ctx.drawImage(sun.el, 0, 0, sun.el.width, sun.el.height, sun.x - sun.width / 2, sun.y - sun.height / 2, sun.width, sun.height)
    ctx.shadowBlur = 0
}

function drawPlanet(planet) {
    ctx.translate(sun.x, sun.y);
    ctx.scale(scale, scale);
    ctx.translate(-sun.x, -sun.y);

    // if (planet.highlighted) {
    //     ctx.strokeStyle = "red"
    //     ctx.strokeRect(planet.x, planet.y, planet.width, planet.height)
    //     ctx.font = "16px Arial"
    //     ctx.textAlign = 'start'
    //     ctx.strokeText(planet.name, planet.x, planet.y - 10)
    // }

    // Draw orbit
    ctx.strokeStyle = orbitColor
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(sun.x, sun.y, planet.radius, 0, 2 * Math.PI)
    ctx.stroke()

    // Planet movement
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - planet.width / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - planet.height / 2
    ctx.shadowColor = planet.shadow
    ctx.shadowBlur = planet.height
    ctx.drawImage(planet.el, 0, 0, planet.el.width, planet.el.height, planet.x, planet.y, planet.width, planet.height)
    ctx.shadowBlur = 0


    // Moon orbit and movement
    if (planet.hasMoon) {
        ctx.strokeStyle = orbitColor
        ctx.beginPath()
        ctx.arc(planet.x + planet.width / 2, planet.y + planet.height / 2, moon.radius, 0, 2 * Math.PI)
        ctx.stroke()

        moon.theta -= moon.speed
        moon.x = Math.cos(moon.theta) * moon.radius + planet.x + moon.width
        moon.y = Math.sin(moon.theta) * moon.radius + planet.y + moon.height
        ctx.drawImage(moon.el, 0, 0, moon.el.width, moon.el.height, moon.x, moon.y, moon.width, moon.height)
    }

    // Hover over planet
    if ((mouse.x > planet.x && mouse.x < planet.x + planet.width) && (mouse.y > planet.y && mouse.y < planet.y + planet.height)) {
        ctx.clearRect(0, 0, 300, 20)
        ctx.font = "14px Arial"
        ctx.textAlign = 'start'
        ctx.fillText(planet.name, planet.x, planet.y - 10)
    }
}


// Game Loop
setInterval(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    sun.x = window.innerWidth / 2
    sun.y = window.innerHeight / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    drawStars()
    drawSun()

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    })

    planets.forEach(drawPlanet)

}, 1000 / FPS)