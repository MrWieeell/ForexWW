var xPos = 5;
var yPos = 5; // Initial x + y position for the robot.
var objectiveCoords = [[0, 0], [0, 10], [10, 0], [10, 10]];
var brokenDown = 0;
var facing = "left";
var directions = ["up", "right", "down", "left"];

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function logPosition() {
    sleep(1000);
    console.log(`My current co-ordinates are: ${xPos}, ${yPos}`);
    console.log(`I'm currently facing: ${facing}`);
    (brokenDown) ? console.log("I'm currently broken down.") : console.log("I'm currently functioning normally.");
    console.log();
}

function checkForBreakdown() {
    if(brokenDown) {
        return true;
    }

    if(Math.random() < 0.1) {
        brokenDown = 1;
        return true;
    }

    return false;
}

function turnRobot(facing) {
    return directions[(directions.indexOf(facing) + 1) % directions.length]
}

function selfRepair() {
    brokenDown = 0;
}

function moveLeft() {
    while(facing !== "left") {
        facing = turnRobot(facing);
        logPosition();
    }
    xPos--;
    if(xPos < 0) {
        xPos = 0;
    }

    if(checkForBreakdown()) {
        logPosition();
        selfRepair();
    };
}

function moveRight() {
    while(facing !== "right") {
        facing = turnRobot(facing);
        logPosition();
    }
    xPos++;
    if(xPos > 10) {
        xPos = 10;
    }

    if(checkForBreakdown()) {
        logPosition();
        selfRepair();
    };
}

function moveUp() {
    while(facing !== "up") {
        facing = turnRobot(facing);
        logPosition();
    }
    yPos--;
    if(yPos < 0) {
        yPos = 0;
    }

    if(checkForBreakdown()) {
        logPosition();
        selfRepair();
    }
}

function moveDown() {
    while(facing !== "down") {
        facing = turnRobot(facing);
        logPosition();
    }
    yPos++;
    if(yPos > 10) {
        yPos = 10;
    }

    if(checkForBreakdown()) {
        logPosition();
        selfRepair();
    };
}

for(let i = 0; i < objectiveCoords.length; i++) {
    while(objectiveCoords[i][0] < xPos) {
        moveLeft();
        logPosition();
    }

    while(objectiveCoords[i][0] > xPos) {
        moveRight();
        logPosition();
    }

    while(objectiveCoords[i][1] < yPos) {
        moveUp();
        logPosition();
    }

    while(objectiveCoords[i][1] > yPos) {
        moveDown();
        logPosition();
    }

    // We can assume at this point the robot is ontop of the objective, so we can ask the robot to return to the center now and then progress on to the next objective.

    while(objectiveCoords[i][0] < 5) {
        moveRight();
        objectiveCoords[i][0]++;
        logPosition();
    }

    while(objectiveCoords[i][0] > 5) {
        moveLeft();
        objectiveCoords[i][0]--;
        logPosition();
    }

    while(objectiveCoords[i][1] < 5) {
        moveDown();
        objectiveCoords[i][1]++;
        logPosition();
    }

    while(objectiveCoords[i][1] > 5) {
        moveUp();
        objectiveCoords[i][1]--;
        logPosition();
    }

    // The robot has now successfully gone to an objective and returned it to the center. After this loop, if you console.log(objectiveCoords); it would give you [[5, 5], [5, 5] [5, 5], [5, 5]]
}