const FPS = 60
let scale = 1

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

createAsteroids();
createKlingons();

function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Initial position of camera
const camera = {x: ship.x - (canvas.width / 2), y: ship.y - (canvas.height / 2)}
const cameraOffset = {x: canvas.width / 2 - ship.x, y: canvas.height / 2 - ship.y}

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

    drawOverlay();
    drawScanOverlay();
    drawStars();
    drawShip();
    drawKlingons();
    drawSun();
    planets.forEach(drawPlanet);
    drawAsteroids();

    storeLastShipPosition(ship.x, ship.y)

    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / FPS)
}

requestAnimationFrame(loop);