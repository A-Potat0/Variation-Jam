/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
(R) wall VS balls
(G) cannon VS sky
(B) bouncy ball`

const infoText = `press "R" "G" or "B" 
to see if you can avoid
a CRUSHING defeat`

const moreInfoText = `mash your keyboard to stay alive and overcome the shallenges`

let testRect = []

function menuSetup() {
    testRect = [{
        x: 0, y: 0, size: { x: width, y: height * (1 / 4) },
    },
    {
        x: width * (3 / 4), y: 0, size: { x: width * (1 / 4), y: height },
    },
    {
        x: 0, y: height * (3 / 4), size: { x: width, y: height * (1 / 4) },
    },
    {
        x: 0, y: 0, size: { x: width * (1 / 4), y: height },
    }];
}

/**
 * Display the main menu
 */
function menuDraw() {
    background(0);

    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(menuText, width / 2, height / 2);
    textSize(24);
    text(infoText, width / 2, 350)
    textSize(16);
    text(moreInfoText, width / 2, 680)
    pop();

    for (let rectangle of testRect) {
        testDrawRect(rectangle);
    }
}

function testDrawRect(rectangle) {
    push();
    noStroke();
    fill(0, 0, 100);
    rect(rectangle.x, rectangle.y, rectangle.size.x, rectangle.size.y);
    pop();

}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 82:
            state = "wall-variation";
            wallSetup();
            break;

        case 71:
            state = "sky-variation";
            skySetup();
            break;

        case 66:
            state = "stamina_ball-variation";
            stamBallSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {

}