/**
 * The stamina
 * Anthony Patient
 *
 * A stamina bar trying to survive
 */

"use strict";

// let ball1 = undefined; // Will create it with createBall()
let ball = undefined;
let CanvasX = 1000;
let CanvasY = 1000;
// let timeMesure = 0.2;
// let overlappX = undefined;
// let overlappY = undefined;
let stamBallgameStateLoss = false;



let hue = 136;
let startHue = 121;
let targetHue = 0;
let progressHue = 0;
let randomProgressHue = 0.1;


let stamBall_balls = [];
let stamBallRect = [];

/**
 * Create the canvas and the ball
 */
function stamBallSetup() {
  // Create the canvas
  stamBallRect = [{
    x: 0, y: -500, size: { x: width, y: 800 }, number: 1,
  },
  {
    x: 550, y: 0, size: { x: 600, y: height }, number: 2,
  },
  {
    x: 0, y: 700, size: { x: width, y: 800 }, number: 3,
  },
  {
    x: 0, y: 0, size: { x: 450, y: height }, number: 4,
  }];
  // Create the ball
  stamBall_balls = [];

  // ball1 = stamBallCreateBall();

  stamBall_balls.push(stamBallCreateBall());
}

function stamBallDrawRect(stamBallRectangle) {
  push();
  noStroke();
  fill(0, 0, 100);
  rect(stamBallRectangle.x, stamBallRectangle.y, stamBallRectangle.size.x, stamBallRectangle.size.y);
  pop();

}

/**
 * Creates a random ball
 */
function stamBallCreateBall() {
  // Create a ball object with appropriate properties
  const stamBallBall = {
    // Position and dimensions
    x: CanvasX / 2,
    y: CanvasY / 2,
    size: 10,
    // Colour
    fill1: random(150, 255),
    fill2: random(150, 255),
    // Movement
    velocity: {
      x: random(-1, 1),
      y: random(-10, 10)
    }
  };
  return stamBallBall;
}

/**
 * Moves and draws the ball
 */
function stamBallDraw() {
  stamBallHueManegment()

  background(hue, 100, 100); // <-- use hue to make the ractangle change color

  for (let stamBallRectangle of stamBallRect) {
    stamBallDrawRect(stamBallRectangle);
    stamBallcheckGameState(stamBallRectangle);
    if (stamBallgameStateLoss) {
      if (stamBallRectangle.number === 4) {
        stamBallRectangle.size.x += 100
      }
    }
    if (frameCount % 2 === 0) {
      if (stamBallRectangle.number === 1) {
        stamBallCrushTop(stamBallRectangle);
      }
      if (stamBallRectangle.number === 3) {
        stamBallCrushBottom(stamBallRectangle);
      }
    }
  }

  for (ball of stamBall_balls) {
    for (let stamBallRectangle of stamBallRect) {
      if (stamBallOverlapp(ball, stamBallRectangle)) {
        if (stamBallRectangle.number === 1 || stamBallRectangle.number === 3) {
          stamBallBounceBallY(ball, stamBallRectangle);
        }
        if (stamBallRectangle.number === 2 || stamBallRectangle.number === 4) {
          stamBallBounceBallX(ball);
        }
      }
    }
    stamBallMoveBall(ball);
    stamBallDrawBall(ball);
  }
  if (stamBallgameStateLoss) {
    stamBall_balls = []
    textSize(100)
    text("GAME OVER", 200, 500)
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

  if (progressHue >= 1) {
    targetHue = random(0, 360)
    progressHue = 0;
  }

}

function stamBallBounceBallY(ball, stamBallRectangle) {
  ball.velocity.y *= -0.9;
  ball.velocity.x *= 1.01;

  if (stamBallgameStateLoss) {
    stamBallRect[0].y -= 0;
    stamBallRect[2].y += 0;
  }
  else {
    stamBallRect[0].y -= 10;
    stamBallRect[2].y += 10;
  }
  // if(stamBallRectangle.number === 1) {

  // }
  // if(stamBallRectangle.number === 3) {

  // }

  if (progressHue >= 1) {
    targetHue = random(0, 360)
    progressHue = 0;
  }

}
// function stamBallBounceBallBottom(ball,stamBallRectangle) {
//     ball.velocity.y *= -0.9;
//     ball.velocity.x *= 1.01;

//     stamBallRectangle.y += 10

//     if (progressHue >= 1){
//         targetHue = random(0,360)
//         progressHue = 0;
//     }

// }

function stamBallCrushTop(stamBallRectangle) {

  if (stamBallgameStateLoss) {
    stamBallRectangle.y += 10
  }
  else {
    stamBallRectangle.y += map(stamBallRectangle.y, -300, -800, 0.1, 10)
  }

}
function stamBallCrushBottom(stamBallRectangle) {

  if (stamBallgameStateLoss) {
    stamBallRectangle.y -= 10
  }
  else {
    stamBallRectangle.y -= map(stamBallRectangle.y, 500, 1000, 0., 10)
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

function stamBallOverlapp(ball, stamBallRectangle) {
  if (ball.x + ball.size / 2 > stamBallRectangle.x &&
    ball.x - ball.size / 2 < stamBallRectangle.x + stamBallRectangle.size.x &&
    ball.y + ball.size / 2 > stamBallRectangle.y &&
    ball.y - ball.size / 2 < stamBallRectangle.y + stamBallRectangle.size.y) {
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

  if (ball.velocity.y > 50) {
    ball.velocity.x *= 0.9;
    ball.velocity.y *= 0.8;
  }
  else if (ball.velocity.y < 50) {
    ball.velocity.x *= 1.02;
    ball.velocity.y *= 1.2;
  }
}

function stamBallKeyPressed(event) {
  if (event.keyCode === 27) {
    state = "menu";
  }

  if (ball.velocity.y > 50) {
    ball.velocity.x *= 0.9;
    ball.velocity.y *= 0.8;
  }
  else if (ball.velocity.y < 50) {
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

// function stamBallTime() {
//   timeMesure = timeMesure -= 0.1
//   if (timeMesure <= -0.2) {
//     timeMesure = 0.5
//   }
// }

function stamBallcheckGameState(stamBallRectangle) {
  if (stamBallRectangle.number === 1) {
    if (stamBallRectangle.y > -330) {
      print("Game Over")
      stamBallgameStateLoss = true
    }
  }
}