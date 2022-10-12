// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

createAsteroids();
spawnInitialKlingons();

const musicMainMenu = new Music("sounds/music/title-screen.mp3", 1)
const musicVenus = new Music(planets[1].music)
const musicEarth = new Music(planets[2].music)
const musicMars = new Music(planets[3].music)
const musicJupiter = new Music(planets[4].music)
const musicSaturn = new Music(planets[5].music)
const musicNeptune = new Music(planets[7].music)
const musicPluto = new Music(planets[8].music)

// function Sound(src, maxStreams = 1, vol = 1.0) {
//     this.streamNum = 0;
//     this.streams = [];
//     for (let i = 0; i < maxStreams; i++) {
//         this.streams.push(new Audio(src));
//         this.streams[i].volume = vol;
//     }
//     this.play = function() {
//         if (soundOn) {
//             this.streamNum = (this.streamNum + 1) % maxStreams;
//             this.streams[this.streamNum].play();
//         }
//     }
//     this.stop = function() {
//         this.streams[this.streamNum].pause();
//         this.streams[this.streamNum].currentTime = 0;
//     }
// }

function Music(src) {
    this.piece = new Audio(src);
    this.play = function() {
        if (soundOn) {
            this.piece.play()
        } else {
            this.piece.pause()
        }
    }
    this.stop = function() {
        this.piece.pause();
    }
}

//   _____          __  __ ______   _      ____   ____  _____  
//  / ____|   /\   |  \/  |  ____| | |    / __ \ / __ \|  __ \ 
// | |  __   /  \  | \  / | |__    | |   | |  | | |  | | |__) |
// | | |_ | / /\ \ | |\/| |  __|   | |   | |  | | |  | |  ___/ 
// | |__| |/ ____ \| |  | | |____  | |___| |__| | |__| | |     
//  \_____/_/    \_\_|  |_|______| |______\____/ \____/|_|     
                                                           
if (showMainMenu) requestAnimationFrame(menuLoop)

function loop() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    camera.x = ship.x - (canvas.width / 2)
    camera.y = ship.y - (canvas.height / 2)
    cameraOffset.x = canvas.width / 2 - ship.x
    cameraOffset.y = canvas.height / 2 - ship.y

    drawStars();
    
    ctx.save()
    ctx.translate(ship.x + cameraOffset.x, ship.y + cameraOffset.y);
    ctx.scale(scale, scale);
    ctx.translate(-(ship.x + cameraOffset.x), -(ship.y + cameraOffset.y));
        drawSun();
        planets.forEach(drawPlanet);
        drawAsteroids();
    ctx.restore();

    drawShip();
    drawKlingons();
    drawOverlay();



    if (distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) < 1000) {
        musicVenus.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) * 10 < 1) {
            musicVenus.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[1].x + planets[1].width / 2, planets[1].y + planets[1].height / 2) * 10
        } else {
            musicVenus.piece.volume = 1
        }
    } else {
        musicVenus.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) < 1000) {
        musicEarth.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) * 10 < 1) {
            musicEarth.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[2].x + planets[2].width / 2, planets[2].y + planets[2].height / 2) * 10
        } else {
            musicEarth.piece.volume = 1
        }
    } else {
        musicEarth.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) < 1000) {
        musicMars.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) * 10 < 1) {
            musicMars.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[3].x + planets[3].width / 2, planets[3].y + planets[3].height / 2) * 10
        } else {
            musicMars.piece.volume = 1
        }
    } else {
        musicMars.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) < 1000) {
        musicJupiter.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) * 10 < 1) {
            musicJupiter.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[4].x + planets[4].width / 2, planets[4].y + planets[4].height / 2) * 10
        } else {
            musicJupiter.piece.volume = 1
        }
    } else {
        musicJupiter.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) < 1000) {
        musicSaturn.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) * 10 < 1) {
            musicSaturn.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[5].x + planets[5].width / 2, planets[5].y + planets[5].height / 2) * 10
        } else {
            musicSaturn.piece.volume = 1
        }
    } else {
        musicSaturn.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) < 1000) {
        musicNeptune.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) * 10 < 1) {
            musicNeptune.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[7].x + planets[7].width / 2, planets[7].y + planets[7].height / 2) * 10
        } else {
            musicNeptune.piece.volume = 1
        }
    } else {
        musicNeptune.stop()
    }
    if (distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) < 1000) {
        musicPluto.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) * 10 < 1) {
            musicPluto.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[8].x + planets[8].width / 2, planets[8].y + planets[8].height / 2) * 10
        } else {
            musicPluto.piece.volume = 1
        }
    } else {
        musicPluto.stop()
    }










    if (!showPauseMenu && !dead && !showMainMenu) {
        setTimeout(() => {
            requestAnimationFrame(loop)
        }, 1000 / FPS)
    } else if (!showPauseMenu && dead) {
        drawDeathMenu();
    } else if (showPauseMenu && !dead) {
        drawPauseMenu();
    }
}

// requestAnimationFrame(loop)