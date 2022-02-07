var squareSize = 30;

var snake = {
    parts: [
        { x: 4, y: 2 },
        { x: 3, y: 2 },
        { x: 2, y: 2 }
    ],
    facing: "E",
    nextLocation: function () {
        var snakeHead = snake.parts[0];
        var targetX = snakeHead.x;
        var targetY = snakeHead.y;
        targetY = snake.facing == "N" ? targetY - 1 : targetY;
        targetY = snake.facing == "S" ? targetY + 1 : targetY;
        targetX = snake.facing == "W" ? targetX - 1 : targetX;
        targetX = snake.facing == "E" ? targetX + 1 : targetX;
        return { x: targetX, y: targetY };
    },
    move: function () {
        var location = snake.nextLocation();
        if (game.isEmpty(location)) {
            snake.parts.unshift(location);
            snake.parts.pop();
        };
        if (game.isWall(location)) {
            return "gameover"
        };
    }
};

var game = {
    board: [
        "################",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "#     ####     #",
        "#     ####     #",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "#              #",
        "################"
    ],
    tickNumber: 0,
    tick: function () {
        window.clearTimeout(game.timer);
        game.tickNumber++;
        var result = snake.move();
        if (result == "gameover") {
            alert("Game over!");
            return
        };
        graphics.drawGame();
        game.timer = window.setTimeout("game.tick()", 500);
    },
    isEmpty: function(location) {
        return game.board[location.y][location.x] == " ";
    },
    isWall: function(location) {
        return game.board[location.y][location.x] == "#";
    }
};
var graphics = {
    canvas: document.getElementById('canvas'),
    squareSize: 30,
    drawboard: function (ctx) {
        var currentYoffset = 0;
        game.board.forEach(function checkline(line) {
            line = line.split('');
            var currentXoffset = 0;
            line.forEach(function checkCharacter(character) {
                if (character == "#") {
                    ctx.fillStyle = "black"
                    ctx.fillRect(currentXoffset, currentYoffset, graphics.squareSize, graphics.squareSize);
                };
                currentXoffset += graphics.squareSize;
            });
            currentYoffset += graphics.squareSize;
        });
    },
    drawSnake: function (ctx) {
        snake.parts.forEach(function drawPart(part) {
            var partXlocation = part.x * graphics.squareSize;
            var partYlocation = part.y * graphics.squareSize;
            ctx.fillStyle = "green";
            ctx.fillRect(partXlocation, partYlocation, graphics.squareSize, graphics.squareSize);
        });
    },
    drawGame: function () {
        var ctx = graphics.canvas.getContext("2d");
        ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height)
        graphics.drawboard(ctx);
        graphics.drawSnake(ctx);
    },
};
graphics.drawGame();
var gameControl = {
    processInput: function (keyPressed) {
        var key = keyPressed.key.toLowerCase();
        var targetDirection = snake.facing;
        if (key == "w") targetDirection = "N";
        if (key == "a") targetDirection = "W";
        if (key == "s") targetDirection = "S";
        if (key == "d") targetDirection = "E";
        snake.facing = targetDirection;
        game.tick();
    },
    startGame: function () {
        window.addEventListener("keypress", gameControl.processInput, false)
        game.tick();
    },
};
gameControl.startGame()