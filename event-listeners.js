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
    if (showMainMenu) {
        if (mouse.x >= canvas.width - canvas.width / 2.5 && 
            mouse.y >= canvas.height - canvas.height / 4 && 
            mouse.x <= canvas.width - canvas.width / 2.5 + canvas.width / 12 &&
            mouse.y <= canvas.height - canvas.height / 4 + canvas.height / 15) {
                startSelected = true
            } else if (
            mouse.x >= canvas.width - canvas.width / 4 && 
            mouse.y >= canvas.height - canvas.height / 4 && 
            mouse.x <= canvas.width - canvas.width / 4 + canvas.width / 12 &&
            mouse.y <= canvas.height - canvas.height / 4 + canvas.height / 15) {
                startSelected = false
            }
    }
    mouse.x = e.clientX
    mouse.y = e.clientY
})
canvas.addEventListener("mousedown", (e) => { // Right Click (Phasers)
    if (ship.exploding) {
        return;
    }
    if (showMainMenu) {
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
    if (showMainMenu) {
        return;
    }
    ship.firing = false;
})
canvas.addEventListener('click', (e) => { // Left Click (Torpedo)
    if (ship.exploding) {
        return;
    }
    if (showMainMenu) {
        if (mouse.x >= canvas.width - canvas.width / 2.5 && 
            mouse.y >= canvas.height - canvas.height / 4 && 
            mouse.x <= canvas.width - canvas.width / 2.5 + canvas.width / 12 &&
            mouse.y <= canvas.height - canvas.height / 4 + canvas.height / 15) {
                fxSelect.play()
                showMainMenu = false
            } else if (
            mouse.x >= canvas.width - canvas.width / 4 && 
            mouse.y >= canvas.height - canvas.height / 4 && 
            mouse.x <= canvas.width - canvas.width / 4 + canvas.width / 12 &&
            mouse.y <= canvas.height - canvas.height / 4 + canvas.height / 15) {
                showAboutMenu = !showAboutMenu
                fxSelect.play()
            }
    } else if (showPauseMenu) {
        null
    } else {
        fireTorpedoes()
    }
})
canvas.addEventListener('wheel', (e) => {
    if (ship.exploding) {
        return;
    }
    if (showMainMenu) {
        return;
    }
    if (e.wheelDelta >= 0 ) {
        if (scale < 4) {
            scale += 0.1 * scale
        }
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
    if (showMainMenu) {
        return;
    }
    e.preventDefault();
    return false;
}, false);

function keyDown(e) {
    if (ship.exploding) {
        return;
    }

    if (!showMainMenu) {
        switch(e.code) {
            case "KeyW": // W Thrust
                ship.thrusting = true;
                fxThrust.play()
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
                    shieldExpand = 0
                } else {
                    fxRedAlert.play()
                    shieldsUpAnim();
                    shieldExpand = 0
                }
                break;
            case "Tab": // Tab (Overlay)
                e.preventDefault()
                scannerExpand = 0
                ship.scanning = !ship.scanning
                if (ship.scanning) {
                    if (!planetScanMode) {
                        klingons.forEach((kl) => kl.locked = false)
                        findClosestTarget()
                    }
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
                    scannerExpand = 0
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
            case "KeyT": // T (Transporter)
                if (ship.orbiting && !ship.redAlert) {
                    ship.transporting = !ship.transporting
                } else if (!ship.orbiting && !ship.redAlert) {
                    alert('MUST BE IN ORBIT TO BEAM UP PASSENGERS')
                } else if (ship.orbiting && ship.redAlert) {
                    alert('CAN\'T USE TRANSPORTER WHILE AT RED ALERT')
                } else {
                    console.log('help')
                }
                break;
            case "KeyM": // M Mute Sound
                soundOn = !soundOn;
                break;
            case "Escape": // ESC (Pause Menu)
                if (!showPauseMenu) {
                    fxSelect.play()
                    showPauseMenu = true
                } else {
                    showPauseMenu = false
                    requestAnimationFrame(loop) 
                }
                break;
        }
    } else {
        switch(e.code) {
            case "Escape": // ESC (Pause Menu)
                    if (!showPauseMenu) {
                        fxSelect.play()
                        showPauseMenu = true
                    } else {
                        fxSelect.play()
                        showPauseMenu = false
                    }
                    break;
            case "Enter": // Enter (Start Game)
                if (showMainMenu) {
                    if (startSelected) {
                        fxSelect.play()
                        showMainMenu = false
                    } else {
                        fxSelect.play()
                        showAboutMenu = !showAboutMenu
                    }
                } 
                break;
            case "ArrowLeft":
                if (showMainMenu) startSelected = !startSelected
                break;
            case "ArrowRight":
                if (showMainMenu) startSelected = !startSelected
                break;
            case "KeyM": // M Mute Sound
                soundOn = !soundOn;
                break;
            case "Space": // Spacebar (Red Alert)
                startAudio = true
                break;
        }
    }
}

function keyUp(e) {
    if (ship.exploding) {
        return;
    }

    switch(e.code) {
        case "KeyW": // W
            ship.thrusting = false;
            fxThrust.stop()
            break;
        case "KeyS": // S
            ship.braking = false;
            break;
    }
}