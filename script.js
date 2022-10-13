// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

createAsteroids();
spawnInitialKlingons();

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

const musicMainMenu = new Music("sounds/music/title-screen.mp3", 1)
const musicVenus = new Music(planets[1].music)
const musicEarth = new Music(planets[2].music)
const musicMars = new Music(planets[3].music)
const musicJupiter = new Music(planets[4].music)
const musicSaturn = new Music(planets[5].music)
const musicUranus = new Music(planets[6].music)
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

    playMusic();

    if (earth.passengers === totalPassengers) {
        win = true
    }

    if (!showPauseMenu && !dead && !showMainMenu && !win) {
        setTimeout(() => {
            requestAnimationFrame(loop)
        }, 1000 / FPS)
    } else if (!showPauseMenu && dead && !win) {
        drawDeathMenu();
    } else if (showPauseMenu && !dead && !win) {
        drawPauseMenu();
    } else if (!showPauseMenu && !dead && win) {
        drawWinMenu();
    }
}