const flock = [];
let num = 200;
let alginSlider, cohesionSlider, separationSlider;



function setup() {
  createCanvas(1000, 400);
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  for (let i=0; i<num; i++) {
    flock[i] = new Boid(width/2, height/2);
  }
 
}


function draw() {
  background(50);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();

    boid.show();

  }

}