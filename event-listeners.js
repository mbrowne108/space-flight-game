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
    if (ship.exploding) {
        return;
    }
    mouse.x = e.clientX
    mouse.y = e.clientY
})
canvas.addEventListener("mousedown", (e) => { // Right Click (Phasers)
    if (ship.exploding) {
        return;
    }
    if (e.button != 0) {
        if (ship.phaserCharge > 0 && distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500) {
            ship.firing = true;
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (ship.exploding) {
        return;
    }
    ship.firing = false;
})
canvas.addEventListener('click', (e) => { // Left Click (Torpedo)
    if (ship.exploding) {
        return;
    }
    fireTorpedoes()
})
canvas.addEventListener('wheel', (e) => {
    if (ship.exploding) {
        return;
    }
    if (e.wheelDelta >= 0 ) {
        scale += 0.1 * scale
    } else {
        if (scale > 0.1) {
            scale -= 0.1 * scale
        }
    }
})
canvas.addEventListener('contextmenu', function(e) {
    if (ship.exploding) {
        return;
    }
    e.preventDefault();
    return false;
}, false);

function keyDown(e) {
    if (ship.exploding) {
        return;
    }

    switch(e.code) {
        case "KeyW": // W Thrust
            ship.thrusting = true;
            break;
        case "KeyS": // S Brake
            ship.braking = true;
            break;
        case "KeyV": // V Explode (testing)
            explodeShip()
            break;
        case "KeyF": // F (Orbit Planet)
            ship.scanning ? ship.orbiting = !ship.orbiting : null
            break;
        case "KeyQ": // Q (Previous Lock)
            if (ship.scanning) {
                if (planetScanMode) {
                    planetLockId === 0 ? planetLockId = planets.length - 1 : planetLockId -= 1
                    planets.forEach((pl, index) => {
                        if (planetLockId !== index) {
                            pl.locked = false
                        } else {
                            pl.locked = !pl.locked
                            ship.orbiting = false
                        }
                    })
                } else {
                    lockId === 0 ? lockId = klingons.length - 1 : lockId -= 1
                    klingons.forEach((kl, index) => lockId !== index ? kl.locked = false : kl.locked = true)
                }
            }
            break;
        case "KeyE": // E (Next Lock)
            if (ship.scanning) {
                if (planetScanMode) {
                    planetLockId === planets.length - 1 ? planetLockId = 0 : planetLockId += 1
                    planets.forEach((pl, index) => {
                        if (planetLockId !== index) {
                            pl.locked = false
                        } else {
                            pl.locked = !pl.locked
                            ship.orbiting = false
                        }
                    })
                } else {
                    lockId === klingons.length - 1 ? lockId = 0 : lockId += 1
                    klingons.forEach((kl, index) => lockId !== index ? kl.locked = false : kl.locked = true)
                }
            }
            break;
        case "Space": // Spacebar (Red Alert)
            if (ship.redAlert) {
                ship.redAlert = !ship.redAlert
                document.querySelector('#overlay').classList.toggle('overlay-collapsed');
            } else {
                shieldsUpAnim();
                ship.scanning = true
                document.querySelector('#overlay').classList.toggle('overlay-collapsed');
            }
            break;
        case "Tab": // Tab (Overlay)
            e.preventDefault()
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
        case "KeyR": // R (Clear Target Locks)
            klingons.forEach((kl) => kl.locked = false)
            planets.forEach((pl) => pl.locked = false)
            break;
        case "KeyA": // A (Toggle Scan Mode)
            if (ship.scanning) {
                planetScanMode = !planetScanMode
                if (planetScanMode) {
                    klingons.forEach((kl) => kl.locked = false)
                    planets[planetLockId].locked = true
                    !ship.orbiting
                } else {
                    planets.forEach((pl) => pl.locked = false)
                    klingons[lockId].locked = true
                }
            }
            break;
        case "Escape": // ESC (Pause Menu)
            if (!showPauseMenu) {
                showPauseMenu = true
            } else {
                showPauseMenu = false
                requestAnimationFrame(loop)
            }

            
            break;
    }
}

function keyUp(e) {
    if (ship.exploding) {
        return;
    }

    switch(e.code) {
        case "KeyW": // W
            ship.thrusting = false;
            break;
        case "KeyS": // S
            ship.braking = false;
            break;
    }
}
