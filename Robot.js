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
    console.log("My current co-ordinates are: " + xPos + ", " + yPos);
    console.log("I'm currently facing: " + facing);
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
        logPosition();
        facing = turnRobot(facing);
        sleep(1000);
    }
    xPos--;
    if(xPos < 0) {
        xPos = 0;
    }

    if(checkForBreakdown()) {
        logPosition();
        sleep(1000);
        selfRepair();
    };
}

function moveRight() {
    while(facing !== "right") {
        logPosition();
        facing = turnRobot(facing);
        sleep(1000);
    }
    xPos++;
    if(xPos > 10) {
        xPos = 10;
    }

    if(checkForBreakdown()) {
        logPosition();
        sleep(1000);
        selfRepair();
    };
}

function moveUp() {
    while(facing !== "up") {
        logPosition();
        facing = turnRobot(facing);
        sleep(1000);
    }
    yPos--;
    if(yPos < 0) {
        yPos = 0;
    }

    if(checkForBreakdown()) {
        logPosition();
        sleep(1000);
        selfRepair();
    }
}

function moveDown() {
    while(facing !== "down") {
        logPosition();
        facing = turnRobot(facing);
        sleep(1000);
    }
    yPos++;
    if(yPos > 10) {
        yPos = 10;
    }

    if(checkForBreakdown()) {
        logPosition();
        sleep(1000);
        selfRepair();
    };
}

for(let i = 0; i < 1; i++) {
    while(objectiveCoords[i][0] < xPos) {
        moveLeft();
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][0] > xPos) {
        moveRight();
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][1] < yPos) {
        moveUp();
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][1] > yPos) {
        moveDown();
        logPosition();
        sleep(1000);
    }

    // We can assume at this point the robot is ontop of the objective, so we can ask the robot to return to the center now and then progress on to the next objective.

    while(objectiveCoords[i][0] < 5) {
        moveRight();
        objectiveCoords[i][0]++;
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][0] > 5) {
        moveLeft();
        objectiveCoords[i][0]--;
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][1] < 5) {
        moveDown();
        objectiveCoords[i][1]++;
        logPosition();
        sleep(1000);
    }

    while(objectiveCoords[i][1] > 5) {
        moveUp();
        objectiveCoords[i][1]--;
        logPosition();
        sleep(1000);
    }

    // The robot has now successfully gone to an objective and returned it to the center. After this loop, if you console.log(objectiveCoords); it would give you [[5, 5], [5, 5] [5, 5], [5, 5]]
}