// This sketch is based on code work by Takawo Shunsuke:
// https://openprocessing.org/sketch/2187372

let offsetX = 0;
let offsetY = 0;
let zoom = 1;
let isDragging = false;
let prevMouseX, prevMouseY;



function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
    pixelDensity(2);

    angleMode(DEGREES);
}

function draw() {
    clear();
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(255);

    push();
    translate(width / 2 + offsetX, height / 2 + offsetY);
    scale(zoom);

    let r_max = (sqrt(2) * max(width, height)) / 2;
    for (let r = r_max; r > 0; r -= r_max / 5) {
        for (let angle = 0; angle < 360; angle += 5) {
            let r2 = sin(angle * r) * r;
            let x = cos(angle * sin(angle / 4)) * r2;
            let y = sin(angle * cos(angle / 3)) * r2;
            let n = noise(x / width * 10, y / height * 10);

            push();
            translate(x, y);
            rotate((r2 / r_max) * 90 + angle + frameCount * 0.5);
            let sx = sin(angle * 30 + (360 * r) / r_max) * 45.99;
            let sy = sin(angle * 5 + (360 * r) / r_max) * 45.999;
            shearX(sx);
            shearY(sy);

            textAlign(CENTER, CENTER);
            textFont("serif");
            textSize(abs(r2) / 5);
            translate(r / 5 / 2, 0);

            let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
            let c = chars.charAt(int(n * chars.length));
            fill('blue');
            text(c, 0, 0);
            pop();
        }
    }
    pop();

    let g = get();
    clear();
    blendMode(BLEND);
    background(0);

    let xStep = 5;
    for (let x = 0; x < width; x += xStep) {
        let gg = g.get(x, 0, xStep, height);
        let d = dist(x, 0, width / 2, 0) / (width / 2);
        d = map(sq(d), 0, 1, 0, 15);
        image(gg, x, 0);
    }

    let yStep = 5;
    for (let y = 0; y < height; y += yStep) {
        let gg = g.get(0, y, width, yStep);
        let d = dist(y, 0, height / 2, 0) / (height / 2);
        d = map(sq(d), 0, 1, 0, 15);
        image(gg, 0, y);
    }
}

function mouseWheel(event) {
    let zoomSensitivity = 0.001;
    zoom -= event.delta * zoomSensitivity;
    zoom = constrain(zoom, 0.1, 5);
    return false;
}

function mousePressed() {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    isDragging = true;
}

function mouseReleased() {
    isDragging = false;
}

function mouseDragged() {
    if (isDragging) {
        offsetX += mouseX - prevMouseX;
        offsetY += mouseY - prevMouseY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    }
}
