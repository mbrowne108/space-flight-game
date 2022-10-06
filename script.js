const FPS = 60
const mouse = {x: 0, y: 0}
let scale = 1

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

createAsteroids();
createKlingons();

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// ________      ________ _   _ _______   _      _____  _____ _______ ______ _   _ ______ _____   _____ 
// |  ____\ \    / /  ____| \ | |__   __| | |    |_   _|/ ____|__   __|  ____| \ | |  ____|  __ \ / ____|
// | |__   \ \  / /| |__  |  \| |  | |    | |      | | | (___    | |  | |__  |  \| | |__  | |__) | (___  
// |  __|   \ \/ / |  __| | . ` |  | |    | |      | |  \___ \   | |  |  __| | . ` |  __| |  _  / \___ \ 
// | |____   \  /  | |____| |\  |  | |    | |____ _| |_ ____) |  | |  | |____| |\  | |____| | \ \ ____) |
// |______|   \/   |______|_| \_|  |_|    |______|_____|_____/   |_|  |______|_| \_|______|_|  \_\_____/ 
                                              

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
window.addEventListener("mousedown", (e) => { // Right Click (Phasers)
    if (e.button != 0) {
        if (ship.phaserCharge > 0 && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500) {
            ship.firing = true;
        }
    }
});

window.addEventListener('mouseup', (e) => {
    ship.firing = false;
})
window.addEventListener('click', (e) => { // Left Click (Torpedo)
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
            console.log("out of torpedoes")
        }
    } else {
        console.log("reloading torpedo")
    }
    
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
canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
}, false);

function keyDown(e) {
    switch(e.keyCode) {
        case 87: // W
            ship.thrusting = true;
            break;
        case 83: // S
            ship.braking = true;
            break;
        case 70: // F (Scan)
            ship.scanning = !ship.scanning
            klingons[lockId].locked = !klingons[lockId].locked
            if (ship.scanning) {
                ship.scans.push({
                    x: ship.x + ship.width,
                    y: ship.y + ship.height,
                    r: 50,
                    sv: scanSpeed / FPS
                })
            }
            break;
        case 81: // Q (Previous Lock)
            if (ship.scanning) {
                klingons[lockId].locked = !klingons[lockId].locked
                lockId === 0 ? lockId = klingons.length - 1 : lockId -= 1
                klingons[lockId].locked = !klingons[lockId].locked
            }
            break;
        case 69: // E (Next Lock)
            if (ship.scanning) {
                klingons[lockId].locked = !klingons[lockId].locked
                lockId === klingons.length - 1 ? lockId = 0 : lockId += 1
                klingons[lockId].locked = !klingons[lockId].locked
                console.log(lockId)
            }
            break;
        case 32: // Spacebar (Shields)
            ship.shieldsUp ? ship.shieldsUp = !ship.shieldsUp : shieldsUpAnim();
            break;
        case 09: // Tab (Overlay)
            e.preventDefault()
            overlay.show = !overlay.show
            break;
        case 82: // R (Match speed of target)
            ship.scanning ? ship.orbiting = !ship.orbiting : null
            break;
        case 49: // 1 (Lock Mercury)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 0 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
        case 50: // 2 (Lock Venus)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 1 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 51: // 3 (Lock Earth)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 2 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 52: // 4 (Lock Mars)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 3 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 53: // 5 (Lock Jupiter)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 4 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 54: // 6 (Lock Saturn)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 5 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;    
        case 55: // 7 (Lock Uranus)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 6 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 56: // 8 (Lock Neptune)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 7 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
        case 57: // 9 (Lock Pluto)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 8 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
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

//   _____          __  __ ______   _      ____   ____  _____  
//  / ____|   /\   |  \/  |  ____| | |    / __ \ / __ \|  __ \ 
// | |  __   /  \  | \  / | |__    | |   | |  | | |  | | |__) |
// | | |_ | / /\ \ | |\/| |  __|   | |   | |  | | |  | |  ___/ 
// | |__| |/ ____ \| |  | | |____  | |___| |__| | |__| | |     
//  \_____/_/    \_\_|  |_|______| |______\____/ \____/|_|     
                                                           
                                                           
// Game Loop
function loop() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    camera.x = ship.x - (canvas.width / 2)
    camera.y = ship.y - (canvas.height / 2)
    cameraOffset.x = canvas.width / 2 - ship.x
    cameraOffset.y = canvas.height / 2 - ship.y

    overlay.show ? drawOverlay() : null;
    drawShip();
    drawKlingons();
    drawStars();
    drawSun();
    
    planets.forEach(drawPlanet);
    drawAsteroids();

    storeLastShipPosition(ship.x, ship.y)

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / FPS)
}

requestAnimationFrame(loop);