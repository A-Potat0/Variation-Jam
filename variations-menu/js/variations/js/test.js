/**
 * The stamina
 * Anthony Patient
 *
 * A stamina bar trying to survive
 */

"use strict";

/**
 * Create the canvas and the ball
 */
function setup() {
  // Create the canvas
  createCanvas(500, 500);
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

  // background(hue,100,100); // <-- use hue to make the ractangle change color
  
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

    
    // print(timeMesure)

}