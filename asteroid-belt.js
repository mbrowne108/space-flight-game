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

