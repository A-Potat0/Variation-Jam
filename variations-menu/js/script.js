/**
 * Variation Menu
 * Pippin Barr
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "menu";

/**
 * Create the canvas
*/
function setup() {
    createCanvas(1000, 1000);
    menuSetup()
    colorMode(HSB)
}


/**
 * Display the menu or the current variation
*/
function draw() {

    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "wall-variation":
            wallDraw();
            break
        case "sky-variation":
            skyDraw();
            break;
        case "stamina_ball-variation":
            stamBallDraw();
            break;
    }
}


/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "wall-variation":
            wallMousePressed();
            break
        case "sky-variation":
            skyMousePressed();
            break;
        case "stamina_ball-variation":
            stamBallMousePressed();
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "wall-variation":
            wallKeyPressed(event);
            break
        case "sky-variation":
            skyKeyPressed(event);
            break;
        case "stamina_ball-variation":
            stamBallKeyPressed(event);
            break;
    }
}

