asteroids = [];

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
