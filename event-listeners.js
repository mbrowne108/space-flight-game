// ________      ________ _   _ _______   _      _____  _____ _______ ______ _   _ ______ _____   _____ 
// |  ____\ \    / /  ____| \ | |__   __| | |    |_   _|/ ____|__   __|  ____| \ | |  ____|  __ \ / ____|
// | |__   \ \  / /| |__  |  \| |  | |    | |      | | | (___    | |  | |__  |  \| | |__  | |__) | (___  
// |  __|   \ \/ / |  __| | . ` |  | |    | |      | |  \___ \   | |  |  __| | . ` |  __| |  _  / \___ \ 
// | |____   \  /  | |____| |\  |  | |    | |____ _| |_ ____) |  | |  | |____| |\  | |____| | \ \ ____) |
// |______|   \/   |______|_| \_|  |_|    |______|_____|_____/   |_|  |______|_| \_|______|_|  \_\_____/ 
                                              

const mouse = {x: 0, y: 0}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
})
canvas.addEventListener("mousedown", (e) => { // Right Click (Phasers)
    if (e.button != 0) {
        if (ship.phaserCharge > 0 && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500) {
            ship.firing = true;
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    ship.firing = false;
})
canvas.addEventListener('click', (e) => { // Left Click (Torpedo)
    fireTorpedoes()
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
        case 70: // F
            alert('GAME OVER')
            ship.exploding = !ship.exploding
            if (ship.exploding) {
                for (i = 0; i < 500; i++) {
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
            break;
        case 81: // Q (Previous Lock)
            if (ship.scanning) {
                if (planetScanMode) {
                    planetLockId === 0 ? planetLockId = planets.length - 1 : planetLockId -= 1
                    planets.forEach((pl, index) => planetLockId !== index ? pl.locked = false : pl.locked = !pl.locked)
                } else {
                    lockId === 0 ? lockId = klingons.length - 1 : lockId -= 1
                    klingons.forEach((kl, index) => lockId !== index ? kl.locked = false : kl.locked = true)
                }
            }
            break;
        case 69: // E (Next Lock)
            if (ship.scanning) {
                if (planetScanMode) {
                    planetLockId === planets.length - 1 ? planetLockId = 0 : planetLockId += 1
                    planets.forEach((pl, index) => planetLockId !== index ? pl.locked = false : pl.locked = !pl.locked)
                } else {
                    lockId === klingons.length - 1 ? lockId = 0 : lockId += 1
                    klingons.forEach((kl, index) => lockId !== index ? kl.locked = false : kl.locked = true)
                }
            }
            break;
        case 32: // Spacebar (Red Alert)
            if (ship.redAlert) {
                ship.redAlert = !ship.redAlert
                document.querySelector('#overlay').classList.toggle('overlay-collapsed');
            } else {
                shieldsUpAnim();
                ship.scanning = true
                document.querySelector('#overlay').classList.toggle('overlay-collapsed');
            }
            break;
        case 09: // Tab (Overlay)
            e.preventDefault()
            document.querySelector('#overlay').classList.toggle('overlay-collapsed');
            ship.scanning = !ship.scanning
            if (ship.scanning) {
                ship.scans.push({
                    x: ship.x + ship.width,
                    y: ship.y + ship.height,
                    r: 50,
                    sv: scanSpeed / FPS
                })
            }
            break;
        case 82: // R (Orbit Planet)
            ship.scanning ? ship.orbiting = !ship.orbiting : null
            break;
        case 20: // Caps Lock
            e.preventDefault()
            if (ship.scanning) {
                while (overlay.el.lastChild) {
                    overlay.el.removeChild(overlay.el.lastChild)
                }
                const h1 = document.createElement('h1')
                const h5a = document.createElement('h5')
                const h5b = document.createElement('h5')
                const h5c = document.createElement('h5')
                h1.innerText = "Scanning System..."
                h5a.innerText = "Press Caps Lock to switch target types"
                h5b.innerText = "Click to lock target"
                h5c.innerText = "Q and E to rotate targets"
                overlay.el.appendChild(h1)
                overlay.el.appendChild(h5a)
                overlay.el.appendChild(h5b)
                overlay.el.appendChild(h5c)
                planetScanMode = !planetScanMode
                if (planetScanMode) {
                    klingons.forEach((kl) => kl.locked = false)
                } else {
                    planets.forEach((pl) => pl.locked = false)
                }
            }
            ship.scanning ? ship.orbiting = !ship.orbiting : null
            break;
        case 48: // 0 (Clear Planet Locks)
            if (ship.scanning) {
                planets.forEach((planet) => planet.locked = false)
            }    
            break;
        case 49: // 1 (Lock Mercury)
            if (ship.scanning) {
                for (let i = 0; i < planets.length; i++) {
                    i !== 0 ? planets[i].locked = false : planets[i].locked = !planets[i].locked
                }
            }
            break;
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