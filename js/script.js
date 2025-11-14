/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// /**
//  * OH LOOK I DIDN'T DESCRIBE SETUP!!
// */
// function setup() {

// }


// /**
//  * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
// */
// function draw() {

// }

/**
 * Boingo
 * Pippin Barr
 *
 * A ball that bounces around on the canvas
 */

let ball1 = undefined; // Will create it with createBall()
let ball = undefined;
let CanvasX = 100;
let CanvasY = 400;
let timeMesure = 0.2;


let hue = 136;
let startHue = 121;
let targetHue = 0;
let progressHue = 0;
let randomProgressHue = 0.1;


let  balls = [];

/**
 * Create the canvas and the ball
 */
function setup() {
  // Create the canvas
  createCanvas(CanvasX, CanvasY);
  // Create the ball
  ball1 = createBall();

  balls.push (createBall());

  colorMode(HSB)
}

/**
 * Creates a random ball
 */
function createBall() {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: CanvasX/2,
    y: CanvasY/2,
    size: 10,
    // Colour
    fill1: random(0,255),
    fill2: random(150,255),
    // Movement
    velocity: {
      x: random(-1, 1),
      y: random(-10, 10)
    }
  };
  return newBall;
}

/**
 * Moves and draws the ball
 */
function draw() {
    hueManegment()

  background(hue,100,100); // <-- use hue to make the ractangle change color
  
    for (ball of balls) {
      moveBall(ball);
      bounceBall(ball);
      drawBall(ball);
    }

    if (frameCount % 60 === 0) {
        resizeCanvas(CanvasX, CanvasY) // <--- change to a rectangle
        // CanvasX -= 10
        CanvasY = CanvasY -= CanvasY/20 + 1
        // progressHue = progressHue -= 0.2
    }

    if (frameCount % 2 === 0) {
        time()
    }

    
    print(timeMesure)

}

/**
 * Moves the ball according to its velocity
 */
function moveBall(ball) {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(ball) {
  // Check if the ball has reached the left or right
//   const bounceXL = (ball.x < 0);
//   const bounceXR = (ball.x > width);
  const bounceX = (ball.x > CanvasX || ball.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (ball.y > CanvasY || ball.y < 0);
  
  // Check if the ball hit the corner
  const corner1 = (ball.x < 1 && ball.y < 1);
  const corner2 = (ball.x < 1 && ball.y > (CanvasY - 1) );
  const corner3 = (ball.x > (CanvasX - 1) && ball.y < 1);
  const corner4 = (ball.x > (CanvasX - 1) && ball.y > (CanvasY - 1));

  const out = (ball.y > CanvasY + 10 || ball.y < -10 || ball.x > CanvasX + 10 || ball.x < -10);
  
  // Handle bouncing horizontally
  if (bounceX) {
    ball.velocity.x *= -0.999;
    ball.velocity.y *= 1;
    // CanvasX += 2
    if (progressHue >= 1){
        targetHue = random(0,360)
        progressHue = 0;
    }

  }
//   if (bounceXR) {
//     ball.velocity.x *= -1;
    
//   }
  // Handle bouncing vertically
  if (bounceY && timeMesure > 0) {
    ball.velocity.y *= -0.9;
    ball.velocity.x *= 1.01;
    resizeCanvas(CanvasX, CanvasY)
    CanvasY += 1
    if (progressHue >= 1){
        targetHue = random(0,360)
        progressHue = 0;
    }
    
  }
  else if (bounceY && timeMesure <= 0) {
    if (ball.y == CanvasY) {
        ball.y = CanvasY /2
    }
    if (ball.y == 0) {
        ball.y = CanvasY /2
    }
  }
    


  if (out) {
    ball.y = CanvasY / 2
    ball.x = CanvasX / 2

  }


//   let hitCorner = false;
//   // Handle corners
//   if (corner1) {
//     ball.y = CanvasY / 2
//     ball.x = CanvasX / 2
//     // print(index);
//     hitCorner = true;
//   }
//   if (corner2) {
//     ball.y = CanvasY / 2
//     ball.x = CanvasX / 2
//     // print(index);
//     hitCorner = true;
//   }
//   if (corner3) {
//     ball.y = CanvasY / 2
//     ball.x = CanvasX / 2
//     // print(index);
//     hitCorner = true;
//   }
//   if (corner4) {
//     ball.y = CanvasY / 2
//     ball.x = CanvasX / 2
//     // print(index);
//     hitCorner = true;
//   }

//   if (hitCorner) {
//     // ball hit a corner
//     const index = balls.indexOf(ball);
//     print(index);
//   }

//   if (ball.size <= 0) {
//     ball.fill2 -= 1
//   }

}

/**
 * Draw the ball on the canvas
 */
function drawBall(ball) {
  push();
  noStroke();
  fill(ball.fill1, ball.fill2);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}

/**
 * adding balls by doing stuff
 */
function mousePressed() {
    ball.velocity.x *= 1.01;
    ball.velocity.y *= 1.2;

}

function keyPressed() {
    ball.velocity.x *= 1.01;
    ball.velocity.y *= 1.2;

}

function hueManegment() {
    progressHue = progressHue += randomProgressHue

    hue = lerp(startHue, targetHue, progressHue)

    if (progressHue >= 1) {
        startHue = targetHue;
        // targetHue = random(0,360);
        randomProgressHue = random(0.0005, 0.005);
    }
}

function time() {
    timeMesure = timeMesure -= 0.1
    if (timeMesure <= -0.2) {
        timeMesure = 0.5
    }
}