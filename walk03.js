let canvas;
let song;
let wave;
let waveDraw;
let analy;
let current = 0;
let sounds = [];


function preload() {
  sounds[0] = loadSound("img/audio00.m4a");
  sounds[1] = loadSound("img/audio01.m4a");
  sounds[2] = loadSound("img/audio02.m4a");
  sounds[3] = loadSound("img/audio03.mp3");
  sounds[4] = loadSound("img/audio04.wav");
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '0');
  canvas.style('pointer-events', 'none');

  sounds[0].setVolume(1);
  sounds[1].setVolume(1.5);
  sounds[2].setVolume(1.5);
  sounds[3].setVolume(0.9);
  sounds[4].setVolume(1.5);

  analy = new p5.Amplitude();
  wave = new p5.FFT();
  noFill();
  stroke(255,40);
  strokeWeight(0.5);
  //background(255, 0, 0);
}

function draw() {
  background(0, 0, 255, 5);

  let vol = analy.getLevel();
  let shake = map(vol, 0, 1, 0, 30);

  let e01 = document.getElementById('e01');
  let e02 = document.getElementById('e02');


  waveDraw = wave.waveform();

  for (let i = 0; i < 2; i++) {
    let y = i === 0 ? -height / 4 : height / 4;

    push();
    translate(0, height / 2 + y);

    for (let j = 0; j < 5; j++) {
      beginShape();
      for (let w = 0; w < waveDraw.length; w++) {
        let x = map(w, 0, waveDraw.length, 0, width);
        let y = map(waveDraw[w], -1, 1, 700, -700);

        x += random(-1, 1);
        y += random(-2, 2);

        curveVertex(x, y);
      }
      endShape();
    }

    pop();
  }
}

function mousePressed() {
  if (current < sounds.length) {
    if (!sounds[current].isPlaying()) {
      sounds[current].play();
    }
    current++;
  } else {
    for (let s of sounds) {
      if (s.isPlaying()) s.stop();
    }
    current = 0;
  }
}