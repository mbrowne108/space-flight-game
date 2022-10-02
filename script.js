const FPS = 60
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const stars = []

// Position stars
for (i = 0; i < 1000; i++) {
    let star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
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

const sun = {
    el: document.getElementById("sun"),
    name: "Sun",
    height: 100,
    width: 100 * 1.33,
    x: canvas.width / 2,
    y: canvas.height / 2
}

const mercury = {
    el: document.getElementById("mercury"),
    name: 'Mercury',
    height: 3.8,
    width: 3.8 * 1.33,
    speed: 0.004787,
    theta: Math.random() * 2 * Math.PI,
    radius: 80,
}

const venus = document.getElementById("venus")
const earth = document.getElementById("earth")
const mars = document.getElementById("mars")

const jupiter = {
    el: document.getElementById("jupiter"),
    name: 'Jupiter',
    height: 72,
    width: 72 * 1.33,
    speed: 0.001307,
    theta: Math.random() * 2 * Math.PI,
    radius: 235
}

const saturn = document.getElementById("saturn")
const uranus = document.getElementById("uranus")
const neptune = document.getElementById("neptune")
const pluto = document.getElementById("pluto")
const moon = document.getElementById("moon")







function update(planet) {
    planet.theta -= planet.speed
    planet.x = Math.cos(planet.theta) * planet.radius + sun.x - sun.height / 2
    planet.y = Math.sin(planet.theta) * planet.radius + sun.y - sun.height / 2
    ctx.drawImage(planet.el, 0, 0, planet.el.width, planet.el.height, planet.x, planet.y, planet.width, planet.height)
}

// Game Loop
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawStars()

    // Draw sun
    ctx.drawImage(sun.el, 0, 0, sun.el.width, sun.el.height, sun.x - sun.width / 2, sun.y - sun.height / 2, sun.width, sun.height)

    // Draw orbits
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.arc(sun.x, sun.y, jupiter.radius, 0, 2 * Math.PI)
    ctx.stroke()

    update(jupiter)
}, 1000 / FPS)