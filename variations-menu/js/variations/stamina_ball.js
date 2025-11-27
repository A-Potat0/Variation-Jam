/**
 * The stamina
 * Anthony Patient
 *
 * A stamina bar trying to survive
 */

"use strict";

let ball1 = undefined; // Will create it with createBall()
let ball = undefined;
let CanvasX = 1000;
let CanvasY = 1000;
let timeMesure = 0.2;
let overlappX = undefined;
let overlappY = undefined;
let gameStateLoss = false



let hue = 136;
let startHue = 121;
let targetHue = 0;
let progressHue = 0;
let randomProgressHue = 0.1;


let  balls = [];
let  newRect = []

/**
 * Create the canvas and the ball
 */
function stamBallSetup() {
  // Create the canvas
  newRect = [{
        x: 0, y: -500, size: { x: width, y: 800}, number: 1,
    },
    {
        x: 550, y: 0, size: { x: 600, y: height}, number: 2,
    },
    {
        x: 0, y: 700, size: { x: width, y: 800}, number: 3,
    },
    {
        x: 0, y: 0, size: { x: 450, y: height}, number: 4,
    }];
  // Create the ball
  balls = [];

  ball1 = stamBallCreateBall();

  balls.push (stamBallCreateBall());
}

function newDrawRect(newRectangle) {
    push();
    noStroke();
    fill(0, 0,100);
    rect(newRectangle.x, newRectangle.y, newRectangle.size.x, newRectangle.size.y);
    pop();
    
}

/**
 * Creates a random ball
 */
function stamBallCreateBall() {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: CanvasX/2,
    y: CanvasY/2,
    size: 10,
    // Colour
    fill1: random(150,255),
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
function stamBallDraw() {
    stamBallHueManegment()

  background(hue,100,100); // <-- use hue to make the ractangle change color
  
    for (let newRectangle of newRect) {
      newDrawRect(newRectangle);
      checkGameState(newRectangle);
      if(gameStateLoss){
        if(newRectangle.number === 4) {
          newRectangle.size.x += 100
        }
      }
      if (frameCount % 2 === 0) {
        if(newRectangle.number === 1) {
        stamBallCrushTop(newRectangle);
      }
      if(newRectangle.number === 3) {
        stamBallCrushBottom(newRectangle);
      }
      }
    }

    for (ball of balls) {
      for (let newRectangle of newRect) {
        if(stamBallOverlapp(ball,newRectangle)){
          if(newRectangle.number === 1 || newRectangle.number === 3) {
            stamBallBounceBallY(ball,newRectangle);
          }
          if(newRectangle.number === 2 || newRectangle.number === 4) {
            stamBallBounceBallX(ball);
          }
        }
      }
      stamBallMoveBall(ball);
      stamBallDrawBall(ball);
    }
  if(gameStateLoss){
    balls = []
    textSize(100)
    text("GAME OVER",200,500)
  }
}

/**
 * Moves the ball according to its velocity
 */
function stamBallMoveBall(ball) {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function stamBallBounceBallX(ball) {
  
  ball.velocity.x *= -0.999;
  ball.velocity.y *= 1;

  if (progressHue >= 1){
      targetHue = random(0,360)
      progressHue = 0;
   }

}

function stamBallBounceBallY(ball,newRectangle) {
    ball.velocity.y *= -0.9;
    ball.velocity.x *= 1.01;

  if(gameStateLoss){
    newRect[0].y -= 0;
    newRect[2].y += 0;
  }
  else{
    newRect[0].y -= 10;
    newRect[2].y += 10;
  }
    // if(newRectangle.number === 1) {
      
    // }
    // if(newRectangle.number === 3) {
      
    // }
    
    if (progressHue >= 1){
        targetHue = random(0,360)
        progressHue = 0;
    }

}
// function stamBallBounceBallBottom(ball,newRectangle) {
//     ball.velocity.y *= -0.9;
//     ball.velocity.x *= 1.01;

//     newRectangle.y += 10

//     if (progressHue >= 1){
//         targetHue = random(0,360)
//         progressHue = 0;
//     }

// }

function stamBallCrushTop(newRectangle){
  
  if(gameStateLoss){
    newRectangle.y += 10
  }
  else{
    newRectangle.y += map(newRectangle.y,-300,-800,0.1,10)
  }

}
function stamBallCrushBottom(newRectangle){
  
  if(gameStateLoss){
    newRectangle.y -= 10
  }
  else{
    newRectangle.y -= map(newRectangle.y,500,1000,0.,10)
  }
}

/**
 * Draw the ball on the canvas
 */
function stamBallDrawBall(ball) {
  push();
  noStroke();
  fill(ball.fill1, ball.fill2);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}

function stamBallOverlapp(ball,newRectangle){
  if (ball.x + ball.size/2 > newRectangle.x &&
     ball.x - ball.size/2 < newRectangle.x + newRectangle.size.x &&
     ball.y + ball.size/2 > newRectangle.y &&
     ball.y - ball.size/2 < newRectangle.y + newRectangle.size.y) {
    return true;
  }
  else {
    return false;
  }

}

/**
 * adding balls by doing stuff
 */
function stamBallMousePressed() {
  
  if (ball.velocity.y > 50){
    ball.velocity.x *= 0.9;
    ball.velocity.y *= 0.8;
  }
  else if (ball.velocity.y < 50){
    ball.velocity.x *= 1.02;
    ball.velocity.y *= 1.2;
  }
}

function stamBallKeyPressed(event) {
  if (event.keyCode === 27) {
        state = "menu";
    }

  if (ball.velocity.y > 50){
    ball.velocity.x *= 0.9;
    ball.velocity.y *= 0.8;
  }
  else if (ball.velocity.y < 50){
    ball.velocity.x *= 1.02;
    ball.velocity.y *= 1.2;
  }
}

function stamBallHueManegment() {
    progressHue = progressHue += randomProgressHue

    hue = lerp(startHue, targetHue, progressHue)

    if (progressHue >= 1) {
        startHue = targetHue;
        // targetHue = random(0,360);
        randomProgressHue = random(0.0005, 0.005);
    }
}

function stamBallTime() {
    timeMesure = timeMesure -= 0.1
    if (timeMesure <= -0.2) {
        timeMesure = 0.5
    }
}

function checkGameState(newRectangle){
  if(newRectangle.number === 1){
    if(newRectangle.y > -330){
      print("Game Over")
      gameStateLoss = true
    }
  }
}