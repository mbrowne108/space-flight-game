const ship = {
    el: document.getElementById("ship"),
    elThrust: document.getElementById("ship-thrusting"),
    x: 2900,
    y: 2900,
    height: 50 * (4/3),
    width: 50,
    a: 90 / 180 * Math.PI,
    torpedoes: [],
    scans: [],
    thrusting: false,
    braking: false,
    firing: false,
    scanning: false,
    thrust: {
        x: 0,
        y: 0
    }
}

const torpedo = {
    el: document.getElementById("torpedo"),
    height: ship.height / 2,
    width: ship.width / 2,
    shadow: 'rgb(248,58,37)'
}