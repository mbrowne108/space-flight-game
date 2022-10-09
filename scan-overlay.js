
let planetScanMode = false

const overlay = {
    el: document.getElementById("overlay"),
    show: false
}

function drawScanOverlay() {
    overlay.el.style.width = `${canvas.width / 6}px`
    overlay.el.innerHTML = ''
    ship.redAlert ? overlay.el.style.boxShadow = "0px 0px 50px rgb(255, 0, 0)" : overlay.el.style.boxShadow = ""
    
    const h1 = document.createElement('h1')
    const h5a = document.createElement('h5')
    const h5b = document.createElement('h5')
    const h5c = document.createElement('h5')
    h1.innerText = "Scanning System..."
    h5a.innerText = "Press Caps Lock to switch target types"
    h5b.innerText = "Click to lock target"
    h5c.innerText = "Q and E to rotate targets"
    overlay.el.appendChild(h1)
    overlay.el.appendChild(h5a)
    overlay.el.appendChild(h5b)
    overlay.el.appendChild(h5c)

    if (planetScanMode) {
        planets.map((planet, i) => {
            
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
                    planetLockId = i;
                    planets.forEach((pl, index) => {
                        if (planetLockId !== index) {
                            pl.locked = false
                        } else {
                            pl.locked = true
                            ship.orbiting = false
                        }
                    })
                }
            }
            dist.id = `${planet.name}-dist`
            dist.innerText = `${distConvert} million km away`
            overlay.el.appendChild(btn);
            btn.appendChild(dist);
        })   
    } else {
        klingons.map((klingon, i) => {
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