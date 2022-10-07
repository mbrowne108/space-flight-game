
const overlay = {
    el: document.getElementById("overlay"),
    show: true
}

function drawOverlay() {
    overlay.el.style.display = "none;"
    // overlay.el.style.backgroundColor = "white"
    // overlay.el.style.width = `${canvas.width / 8}px`
    // overlay.el.style.height = `${canvas.height / 2}px`



    // const klingonLoc = document.createElement("h5");
    // klingonLoc.innerText = `X: ${klingon.x}, Y: ${klingon.y}`
    // overlay.el.appendChild(klingonLoc)

    ctx.fillStyle = "red";
    ctx.font = "15px serif";
    ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
    ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
    ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
    ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, 5, 60);
    ctx.fillText(`Dist between ${distBetweenPoints(ship.x, ship.y, sun.x, sun.y)}`, 5, 75);
    ctx.fillText(`Shields:${ship.shields}`, 5, 90);
    ctx.fillText(`Scale: ${scale}`, 5, 105);
}