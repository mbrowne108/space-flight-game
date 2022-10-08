
let planetScanMode = true

const overlay = {
    el: document.getElementById("overlay"),
    show: false
}

function drawScanOverlay() {
    overlay.el.style.width = `${canvas.width / 6}px`
    ship.redAlert ? overlay.el.style.boxShadow = "0px 0px 50px rgb(255, 0, 0)" : overlay.el.style.boxShadow = ""

    if (planetScanMode) {
        planets.map((planet) => {
            if (!document.getElementById(`${planet.name}-btn`)) {
                const btn = document.createElement('button');
                const dist = document.createElement('p')
                const distConvert = (Math.round((distBetweenPoints(ship.x, ship.y, planet.x, planet.y) / 6) * 1.60934))
                btn.className = 'planet-btn'
                btn.id = `${planet.name}-btn`
                btn.innerText = planet.name + ' '
                btn.onclick = () => {
                    if (ship.scanning) {
                        const planetBtns = document.querySelectorAll('.planet-btn')
                        planetBtns.forEach((b) => b.classList.remove('highlighted'))
                        btn.classList.add('highlighted')
                        planets.forEach((pl) => {
                            btn.classList.add('highlighted')
                            pl.name !== planet.name ? pl.locked = false : pl.locked = !pl.locked
                        })
                    }
                }
                dist.id = `${planet.name}-dist`
                dist.innerText = `${distConvert} million km away`
                overlay.el.appendChild(btn);
                btn.appendChild(dist);
            } else {
                const distConvert = (Math.round((distBetweenPoints(ship.x, ship.y, planet.x, planet.y) / 6) * 1.60934))
                const dist = document.getElementById(`${planet.name}-dist`)
                dist.innerText = `${distConvert} million km away`
            }
        })
    } else {
        klingons.map((klingon, i) => {
            if (!document.getElementById(`${klingon.name}-${i + 1}-btn`)) {
                const btn = document.createElement('button');
                const dist = document.createElement('p')
                const distConvert = (Math.round((distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y) / 6) * 1.60934))
                btn.className = 'klingon-btn'
                btn.id = `${klingon.name}-${i + 1}-btn`
                btn.innerText = `${klingon.name} ${i + 1} `
                btn.onclick = () => {
                    if (ship.scanning) {
                        const klingonBtns = document.querySelectorAll('.klingon-btn');
                        klingonBtns.forEach((k) => k.classList.remove('highlighted'))
                        btn.classList.add('highlighted')
                        lockId = i;
                        klingons.forEach((kl, index) => lockId !== index ? kl.locked = false : kl.locked = true)
                    }
                }
                dist.id = `${klingon.name}-dist`
                dist.innerText = `${distConvert} million km away`
                overlay.el.appendChild(btn);
                btn.appendChild(dist);
            } else {
                const distConvert = Math.round((distBetweenPoints(ship.x, ship.y, klingon.x, klingon.y) / 6) * 1.60934)
                const dist = document.getElementById(`${klingon.name}-dist`)
                dist.innerText = `${distConvert} million km away`
            }
        })
    }

    // ctx.fillStyle = "red";
    // ctx.font = "15px serif";
    // ctx.fillText(`Ship: ${Math.round(ship.x)}, ${Math.round(ship.y)}`, 5, 15);
    // ctx.fillText(`Camera: ${Math.round(camera.x)}, ${Math.round(camera.y)}`, 5, 30);
    // ctx.fillText(`Crosshair: ${mouse.x}, ${mouse.y}`, 5, 45);
    // ctx.fillText(`Offset: ${Math.round(cameraOffset.x)}, ${Math.round(camera.y)}`, 5, 60);
    // ctx.fillText(`Dist between ${distBetweenPoints(ship.x, ship.y, sun.x, sun.y)}`, 5, 75);
    // ctx.fillText(`Shields:${ship.shields}`, 5, 90);
    // ctx.fillText(`Thrust X: ${ship.thrust.y}, Y: ${ship.thrust.x}`, 5, 105);
}