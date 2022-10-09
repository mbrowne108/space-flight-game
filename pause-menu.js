function drawPauseMenu() {
    ctx.fillStyle = 'rgba(108, 122, 137, 0.5)'
    ctx.textAlign = 'center'
    ctx.fillRect(window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, window.innerHeight / 2)
    ctx.strokeStyle = 'rgb(171, 183, 183)'
    ctx.lineWidth = 3
    ship.redAlert ? ctx.shadowColor = "rgba(200, 0, 0, 1)" : null
    ship.redAlert ? ctx.shadowBlur = 20 : null
    ctx.strokeRect(window.innerWidth / 4, window.innerHeight / 8, window.innerWidth / 2, window.innerHeight / 2)
    ship.redAlert ? ctx.shadowBlur = 0 : null
}