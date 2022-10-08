let alertMsg = ''

function drawOverlay() {
    // ctx.fillStyle = "red";
    // ctx.font = "15px serif";
    // ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
    // ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
    // ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
    // ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, 5, 60);
    // ctx.fillText(`Dist between ${distBetweenPoints(ship.x, ship.y, sun.x, sun.y)}`, 5, 75);
    // ctx.fillText(`Shields:${ship.shields}`, 5, 90);
    // ctx.fillText(`Thrust X: ${ship.thrust.y}, Y: ${ship.thrust.x}`, 5, 105);


    // Shields
    ctx.save()
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}`);
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ctx.fillStyle = grd
    ctx.fillRect(window.innerWidth - (window.innerWidth / 15), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.shields / maxShields))
    ctx.strokeStyle = 'rgb(97, 94, 92)'
    ctx.lineWidth = 1
    ctx.rect(window.innerWidth - (window.innerWidth / 15), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 3)
    ctx.stroke()

    // Hull
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, `rgb(97, 94, 92)`);
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ctx.fillStyle = grd
    ctx.fillRect(window.innerWidth - (window.innerWidth / 10), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.hull * 2 / maxShields))
    ctx.strokeStyle = 'rgb(97, 94, 92)'
    ctx.lineWidth = 1
    ctx.rect(window.innerWidth - (window.innerWidth / 10), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 6)
    ctx.stroke()
    ctx.restore()

    // ship.shields >= 0 ? ctx.fillStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}` : ctx.fillStyle = 'black'
    
    // Phasers
    grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight + window.innerHeight / 6)
    grd.addColorStop(0, 'rgb(200, 0, 0)');
    grd.addColorStop(1, 'rgb(171, 183, 183)');
    ctx.fillStyle = grd
    ctx.fillRect(window.innerWidth - (window.innerWidth / 30), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -(window.innerHeight / 3 * ship.phaserCharge / maxPhaserCharge))
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.rect(window.innerWidth - (window.innerWidth / 30), window.innerHeight - window.innerHeight / 3, window.innerWidth / 50, -window.innerHeight / 3)
    ctx.stroke()
    
    // Text
    ctx.fillStyle = 'rgb(171, 183, 183)'
    ctx.font = "16px trebuchet ms";
    ship.scanning ? null : ctx.fillText('Press TAB to scan', window.innerWidth / 100, window.innerHeight / 50)
    ctx.textAlign = "center"
    ctx.fillText('Shields', window.innerWidth - (window.innerWidth / 15) + window.innerWidth / 100, window.innerHeight / 3 - window.innerHeight / 100);
    ctx.fillText('Hull', window.innerWidth - (window.innerWidth / 10) + window.innerWidth / 100, window.innerHeight / 2 - window.innerHeight / 100);
    ctx.fillText('Phasers', window.innerWidth - (window.innerWidth / 30) + window.innerWidth / 100, window.innerHeight / 3 - window.innerHeight / 100);
    ctx.fillText('Torpedoes', window.innerWidth - (window.innerWidth / 17.5), window.innerHeight - window.innerHeight / 3 + window.innerHeight / 40);
    ctx.font = "28px trebuchet ms";
    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillText(ship.torpCount, window.innerWidth - (window.innerWidth / 17.5), window.innerHeight - window.innerHeight / 3 + window.innerHeight / 18);
    
    if (klingons[lockId]) {
        if (klingons[lockId].locked) {
            ctx.save()
            ctx.fillStyle = 'rgb(171, 183, 183)'
            ctx.font = "16px trebuchet ms";
            klingons[lockId].locked ? ctx.fillText(`${klingons[lockId].name} ${lockId + 1} ${klingons[lockId].shields <= 0 ? "Hull" : "Shields"}`, window.innerWidth / 2, window.innerHeight / 10) : null;
            klingons[lockId].locked ? ctx.fillText(`${Math.round((distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) / 6) * 1.60934)} million km away`, window.innerWidth / 2, window.innerHeight / 5) : null;
            ctx.fillStyle = 'rgb(200, 0, 0)'
            distBetweenPoints(ship.x, ship.y, klingons[lockId].x, klingons[lockId].y) <= 500 ? ctx.fillText(`<<Phasers Within Range>>`, window.innerWidth / 2, window.innerHeight / 6) : null;
            ctx.restore()
    
            // Klingon shield bar
            ctx.save()
            klingons[lockId].shields >= 0 ? ctx.fillStyle = `rgb(${255 - klingons[lockId].shields / 4}, ${klingons[lockId].shields / 4}, 0)` : ctx.fillStyle = 'black'  
            let grd = ctx.createLinearGradient(0, 135, 0, 0)
            grd.addColorStop(0, `rgb(${255 - klingons[lockId].shields / 4}, ${klingons[lockId].shields / 4}, 0)`);
            grd.addColorStop(0.25, 'rgb(171, 183, 183)');
            ctx.fillStyle = grd
            ctx.fillRect(
                window.innerWidth / 2 - innerWidth / 16, 
                window.innerHeight / 9, 
                klingons[lockId].shields <= 0 ? window.innerWidth / 4 * klingons[lockId].hull / 510 : window.innerWidth / 4 * klingons[lockId].shields / maxShields, 
                window.innerHeight / 30)
            ctx.strokeStyle = 'rgb(171, 183, 183)'
            ctx.rect(window.innerWidth / 2 - innerWidth / 16, window.innerHeight / 9, window.innerWidth / 8, window.innerHeight / 30)
            ctx.stroke()
            ctx.restore()
        }
    }
    
    if (planets[planetLockId].locked) {
        ctx.fillStyle = 'rgb(171, 183, 183)'
        ctx.font = "16px trebuchet ms";
        planets[planetLockId].locked ? ctx.fillText(`Locked on to ${planets[planetLockId].name}`, window.innerWidth / 2, window.innerHeight / 10) : null;
        planets[planetLockId].locked ? ctx.fillText(`${Math.round((distBetweenPoints(ship.x, ship.y, planets[planetLockId].x, planets[planetLockId].y) / 6) * 1.60934)} million km away`, window.innerWidth / 2, window.innerHeight / 5) : null;
        ctx.fillStyle = "rgb(0, 155, 255)"
        distBetweenPoints(ship.x, ship.y, planets[planetLockId].x + planets[planetLockId].width / 2, planets[planetLockId].y + planets[planetLockId].height / 2) < planets[planetLockId].width + 100 ? ctx.fillText(`<<Press R to Orbit ${planets[planetLockId].name}>>`, window.innerWidth / 2, window.innerHeight / 4) : null;

         // Planet Image
         planets[planetLockId].shields >= 0 ? ctx.fillStyle = `rgb(${255 - planets[planetLockId].shields / 4}, ${planets[planetLockId].shields / 4}, 0)` : ctx.fillStyle = 'black'  
         ctx.drawImage(planets[planetLockId].el, window.innerWidth / 2 - innerWidth / 32, window.innerHeight / 9, planets[planetLockId].el.width / 5.5, planets[planetLockId].el.height / 5.5)
         ctx.strokeStyle = "rgb(0, 155, 255)"
         ctx.lineWidth = 3
         ctx.rect(window.innerWidth / 2 - innerWidth / 32, window.innerHeight / 9, planets[planetLockId].el.width / 5.5, planets[planetLockId].el.height / 5.5)
         ctx.stroke()
    }

    ctx.save()
    ctx.font = "bold 36px sans-serif";
    ctx.strokeStyle = 'rgb(200, 0, 0)'
    alertMsg ? ctx.strokeText(alertMsg, window.innerWidth / 2, window.innerHeight / 4 + window.innerHeight / 33) : null;
    ctx.restore()
}