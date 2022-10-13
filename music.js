function playMusic() {
    if (distBetweenPoints(ship.x, ship.y, planets[0].x + planets[0].width / 2, planets[0].y + planets[0].height / 2) < 500) {
        musicMercury.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[0].x + planets[0].width / 2, planets[0].y + planets[0].height / 2) * 10 < 1) {
            musicMercury.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[0].x + planets[0].width / 2, planets[0].y + planets[0].height / 2) * 10
        } else {
            musicMercury.piece.volume = 0.99
        }
    } else {
        musicMercury.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) < 700) {
        musicVenus.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) * 10 < 1) {
            musicVenus.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) * 10
        } else {
            musicVenus.piece.volume = 0.99
        }
    } else {
        musicVenus.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) < 1000) {
        musicEarth.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) * 10 < 1) {
            musicEarth.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) * 10
        } else {
            musicEarth.piece.volume = 0.99
        }
    } else {
        musicEarth.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) < 1000) {
        musicMars.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) * 10 < 1) {
            musicMars.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) * 10
        } else {
            musicMars.piece.volume = 0.99
        }
    } else {
        musicMars.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) < 2000) {
        musicJupiter.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) * 50 < 1) {
            musicJupiter.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) * 50
        } else {
            musicJupiter.piece.volume = 0.99
        }
    } else {
        musicJupiter.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) < 2000) {
        musicSaturn.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) * 50 < 1) {
            musicSaturn.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) * 50
        } else {
            musicSaturn.piece.volume = 0.99
        }
    } else {
        musicSaturn.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[6].x + planets[6].width / 2, planets[6].y + planets[6].height / 2) < 3000) {
        musicUranus.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[6].x + planets[6].width / 2, planets[6].y + planets[6].height / 2) * 20 < 1) {
            musicUranus.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[6].x + planets[6].width / 2, planets[6].y + planets[6].height / 2) * 20
        } else {
            musicUranus.piece.volume = 0.99
        }
    } else {
        musicUranus.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) < 3000) {
        musicNeptune.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) * 20 < 1) {
            musicNeptune.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) * 20
        } else {
            musicNeptune.piece.volume = 0.99
        }
    } else {
        musicNeptune.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) < 3000) {
        musicPluto.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) * 10 < 1) {
            musicPluto.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) * 10
        } else {
            musicPluto.piece.volume = 0.99
        }
    } else {
        musicPluto.stop()
    }
}