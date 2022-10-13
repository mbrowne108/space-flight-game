function addPlayer(player) {
    console.log(player)
}

function drawPauseMenu() {
    textRatio = window.innerWidth / 1920

    grd = ctx.createLinearGradient(window.innerWidth / 1.5, 0, 0, 0)
    grd.addColorStop(0, 'rgba(108, 122, 137, 0.9)');
    grd.addColorStop(1, 'rgb(171, 183, 183, 0.9)');
    ctx.fillStyle = grd
    ctx.textAlign = 'center'
    ctx.fillRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.6)
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ship.redAlert ? ctx.shadowColor = "rgba(200, 0, 0, 1)" : null
    ship.redAlert ? ctx.shadowBlur = 20 : null
    ctx.strokeRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.6)
    ship.redAlert ? ctx.shadowBlur = 0 : null
    ctx.textAlign = "center"
    ctx.fillStyle = 'rgb(238, 238, 238)'
    ctx.font = `${32 * textRatio}px trebuchet ms`
    ctx.fillText("Controls", window.innerWidth / 2, window.innerHeight / 6 + 10)
    ctx.font = `${24 * textRatio}px trebuchet ms`

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
    ctx.fillText("T", window.innerWidth / 2.1, window.innerHeight / 6 + 520)
    
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
    ctx.fillText("Transport passengers", window.innerWidth / 1.9, window.innerHeight / 6 + 520)

    ctx.font = `${18 * textRatio}px trebuchet ms`
    ctx.fillText("ESC to unpause", window.innerWidth - window.innerWidth / 2.45, window.innerHeight / 6.6)
}

function drawAboutMenu() {
    textRatio = window.innerWidth / 1920

    grd = ctx.createLinearGradient(window.innerWidth / 1.5, 0, 0, 0)
    grd.addColorStop(0, 'rgba(108, 122, 137, 0.9)');
    grd.addColorStop(1, 'rgb(171, 183, 183, 0.9)');
    ctx.fillStyle = grd
    ctx.textAlign = 'center'
    ctx.fillRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.6)
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ctx.strokeRect(window.innerWidth / 3, window.innerHeight / 8, window.innerWidth / 3, window.innerHeight / 1.6)
    ctx.textAlign = "center"
    ctx.fillStyle = 'rgb(238, 238, 238)'
    ctx.font = `${32 * textRatio}px trebuchet ms`
    ctx.fillText("About", window.innerWidth / 2, window.innerHeight / 6 + 10)
    ctx.font = `${24 * textRatio}px trebuchet ms`

    ctx.textAlign = "left"
    ctx.fillText("A small fleet of Klingon birds of prey have infiltrated", window.innerWidth / 2.85, window.innerHeight / 6 + 60)
    ctx.fillText("our solar system! The Enterprise is the only ship in the", window.innerWidth / 2.85, window.innerHeight / 6 + 100)
    ctx.fillText("area (of course), so you must travel to each planet in", window.innerWidth / 2.85, window.innerHeight / 6 + 140)
    ctx.fillText("this fully orbiting solar system to transport passengers", window.innerWidth / 2.85, window.innerHeight / 6 + 180)
    ctx.fillText("from each one back to Earth. Make sure you destroy", window.innerWidth / 2.85, window.innerHeight / 6 + 220)
    ctx.fillText("any Klingons along the way, as you can't use your ", window.innerWidth / 2.85, window.innerHeight / 6 + 260)
    ctx.fillText("transporters at red alert.", window.innerWidth / 2.85, window.innerHeight / 6 + 300)
    ctx.fillText("I think you'll find something interesting waiting for", window.innerWidth / 2.85, window.innerHeight / 6 + 360)
    ctx.fillText("you at each planet. Thanks for playing!", window.innerWidth / 2.85, window.innerHeight / 6 + 400)
    ctx.textAlign = "center"
    ctx.fillText("Created by Matt Browne - mbrowne108.github.io", window.innerWidth / 2, window.innerHeight / 6 + 500)


    // ctx.fillText("Tab", window.innerWidth / 2.1, window.innerHeight / 6 + 320)
    // ctx.fillText("A", window.innerWidth / 2.1, window.innerHeight / 6 + 360)
    // ctx.fillText("Q and E", window.innerWidth / 2.1, window.innerHeight / 6 + 400)
    // ctx.fillText("R", window.innerWidth / 2.1, window.innerHeight / 6 + 440)
    // ctx.fillText("F", window.innerWidth / 2.1, window.innerHeight / 6 + 480)
    // ctx.fillText("T", window.innerWidth / 2.1, window.innerHeight / 6 + 520)
    
    // ctx.textAlign = "left"
    // ctx.fillText("Aim Ship", window.innerWidth / 1.9, window.innerHeight / 6 + 60)
    // ctx.fillText("Thrust", window.innerWidth / 1.9, window.innerHeight / 6 + 100)
    // ctx.fillText("Brake", window.innerWidth / 1.9, window.innerHeight / 6 + 140)

    // ctx.fillText("Fire Torpedoes", window.innerWidth / 1.9, window.innerHeight / 6 + 190)
    // ctx.fillText("Fire Phasers (locked on)", window.innerWidth / 1.9, window.innerHeight / 6 + 230)
    // ctx.fillText("Red Alert", window.innerWidth / 1.9, window.innerHeight / 6 + 270)

    // ctx.fillText("Scan for targets", window.innerWidth / 1.9, window.innerHeight / 6 + 320)
    // ctx.fillText("Switch scan mode", window.innerWidth / 1.9, window.innerHeight / 6 + 360)
    // ctx.fillText("Cycle through targets", window.innerWidth / 1.9, window.innerHeight / 6 + 400)
    // ctx.fillText("De-select target", window.innerWidth / 1.9, window.innerHeight / 6 + 440)
    // ctx.fillText("Orbit Planet", window.innerWidth / 1.9, window.innerHeight / 6 + 480)
    // ctx.fillText("Transport passengers", window.innerWidth / 1.9, window.innerHeight / 6 + 520)

    ctx.font = `${18 * textRatio}px trebuchet ms`
    ctx.fillText("ENTER to return to menu", window.innerWidth - window.innerWidth / 2.55, window.innerHeight / 6.6)
}

function drawDeathMenu() {
    const img = document.getElementById("game-over")
    ctx.drawImage(img, window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 5/9 * (window.innerWidth / 2))
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ctx.strokeRect(window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 5/9 * (window.innerWidth / 2))
    ctx.textAlign = "center"
    ctx.strokeStyle = 'rgb(200, 0, 0)'
    ctx.font = `bold ${88 * textRatio}px trebuchet ms`
    ctx.strokeText("GAME", window.innerWidth / 2.5, window.innerHeight / 1.5)
    ctx.strokeText("OVER", window.innerWidth - window.innerWidth / 2.5 , window.innerHeight / 1.5)
}

function drawWinMenu() {
    const img = document.getElementById("win-screen")
    ctx.drawImage(img, window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 3/4 * (window.innerWidth / 2))
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ctx.strokeRect(window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, 3/4 * (window.innerWidth / 2))
    ctx.textAlign = "center"
    ctx.strokeStyle = "rgb(0, 155, 255)"
    ctx.font = `bold ${88 * textRatio}px trebuchet ms`
    ctx.strokeText("YOU", window.innerWidth / 2, window.innerHeight / 3.5)
    ctx.strokeText("WIN!", window.innerWidth - window.innerWidth / 2, window.innerHeight / 2.7)
}
