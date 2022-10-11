let alertMsg = ''
let planetScanMode = false
let scannerExpand = 0

function drawOverlay() {
        // ctx.fillStyle = "red";
        // ctx.font = "15px serif";
        // ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
        // ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
        // ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
        // ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, window.innerWidth / 2, 60);
        // ctx.fillText(`Dist between ${distBetweenPoints(ship.x, ship.y, sun.x, sun.y)}`, 5, 75);
        // ctx.fillText(`Shields:${ship.shields}`, 5, 90);
        // ctx.fillText(`Thrust X: ${ship.thrust.y}, Y: ${ship.thrust.x}`, 5, 105);

    textRatio = window.innerWidth / 1920

    // Shields
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}`);
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ship.shields >= 0 ? ctx.fillStyle = grd : ctx.fillStyle = 'transparent'
    ctx.fillRect(window.innerWidth - (window.innerWidth / 15), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.shields / maxShields))
    

    // Hull
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, `rgb(97, 94, 92)`);
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ship.hull >= 0 ? ctx.fillStyle = grd : ctx.fillStyle = 'transparent'
    ctx.fillRect(window.innerWidth - (window.innerWidth / 10), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.hull * 2 / maxShields))

    // Phasers
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, 'rgb(200, 0, 0)');
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ship.phaserCharge >= 0 ? ctx.fillStyle = grd : ctx.fillStyle = 'transparent'
    ctx.fillRect(window.innerWidth - (window.innerWidth / 30), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.phaserCharge / maxPhaserCharge))

    // Outlines
    ctx.setLineDash([])
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 1
    ctx.strokeRect(window.innerWidth - (window.innerWidth / 15), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 3)
    ctx.strokeRect(window.innerWidth - (window.innerWidth / 30), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 3)
    ctx.strokeRect(window.innerWidth - (window.innerWidth / 10), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 6)

    // Text
    ctx.fillStyle = 'rgb(171, 183, 183)'
    ctx.font = `${16 * textRatio}px trebuchet ms`
    ship.scanning ? null : ctx.fillText('Press Tab to scan', window.innerWidth / 100, window.innerHeight / 50)
    ship.scanning ? null : ctx.fillText('Press ESC to pause', window.innerWidth / 100, window.innerHeight / 25)
    ctx.fillText(soundOn ? 'Press M to Mute Audio' : 'Press M to Unmute Audio', window.innerWidth - window.innerWidth / 10, window.innerHeight / 50)
    ctx.textAlign = "center"
    ctx.fillText('Shields', window.innerWidth - (window.innerWidth / 15) + window.innerWidth / 100, window.innerHeight / 3 - window.innerHeight / 100);
    ctx.fillText('Hull', window.innerWidth - (window.innerWidth / 10) + window.innerWidth / 100, window.innerHeight / 2 - window.innerHeight / 100);
    ctx.fillText('Phasers', window.innerWidth - (window.innerWidth / 30) + window.innerWidth / 100, window.innerHeight / 3 - window.innerHeight / 100);
    ctx.fillText('Torpedoes', window.innerWidth - (window.innerWidth / 17.5), window.innerHeight - window.innerHeight / 3 + window.innerHeight / 40);
    ctx.font = `${28 * textRatio}px trebuchet ms`
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillText(ship.torpCount, window.innerWidth - (window.innerWidth / 17.5), window.innerHeight - window.innerHeight / 3 + window.innerHeight / 18);
    
    ctx.fillStyle = 'rgb(171, 183, 183)'
    ctx.font = `${16 * textRatio}px trebuchet ms`
    ctx.fillText('Klingons Destroyed', window.innerWidth / 2, window.innerHeight / 50);
    ctx.font = `${28 * textRatio}px trebuchet ms`
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillText(klingonsDestroyed, window.innerWidth / 2, window.innerHeight / 20);

    

    // Scanner
    if (ship.scanning) {
        ctx.setLineDash([])
        grd = ctx.createLinearGradient(window.innerWidth / 6, 0, 0, 0)
        grd.addColorStop(0, 'rgba(108, 122, 137, 0.3)');
        grd.addColorStop(1, 'rgb(171, 183, 183, 0.3)');
        ctx.fillStyle = grd
        ctx.textAlign = "center"
        ctx.fillRect(0, 0, scannerExpand < 320 ? scannerExpand += 3 : scannerExpand = 320, window.innerHeight / 1.65)
        ctx.strokeStyle = 'rgb(171, 183, 183)'
        ctx.lineWidth = 3
        ship.redAlert ? ctx.shadowColor = "rgba(200, 0, 0, 1)" : null
        ship.redAlert ? ctx.shadowBlur = 20 : null
        ctx.strokeRect(0, 0, scannerExpand < 320 ? scannerExpand += 3 : scannerExpand = 320, window.innerHeight / 1.65)
        ship.redAlert ? ctx.shadowBlur = 0 : null
        ctx.fillStyle = 'rgb(238, 238, 238)'
        ctx.font = `${26 * textRatio}px trebuchet ms`
        planetScanMode ? ctx.fillText('Scanning Planets...', window.innerWidth / 12, window.innerHeight / 20) : ctx.fillText('Scanning Enemies...', window.innerWidth / 12, window.innerHeight / 20)
        if (scannerExpand === 320) {
            ctx.font = `${14 * textRatio}px trebuchet ms`
            ctx.fillText('Press A to switch target types', window.innerWidth / 12, window.innerHeight / 20 + 20)
            ctx.fillText('Q and E to rotate targets', window.innerWidth / 12, window.innerHeight / 20 + 38)
            ctx.fillText('Press R to deselect target', window.innerWidth / 12, window.innerHeight / 20 + 56)
            ctx.fillText('Press Tab to exit scanner', window.innerWidth / 12, window.innerHeight / 20 + 74)
            if (planetScanMode) {
                planets.map((planet, i) => {
                    ctx.fillStyle = 'rgb(0, 155, 255, 0.5)'
                    grd = ctx.createLinearGradient(0, window.innerHeight / 10 + ((i + 1) * 45) + 250, 0, 0)
                    grd.addColorStop(0, 'rgb(0, 155, 255, 0.5)');
                    grd.addColorStop(1, 'rgb(171, 183, 183, 0.5)');
                    ctx.fillStyle = grd
                    ctx.fillRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                    if (planet.locked) {
                        ctx.strokeStyle = "rgb(255, 218, 95, 0.5)"
                        ctx.shadowColor = "rgb(255, 218, 95)"
                        ctx.shadowBlur = 10
                        ctx.strokeRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                        ctx.shadowBlur = 0
                    } else {
                        ctx.strokeStyle = "rgb(171, 183, 183)"
                        ctx.strokeRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                    } 
                    ctx.fillStyle = 'rgb(238, 238, 238)'
                    ctx.font = `bold ${16 * textRatio}px trebuchet ms`
                    ctx.fillText(`${planet.name}`, window.innerWidth / 20, window.innerHeight / 10 + ((i + 1) * 45 + 20))
                    const distConvert = (Math.round((distBetweenPoints(ship.x, ship.y, planet.x, planet.y) / 6) * 1.60934))
                    ctx.font = `${12 * textRatio}px trebuchet ms`
                    ctx.fillText(`${distConvert} million km away`, window.innerWidth / 9, window.innerHeight / 10 + ((i + 1) * 45 + 20))
                })
            } else {
                klingons.map((klingon, i) => {
                    ctx.fillStyle = 'rgb(255, 0, 0, 0.5)'
                    grd = ctx.createLinearGradient(0, window.innerHeight / 10 + ((i + 1) * 45) + 250, 0, 0)
                    grd.addColorStop(0, 'rgb(255, 0, 0, 0.5)');
                    grd.addColorStop(1, 'rgb(171, 183, 183, 0.5)');
                    ctx.fillStyle = grd
                    ctx.fillRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                    if (klingon.locked) {
                        ctx.strokeStyle = "rgb(255, 218, 95, 0.5)"
                        ctx.shadowColor = "rgb(255, 218, 95)"
                        ctx.shadowBlur = 10
                        ctx.strokeRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                        ctx.shadowBlur = 0
                    } else {
                        ctx.strokeStyle = "rgb(171, 183, 183)"
                        ctx.strokeRect(window.innerWidth / 48, window.innerHeight / 10 + ((i + 1) * 45), window.innerWidth / 8, window.innerHeight / 30)
                    } 
                    ctx.fillStyle = 'rgb(238, 238, 238)'
                    ctx.font = `bold ${16 * textRatio}px trebuchet ms`
                    ctx.fillText(`${klingon.name} ${i + 1}`, window.innerWidth / 20, window.innerHeight / 10 + ((i + 1) * 45 + 20))
                    const distConvert = (Math.round((distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y) / 6) * 1.60934))
                    ctx.font = `${12 * textRatio}px trebuchet ms`
                    ctx.fillText(`${distConvert} million km away`, window.innerWidth / 9, window.innerHeight / 10 + ((i + 1) * 45 + 20))
                })
            }
        }
    }    

    if (klingons[lockId]) {
        if (klingons[lockId].locked) {
            ctx.fillStyle = 'rgb(171, 183, 183)'
            ctx.font = `${16 * textRatio}px trebuchet ms`
            klingons[lockId].locked ? ctx.fillText(`${klingons[lockId].name} ${lockId + 1} ${klingons[lockId].shields <= 0 ? "Hull" : "Shields"}`, window.innerWidth / 2, window.innerHeight / 10) : null;
            klingons[lockId].locked ? ctx.fillText(`${Math.round((distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) / 6) * 1.60934)} million km away`, window.innerWidth / 2, window.innerHeight / 5) : null;
            ctx.fillStyle = 'rgb(200, 0, 0)'
            distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500 ? ctx.fillText(`<<Phasers Within Range>>`, window.innerWidth / 2, window.innerHeight / 6) : null;
        
            // Klingon shield bar
            klingons[lockId].shields >= 0 ? ctx.fillStyle = `rgb(${255 - klingons[lockId].shields / 4}, ${klingons[lockId].shields / 4}, 0)` : ctx.fillStyle = 'black'  
            let grd = ctx.createLinearGradient(0, 135, 0, 0)
            grd.addColorStop(0, `rgb(${255 - klingons[lockId].shields / 4}, ${klingons[lockId].shields / 4}, 0)`);
            grd.addColorStop(0.3, 'rgb(171, 183, 183)');
            ctx.fillStyle = grd
            ctx.fillRect(
                window.innerWidth / 2 - innerWidth / 16, 
                window.innerHeight / 9, 
                klingons[lockId].shields <= 0 ? window.innerWidth / 4 * klingons[lockId].hull / 510 : window.innerWidth / 4 * klingons[lockId].shields / maxShields, 
                window.innerHeight / 30)
            ctx.strokeStyle = 'rgb(171, 183, 183)'
            ctx.strokeRect(window.innerWidth / 2 - innerWidth / 16, window.innerHeight / 9, window.innerWidth / 8, window.innerHeight / 30)
        }
    }

    if (planets[planetLockId].locked) {
        ctx.fillStyle = 'rgb(171, 183, 183)'
        ctx.font = `${16 * textRatio}px trebuchet ms`
        planets[planetLockId].locked ? ctx.fillText(`Locked on to ${planets[planetLockId].name}`, window.innerWidth / 2, window.innerHeight / 10) : null;
        planets[planetLockId].locked ? ctx.fillText(`${Math.round((distBetweenPoints(ship.x, ship.y, planets[planetLockId].x, planets[planetLockId].y) / 6) * 1.60934)} million km away`, window.innerWidth / 2, window.innerHeight / 5) : null;

        // Planets Image
        ctx.drawImage(planets[planetLockId].el, window.innerWidth / 2 - planets[planetLockId].el.width / 11, window.innerHeight / 9, planets[planetLockId].el.width / 5.5, planets[planetLockId].el.height / 5.5)
        ctx.strokeStyle = "rgb(0, 155, 255)"
        ctx.lineWidth = 3
        ctx.strokeRect(window.innerWidth / 2 - planets[planetLockId].el.width / 11, window.innerHeight / 9, planets[planetLockId].el.width / 5.5, planets[planetLockId].el.height / 5.5)
    }

    if (ship.scanning) {
        if (!ship.orbiting && distBetweenPoints(ship.x, ship.y, planets[planetLockId].x + planets[planetLockId].width / 2, planets[planetLockId].y + planets[planetLockId].height / 2) < planets[planetLockId].width + 100) {
            alert(`WITHIN RANGE TO ORBIT ${planets[planetLockId].name.toUpperCase()}. PRESS F`)
        }
    }


    ctx.font = `${36 * textRatio}px trebuchet ms`
    ctx.strokeStyle = 'rgb(200, 0, 0)'
    alertMsg ? ctx.strokeText(alertMsg, window.innerWidth / 2, window.innerHeight / 4 + window.innerHeight / 33) : null;

}