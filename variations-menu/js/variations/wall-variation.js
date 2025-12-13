/**
 * The stamina
 * Anthony Patient
 *
 * A stamina bar trying to survive
 */

"use strict";

let wallball = undefined;
let wallgameStateWin = false;
let wallgameStateLoss = false;
let randomWallPush = 10;
let keepTheGameAlive = 0;


let wall_balls = [];
let wallRect = [];

/**
 * Create the canvas and the wallball
 */
function wallSetup() {
    // Create the canvas
    wallRect = [{
        x: 0, y: -500, size: { x: width, y: 800 }, number: 1,
    },
    {
        x: -500, y: 0, size: { x: 800, y: height }, number: 2,
    },
    {
        x: 0, y: 700, size: { x: width, y: 800 }, number: 3,
    },
    {
        x: 700, y: 0, size: { x: 800, y: height }, number: 4,
    }];
    // Create the wallball
    wall_balls = [];

    // wallball1 = wallCreateball();

    wall_balls.push(wallCreateball());
    wall_balls.push(wallCreateball());
    wall_balls.push(wallCreateball());
    wall_balls.push(wallCreateball());
}

function wallDrawRect(wallRectangle) {
    push();
    noStroke();
    fill(0, 0, 100);
    rect(wallRectangle.x, wallRectangle.y, wallRectangle.size.x, wallRectangle.size.y);
    pop();

}

/**
 * Creates a random wallball
 */
function wallCreateball() {
    // Create a wallball object with appropriate properties
    const wallball = {
        // Position and dimensions
        x: CanvasX / 2,
        y: CanvasY / 2,
        size: 10,
        // Colour
        fill1: random(150, 255),
        fill2: random(150, 255),
        // Movement
        velocity: {
            x: random(-20, 20),
            y: random(-20, 20)
        }
    };
    return wallball;
}

/**
 * Moves and draws the wallball
 */
function wallDraw() {
    // wallHueManegment()

    background(hue, 100, 100); // <-- use hue to make the ractangle change color

    if (frameCount % 120 === 0) {
        WallRollRandomWallPush()
    }

    if (wallgameStateWin) {
        if (frameCount % 1 === 0) {
            wallRect[0].y += map(wallRect[0].y, -300, -800, 0.001, 1)
            wallRect[2].y -= map(wallRect[2].y, 500, 1000, 0.001, 1)
            wallRect[1].x += map(wallRect[1].x, -300, -800, 0.001, 1)
            wallRect[3].x -= map(wallRect[3].x, 500, 1000, 0.001, 1)
        }

    }

    WallSpeedUpBallProduction()

    for (let wallRectangle of wallRect) {
        wallDrawRect(wallRectangle);
        wallcheckGameState(wallRectangle);
        // if (wallgameStateWin) {
        //     // if (wallRectangle.number === 4) {
        //     //     wallRectangle.size.x += 100
        //     // }
        // }
    }

    for (wallball of wall_balls) {
        for (let wallRectangle of wallRect) {
            if (wallOverlapp(wallball, wallRectangle)) {
                if (wallRectangle.number === 1 || wallRectangle.number === 3) {
                    wallBounceballY(wallball, wallRectangle);
                }
                if (wallRectangle.number === 2 || wallRectangle.number === 4) {
                    wallBounceballX(wallball);
                }
            }
        }
        wallMoveball(wallball);
        wallDrawwallball(wallball);
        if (frameCount % 1 === 0) {
            wallCheckBallSpeed(wallball);
        }
    }
    if (wallgameStateWin) {
        textSize(100)
        text("YOU WIN", 280, 500)
    }
    if (wallgameStateLoss) {
        textSize(100)
        text("GAME OVER", 200, 500)
    }

}

/**
 * Moves the wallball according to its velocity
 */
function wallMoveball(wallball) {
    wallball.x += wallball.velocity.x;
    wallball.y += wallball.velocity.y;
}

function wallCheckBallSpeed(wallball) {
    if ((wallball.velocity.y < 1.5 && wallball.velocity.y > -1.5) && (wallball.velocity.x < 1.5 && wallball.velocity.x > -1.5)) {

        // ball hit a corner
        const index = wall_balls.indexOf(wallball);
        wall_balls.splice(index, 1);
    }
}

/**
 * Bounces the wallball off the walls
 */
function wallBounceballX(wallball) {

    wallball.velocity.x *= -0.8;
    wallball.velocity.y *= 0.95;

    if (wallgameStateWin) {
        wallRect[0].y -= 0;
        wallRect[2].y += 0;
        wallRect[1].x -= 0;
        wallRect[3].x += 0;
    }
    else {
        wallRect[0].y -= randomWallPush;
        wallRect[2].y += randomWallPush;
        wallRect[1].x -= randomWallPush;
        wallRect[3].x += randomWallPush;

    }


    // if (progressHue >= 1) {
    //     targetHue = random(0, 360)
    //     progressHue = 0;
    // }

}

