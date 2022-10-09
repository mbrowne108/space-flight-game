const FPS = 60
let scale = 1
let paused = false
let showPauseMenu = false
let dead = false

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.imageSmoothingEnabled = false;

// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

createAsteroids();
createKlingons();

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function alert(text) {
    alertMsg = text
    setTimeout(() => {alertMsg = '' }, 3000)
}

//   _____          __  __ ______   _      ____   ____  _____  
//  / ____|   /\   |  \/  |  ____| | |    / __ \ / __ \|  __ \ 
// | |  __   /  \  | \  / | |__    | |   | |  | | |  | | |__) |
// | | |_ | / /\ \ | |\/| |  __|   | |   | |  | | |  | |  ___/ 
// | |__| |/ ____ \| |  | | |____  | |___| |__| | |__| | |     
//  \_____/_/    \_\_|  |_|______| |______\____/ \____/|_|     
                                                           
                                                        
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

    if (!showPauseMenu && !dead) {
        setTimeout(() => {
            requestAnimationFrame(loop)
        }, 1000 / FPS)
    } else if (!showPauseMenu && dead) {
        drawDeathMenu();
    } else if (showPauseMenu && !dead) {
        drawPauseMenu()
    }
}

requestAnimationFrame(loop)