// This sketch is based on code work by Takawo Shunsuke:
// https://openprocessing.org/sketch/2134461

let cubes = [];

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    canvas.style('pointer-events', 'none');
    canvas.style('background-color', 'transparent');
  
  noFill();
  //stroke(255);
  noStroke();
  //ortho(-width / 2, width / 2, -height / 2, height / 2, -5000, 5000);
}

function draw() {
  clear();
  orbitControl();

  lights();
  translate(-width / 2, -height / 2);
  for (let i = 0; i < 5; i++) {
    let newCube = createNewCube();
    if (newCube !== null) {
      cubes.push(newCube);
    }
  }

  for (let cube of cubes) {
    cube.show();
  }
}

function createNewCube() {
  let offset = min(width, height) / 15;
  let radius = min(width, height) / 2 - offset/4;
  let centerX = width / 2;
  let centerY = height / 2;
  let x = random(width);
  let y = random(height);
  let d =
    (pow(noise((x / width) * 5, (y / height) * 5, frameCount / 400),5) *
      min(width, height)) /
    2;
  let distToCenter = dist(x, y, centerX, centerY);
  if (distToCenter + d / 2 > radius) {
    return null;
  }
  if(d < 1) return null;
  if (x - d / 2 < offset) {
    return null;
  }
  else if (x + d/2 > width - offset) {
    return null;
  }
  if (y - d / 2 < offset) {
    return null;
  }
  else if (y + d / 2 > height - offset) {
    return null;
  }

  let newCube = new Cube(x + d / 2, y + d / 2, d);

  for (let cube of cubes) {
    if (newCube.intersects(cube)) {
      return null;
    }
  }
  return newCube;
}

class Cube {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    noLights();
    //noStroke();
    
fill(0, 0, 255);
    stroke(1);
    push();
    translate(this.x, this.y, 0);
    box(this.size);
    pop();
  
  }

  intersects(other) {
    let distanceX = abs(this.x - other.x);
    let distanceY = abs(this.y - other.y);
    let minDistance = (this.size + other.size) / 2;
    return distanceX < minDistance && distanceY < minDistance;
  }
}
