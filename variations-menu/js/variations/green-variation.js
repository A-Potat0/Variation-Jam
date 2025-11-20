/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * This will be called just before the green variation starts
 */


// let  newRect = []

function greenSetup() {

//     newRect = [{
//         x: 0, y: 0, size: { x: width, y: 300},
//     },
//     {
//         x: 550, y: 0, size: { x: 600, y: height},
//     },
//     {
//         x: 0, y: 700, size: { x: width, y: 600},
//     },
//     {
//         x: 0, y: 0, size: { x: 450, y: height},
//     }];
}

// /**
//  * This will be called every frame when the green variation is active
//  */
function greenDraw() {
    background("green");

//     for (newRectangle of newRect) {
//       newDrawRect(newRectangle);
//     }

}

// // function testCreateRectangle() {
// //   const newRectangle = {
// //     // Position and dimensions
// //     x: 0,
// //     y: 0,
// //     size: {
// //       x: 500,
// //       y: 300,
// //     },
// //     // Colour
// //     fill1: 255,
// //     fill2: 255,
// //     // Movement
// //     velocity: {
// //       x: random(-1, 1),
// //       y: random(-10, 10)
// //     },
// //   };
// //   return newRectangle;    
// // }

// function newDrawRect(newRectangle) {
//     push();
//     noStroke();
//     fill(255, 255,255);
//     rect(newRectangle.x, newRectangle.y, newRectangle.size.x, newRectangle.size.y);
//     pop();
    
// }








/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {

}