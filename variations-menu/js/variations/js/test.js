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


const rectangles = [
  {
    name: "left side",
    x: 0,
    y: 0,
    width: 100,
    height: 400
  },
  {
    name: "top side",
    x: 0,
    y: 0,
    width: 400,
    height: 100
  },
  {
    name: "right side",
    x: 300,
    y: 0,
    width: 100,
    height: 400
  },
  {
    name: "bottom side",
    x: 0,
    y: 300,
    width: 400,
    height: 100
  }
];

const ball = {
  x: 200,
  y: 200,
  size: 50,
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  
  for (let b of balls) {
    for (let r of rectangles) {
      if (checkOverlap(b, r)) {
        
      }
  }
    
  for (let r of rectangles) {
    rect(r.x, r.y, r.width, r.height);
  }
  
  ellipse(ball.x, ball.y, ball.size);
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


  const distanceX = dist(ball.x, ball.y, newRectangle.x, newRectangle.y);
  overlappX = (distanceX < ball.size / 2 + newRectangle.size / 2);

  const distanceY = dist(ball.x, ball.y, newRectangle.x, newRectangle.y);
  overlappY = (distanceY < ball.size / 2 + newRectangle.size / 2);


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


  // Check if the ball has reached the left or right
//   const bounceXL = (ball.x < 0);
//   const bounceXR = (ball.x > width);

  

  
  // Handle bouncing horizontally
  if (overlappX) {

    // CanvasX += 2
//   if (bounceXR) {
//     ball.velocity.x *= -1;
    
//   }
  // Handle bouncing vertically
  if (overlappY && timeMesure > 0) {

    // resizeCanvas(CanvasX, CanvasY)
    CanvasY += 1
    if (progressHue >= 1){
        targetHue = random(0,360)
        progressHue = 0;
    }
    
  }
  else if (overlappY && timeMesure <= 0) {
    if (ball.y == CanvasY) {
        ball.y = CanvasY /2
    }
    if (ball.y == 0) {
        ball.y = CanvasY /2
    }
  }
    
}



  const bounceX = (ball.x > CanvasX || ball.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (ball.y > CanvasY || ball.y < 0);


  // Check if the ball hit the corner
  const corner1 = (ball.x < 1 && ball.y < 1);
  const corner2 = (ball.x < 1 && ball.y > (CanvasY - 1) );
  const corner3 = (ball.x > (CanvasX - 1) && ball.y < 1);
  const corner4 = (ball.x > (CanvasX - 1) && ball.y > (CanvasY - 1));






const out = (ball.y > CanvasY + 10 || ball.y < -10 || ball.x > CanvasX + 10 || ball.x < -10);
  

  if (out) {
    ball.y = CanvasY / 2
    ball.x = CanvasX / 2

  }




    if(timeMesure > 0) {
    ball.velocity.y *= -0.9;
    ball.velocity.x *= 1.01;
  }
}



    // if (frameCount % 60 === 0) {
    //     resizeCanvas(CanvasX, CanvasY) // <--- change to a rectangle
    //     // CanvasX -= 10
    //     CanvasY = CanvasY -= CanvasY/20 + 1
    //     // progressHue = progressHue -= 0.2
    // }

    // if (frameCount % 2 === 0) {
    //     stamBallTime()
    // }

    
    // print(timeMesure)


  if(gameStateLoss){

  }
  else{
    
  }