function wallBounceballY(wallball, wallRectangle) {
    wallball.velocity.y *= -0.8;
    wallball.velocity.x *= 0.95;

    if (wallgameStateWin) {
        wallRect[0].y -= 0;
        wallRect[2].y += 0;
        wallRect[1].x -= 0;
        wallRect[3].x += 0;
    }
    else {
        wallRect[0].y -= randomWallPush;
        wallRect[2].y += randomWallPush;
        wallRect[1].x -= randomWallPush;
        wallRect[3].x += randomWallPush;

    }
    // if(wallRectangle.number === 1) {

    // }
    // if(wallRectangle.number === 3) {

    // }

    // if (progressHue >= 1) {
    //     targetHue = random(0, 360)
    //     progressHue = 0;
    // }

}
// function wallBounceballBottom(wallball,wallRectangle) {
//     wallball.velocity.y *= -0.9;
//     wallball.velocity.x *= 1.01;

//     wallRectangle.y += 10

//     if (progressHue >= 1){
//         targetHue = random(0,360)
//         progressHue = 0;
//     }

// }

function wallCrushTop(wallRectangle) {

    // if (wallgameStateWin) {
    //     wallRectangle.y += 10
    // }
    // else {
    //     wallRectangle.y += map(wallRectangle.y, -300, -800, 0.1, 10)
    // }

}
function wallCrushBottom(wallRectangle) {

    // if (wallgameStateWin) {
    //     wallRectangle.y -= 10
    // }
    // else {
    //     wallRectangle.y -= map(wallRectangle.y, 500, 1000, 0., 10)
    // }
}

/**
 * Draw the wallball on the canvas
 */
function wallDrawwallball(wallball) {
    push();
    noStroke();
    fill(wallball.fill1, wallball.fill2);
    ellipse(wallball.x, wallball.y, wallball.size);
    pop();
}

function wallOverlapp(wallball, wallRectangle) {
    if (wallball.x + wallball.size / 2 > wallRectangle.x &&
        wallball.x - wallball.size / 2 < wallRectangle.x + wallRectangle.size.x &&
        wallball.y + wallball.size / 2 > wallRectangle.y &&
        wallball.y - wallball.size / 2 < wallRectangle.y + wallRectangle.size.y) {
        return true;
    }
    else {
        return false;
    }

}

function WallRollRandomWallPush() {
    randomWallPush = random(6.5, 20)
}

function WallSpeedUpBallProduction() {
    keepTheGameAlive = map(wallRect[3].x, -500, 0, 0, 10)

    if (wallgameStateLoss) {
        if (frameCount % 1 === 0) {
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
            wall_balls.push(wallCreateball());
        }
    }
    else {
        if (keepTheGameAlive < 22.2) {
            if (frameCount % 30 === 0) {
                wall_balls.push(wallCreateball());
            }
        }
        else if (keepTheGameAlive > 24.8) {
            if (frameCount % 90 === 0) {
                wall_balls.push(wallCreateball());
            }
        }
        else {
            if (frameCount % 60 === 0) {
                wall_balls.push(wallCreateball());
            }
        }
    }


}

/**
 * adding wallballs by doing stuff
 */
function wallMousePressed() {

    wallRect[0].y -= 10;
    wallRect[2].y += 10;
    wallRect[1].x -= 10;
    wallRect[3].x += 10;
    // if (wallball.velocity.y > 50) {
    //     wallball.velocity.x *= 0.9;
    //     wallball.velocity.y *= 0.8;
    // }
    // else if (wallball.velocity.y < 50) {
    //     wallball.velocity.x *= 1.02;
    //     wallball.velocity.y *= 1.2;
    // }
}

function wallKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }


    // wallRect[0].y += 10;
    // wallRect[2].y -= 10;
    // wallRect[1].x += 10;
    // wallRect[3].x -= 10;

    wallRect[0].y += map(wallRect[0].y, -300, -800, 0.01, 50)
    wallRect[2].y -= map(wallRect[2].y, 500, 1000, 0.01, 50)
    wallRect[1].x += map(wallRect[1].x, -300, -800, 0.01, 50)
    wallRect[3].x -= map(wallRect[3].x, 500, 1000, 0.01, 50)


    // if (wallball.velocity.y > 50) {
    //     wallball.velocity.x *= 0.9;
    //     wallball.velocity.y *= 0.8;
    // }
    // else if (wallball.velocity.y < 50) {
    //     wallball.velocity.x *= 1.02;
    //     wallball.velocity.y *= 1.2;
    // }
}

// function wallHueManegment() {
//     progressHue = progressHue += randomProgressHue

//     hue = lerp(startHue, targetHue, progressHue)

//     if (progressHue >= 1) {
//         startHue = targetHue;
//         // targetHue = random(0,360);
//         randomProgressHue = random(0.0005, 0.005);
//     }
// }

// function wallTime() {
//   timeMesure = timeMesure -= 0.1
//   if (timeMesure <= -0.2) {
//     timeMesure = 0.5
//   }
// }

function wallcheckGameState(wallRectangle) {

    if (keepTheGameAlive < 20.6) {
        print("YOU WIN")
        wallgameStateWin = true
    }
    if (keepTheGameAlive > 28) {
        print("Game Over")
        wallgameStateLoss = true
    }

}