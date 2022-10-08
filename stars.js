// Position stars
const stars = []
for (let i = 0; i < 4000; i++) {
    let star = {
        x: Math.random() * 7680,
        y: Math.random() * 4320,
        size: Math.random() + 1
    }
    stars.push(star)
}

function drawStars() {
    stars.map((star) => {
        ctx.fillStyle = `rgb(${(Math.random() * 10)+ 245}, ${(Math.random() * 10)+ 245}, ${(Math.random() * 10) + 200})`
        ctx.beginPath()
        ctx.fillRect(star.x, star.y, star.size, star.size)
    })
}