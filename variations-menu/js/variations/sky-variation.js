/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */


let skyball = undefined;
let skygameStateLoss = false;

let sky_balls = [];
let skyRect = [];

function skySetup() {

    skyRect = [{
        x: 0, y: -500, size: { x: width, y: 850 }, number: 1,
    },
    {
        x: 0, y: 0, size: { x: 50, y: height }, number: 2,
    },
    {
        x: 0, y: 700, size: { x: width, y: 600 }, number: 3,
    },
    {
        x: 950, y: 0, size: { x: 600, y: height }, number: 4,
    }];

    // Create the skyball
    sky_balls = [];

    // skyball1 = skyCreateskyball();

    sky_balls.push(skyCreateskyball());
    sky_balls.push(skyCreateskyball());
    sky_balls.push(skyCreateskyball());
    sky_balls.push(skyCreateskyball());
    sky_balls.push(skyCreateskyball());

}

function skyDrawRect(skyRectangle) {
    push();
    noStroke();
    fill(0, 0, 100);
    rect(skyRectangle.x, skyRectangle.y, skyRectangle.size.x, skyRectangle.size.y);
    pop();

}

/**
 * Creates a random skyball
 */
function skyCreateskyball() {
    // Create a skyball object with appropriate properties
    const skyballball = {
        // Position and dimensions
        x: 150,
        y: 650,
        size: 10,
        // Colour
        fill1: random(150, 255),
        fill2: random(150, 255),
        // Movement
        velocity: {
            x: random(1, 3),
            y: random(-2, -4)
        }
    };
    return skyballball;
}


// /**
//  * This will be called every frame when the green variation is active
//  */
function skyDraw() {
    background("green");
    skyDrawCannon()

    for (let skyRectangle of skyRect) {
        skyDrawRect(skyRectangle);
        skycheckGameState(skyRectangle);
        // if (skygameStateLoss) {
        //     if (skyRectangle.number === 4) {
        //         skyRectangle.size.x += 100
        //     }
        // }
        if (frameCount % 2 === 0) {
            if (skyRectangle.number === 1) {
                skyCrushTop(skyRectangle);
            }
            // if (skyRectangle.number === 3) {
            //     skyCrushBottom(skyRectangle);
            // }
        }
    }

    for (skyball of sky_balls) {
        for (let skyRectangle of skyRect) {
            if (skyOverlapp(skyball, skyRectangle)) {
                if (skyRectangle.number === 1 || skyRectangle.number === 3) {
                    skyBounceskyballY(skyball, skyRectangle);
                }
                // if (skyRectangle.number === 2 || skyRectangle.number === 4) {
                //     skyBounceskyballX(skyball);
                // }
            }
        }
        skyMoveskyball(skyball);
        skyDrawskyball(skyball);
    }
    if (skygameStateLoss) {
        sky_balls = []
        textSize(100)
        text("GAME OVER", 200, 500)
    }
}

function skyDrawCannon() {
    push();
    noStroke();
    fill(0, 0, 0);
    rotate(137);
    rect(-590, 369, 30, -20);
    pop();

    push();
    noStroke();
    fill(0, 0, 10);
    circle(137, 690, 37);
    pop();

}


/**
 * Moves the skyball according to its velocity
 */
function skyMoveskyball(skyball) {
    skyball.x += skyball.velocity.x;
    skyball.y += skyball.velocity.y;
}

/**
 * Bounces the skyball off the walls
 */
// function skyBounceskyballX(skyball) {

//     skyball.velocity.x *= 1;
//     skyball.velocity.y *= 1;

//     // if (progressHue >= 1) {
//     //     targetHue = random(0, 360)
//     //     progressHue = 0;
//     // }

// }

function skyBounceskyballY(skyball, skyRectangle) {
    if (skyRectangle.number === 1) {
        skyball.velocity.y *= -1.5;
        skyball.velocity.x *= 1;
    }
    if (skyRectangle.number === 3) {
        skyball.velocity.y *= -0.1;
        skyball.velocity.x *= 1;
    }


    if (skyRectangle.number === 1) {
        if (skygameStateLoss) {
            skyRect[0].y -= 0;
            // skyRect[2].y += 0;
        }
        else {
            skyRect[0].y -= 10;
            // skyRect[2].y += 10;
        }
    }

    // if(skyRectangle.number === 1) {

    // }
    // if(skyRectangle.number === 3) {

    // }

    // if (progressHue >= 1) {
    //     targetHue = random(0, 360)
    //     progressHue = 0;
    // }

}
// function skyBounceskyballBottom(skyball,skyRectangle) {
//     skyball.velocity.y *= -0.9;
//     skyball.velocity.x *= 1.01;

//     skyRectangle.y += 10

//     if (progressHue >= 1){
//         targetHue = random(0,360)
//         progressHue = 0;
//     }

// }

function skyCrushTop(skyRectangle) {

    if (skygameStateLoss) {
        skyRectangle.y += map(skyRectangle.y, 100, -200, 20, 200)
    }
    else {
        skyRectangle.y += map(skyRectangle.y, -150, -600, 0.1, 12)
    }

}
// function skyCrushBottom(skyRectangle) {

//     if (skygameStateLoss) {
//         skyRectangle.y -= 10
//     }
//     else {
//         skyRectangle.y -= map(skyRectangle.y, 500, 1000, 0., 10)
//     }
// }

/**
 * Draw the skyball on the canvas
 */
function skyDrawskyball(skyball) {
    push();
    noStroke();
    fill(skyball.fill1, skyball.fill2);
    ellipse(skyball.x, skyball.y, skyball.size);
    pop();
}

function skyOverlapp(skyball, skyRectangle) {
    if (skyball.x + skyball.size / 2 > skyRectangle.x &&
        skyball.x - skyball.size / 2 < skyRectangle.x + skyRectangle.size.x &&
        skyball.y + skyball.size / 2 > skyRectangle.y &&
        skyball.y - skyball.size / 2 < skyRectangle.y + skyRectangle.size.y) {
        return true;
    }
    else {
        return false;
    }

}


/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function skyKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }

    sky_balls.push(skyCreateskyball());

    // if (skyball.velocity.y > 50) {
    //     skyball.velocity.x *= 0.9;
    //     skyball.velocity.y *= 0.8;
    // }
    // else if (skyball.velocity.y < 50) {
    //     skyball.velocity.x *= 1.02;
    //     skyball.velocity.y *= 1.2;
    // }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function skyMousePressed() {

    sky_balls.push(skyCreateskyball());

    // if (skyball.velocity.y > 50) {
    //     skyball.velocity.x *= 0.9;
    //     skyball.velocity.y *= 0.8;
    // }
    // else if (skyball.velocity.y < 50) {
    //     skyball.velocity.x *= 1.02;
    //     skyball.velocity.y *= 1.2;
    // }
}

function skycheckGameState(skyRectangle) {
    if (skyRectangle.number === 1) {
        if (skyRectangle.y > -225) {
            print("Game Over")
            skygameStateLoss = true
        }
    }
}