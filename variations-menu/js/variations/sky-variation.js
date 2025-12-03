/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */


// let newRect = []

function skySetup() {

    newRect = [{
        x: 0, y: 0, size: { x: width, y: 350 }, number: 1,
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
}

function newDrawRect(newRectangle) {
    push();
    noStroke();
    fill(0, 0, 100);
    rect(newRectangle.x, newRectangle.y, newRectangle.size.x, newRectangle.size.y);
    pop();

}

// /**
//  * This will be called every frame when the green variation is active
//  */
function skyDraw() {
    background("green");

    for (newRectangle of newRect) {
        newDrawRect(newRectangle);
    }

}





/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function skyKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function skyMousePressed() {

}