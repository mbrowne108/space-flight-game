// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

createAsteroids();
spawnInitialKlingons();

const musicMainMenu = new Music("sounds/music/main-menu.mp3", 1)
const musicEarth = new Music("sounds/music/earth.mp3")

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

    if (distBetweenPoints(ship.x, ship.y, planets[2].x, planets[2].y) < 1000) {
        musicEarth.play()
        if (1 / distBetweenPoints(ship.x, ship.y, planets[2].x, planets[2].y) * 10 < 1) {
            musicEarth.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[2].x, planets[2].y) * 10
        } else {
            musicEarth.piece.volume = 1
        }
        
    } else {
        musicEarth.stop()
    }
    // ship.orbiting ? musicEarth.piece.volume = 1 : musicEarth.piece.volume = 1 / distBetweenPoints(ship.x, ship.y, planets[2].x, planets[2].y)

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