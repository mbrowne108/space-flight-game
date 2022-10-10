function drawPauseMenu() {
    grd = ctx.createLinearGradient(window.innerWidth / 1.5, 0, 0, 0)
    grd.addColorStop(0, 'rgba(108, 122, 137, 0.9)');
    grd.addColorStop(1, 'rgb(171, 183, 183, 0.9)');
    ctx.fillStyle = grd
    ctx.textAlign = 'center'
    ctx.fillRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.7)
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ship.redAlert ? ctx.shadowColor = "rgba(200, 0, 0, 1)" : null
    ship.redAlert ? ctx.shadowBlur = 20 : null
    ctx.strokeRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.7)
    ship.redAlert ? ctx.shadowBlur = 0 : null
    ctx.textAlign = "center"
    ctx.fillStyle = 'rgb(238, 238, 238)'
    ctx.font = '32px trebuchet ms'
    ctx.fillText("Controls", window.innerWidth / 2, window.innerHeight / 6 + 10)
    ctx.font = '24px trebuchet ms'

    ctx.textAlign = "right"
    ctx.fillText("Mouse", window.innerWidth / 2.1, window.innerHeight / 6 + 60)
    ctx.fillText("W", window.innerWidth / 2.1, window.innerHeight / 6 + 100)
    ctx.fillText("S", window.innerWidth / 2.1, window.innerHeight / 6 + 140)
    
    ctx.fillText("Left Click", window.innerWidth / 2.1, window.innerHeight / 6 + 190)
    ctx.fillText("Right Click", window.innerWidth / 2.1, window.innerHeight / 6 + 230)
    ctx.fillText("Space", window.innerWidth / 2.1, window.innerHeight / 6 + 270)

    ctx.fillText("Tab", window.innerWidth / 2.1, window.innerHeight / 6 + 320)
    ctx.fillText("A", window.innerWidth / 2.1, window.innerHeight / 6 + 360)
    ctx.fillText("Q and E", window.innerWidth / 2.1, window.innerHeight / 6 + 400)
    ctx.fillText("R", window.innerWidth / 2.1, window.innerHeight / 6 + 440)
    ctx.fillText("F", window.innerWidth / 2.1, window.innerHeight / 6 + 480)
    
    ctx.textAlign = "left"
    ctx.fillText("Aim Ship", window.innerWidth / 1.9, window.innerHeight / 6 + 60)
    ctx.fillText("Thrust", window.innerWidth / 1.9, window.innerHeight / 6 + 100)
    ctx.fillText("Brake", window.innerWidth / 1.9, window.innerHeight / 6 + 140)

    ctx.fillText("Fire Torpedoes", window.innerWidth / 1.9, window.innerHeight / 6 + 190)
    ctx.fillText("Fire Phasers (locked on)", window.innerWidth / 1.9, window.innerHeight / 6 + 230)
    ctx.fillText("Red Alert", window.innerWidth / 1.9, window.innerHeight / 6 + 270)

    ctx.fillText("Scan for targets", window.innerWidth / 1.9, window.innerHeight / 6 + 320)
    ctx.fillText("Switch scan mode", window.innerWidth / 1.9, window.innerHeight / 6 + 360)
    ctx.fillText("Cycle through targets", window.innerWidth / 1.9, window.innerHeight / 6 + 400)
    ctx.fillText("De-select target", window.innerWidth / 1.9, window.innerHeight / 6 + 440)
    ctx.fillText("Orbit Planet", window.innerWidth / 1.9, window.innerHeight / 6 + 480)

    ctx.font = '18px trebuchet ms'
    ctx.fillText("ESC to unpause", window.innerWidth - window.innerWidth / 2.45, window.innerHeight / 6)
}

function drawDeathMenu() {
    const img = document.getElementById("game-over")
    ctx.drawImage(img, window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 5/9 * (window.innerWidth / 2))
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ctx.strokeRect(window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 5/9 * (window.innerWidth / 2))
    ctx.textAlign = "center"
    ctx.strokeStyle = 'rgb(200, 0, 0)'
    ctx.font = "bold 88px trebuchet ms";
    ctx.strokeText("GAME", window.innerWidth / 2.5, window.innerHeight / 1.5)
    ctx.strokeText("OVER", window.innerWidth - window.innerWidth / 2.5 , window.innerHeight / 1.5)
}