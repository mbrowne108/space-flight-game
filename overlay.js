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
    ship.shields >= 0 ? ctx.fillStyle = `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}` : ctx.fillStyle = 'black'
    let grd = ctx.createLinearGradient(0, 80, 0, 0)
    grd.addColorStop(0, `rgba(${255 - ship.shields / 4}, 0, ${ship.shields / 4}`);
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd
    ctx.fillRect(window.innerWidth / 2 - 380, 30, (ship.shields / maxShields) * 150, 40)

    // Phasers
    grd = ctx.createLinearGradient(0, 80, 0, 0)
    grd.addColorStop(0, 'rgb(200, 0, 0)');
    grd.addColorStop(1, "white");
    ctx.fillStyle = grd
    ctx.fillRect(window.innerWidth / 2 + 230, 30, (ship.phaserCharge / maxPhaserCharge) * 150, 40)

    // Outlines
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 2
    ctx.rect(window.innerWidth / 2 - 380, 30, 150, 40)
    ctx.stroke()
    ctx.rect(window.innerWidth / 2 + 230, 30, 150, 40)
    ctx.stroke()
    
    // Text
    ctx.fillStyle = 'rgb(171, 183, 183)'
    ctx.font = "18px trebuchet ms";
    ctx.textAlign = "center"
    ctx.fillText('Shields', window.innerWidth / 2 - 305, 20);
    ctx.fillText('Phasers', window.innerWidth / 2 + 305, 20);

    ship.scanning ? null : ctx.fillText('Press TAB to scan', window.innerWidth / 20, 30)

}