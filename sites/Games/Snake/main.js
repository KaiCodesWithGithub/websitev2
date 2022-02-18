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
    move: function (location) {
        if (game.isEmpty(location)) {
            snake.parts.unshift(location);
            snake.parts.pop();
        };
        if (game.isWall(location)) {
            return "gameover"
        };
        if (game.isFruit(location)) {
            snake.parts.unshift(location)
            game.score++
        }
        //if (game.auto = true) {
        //    for (var i = 0; i < 20; i++) {
        //        snake.parts.unshift(location)
        //    }
        //}
    }
};

var game = {
    board: {
        board1: [
            "###########################",
            "#                         #",
            "#                         #",
            "#            #            #",
            "#                         #",
            "#                         #",
            "#                         #",
            "#                         #",
            "#                #        #",
            "#     ####                #",
            "#     ####                #",
            "#            # #          #",
            "#           #####         #",
            "#            # #          #",
            "#           #####         #",
            "#            # #          #",
            "#                         #",
            "###########################"
        ],
        board2: [
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
        ]
    },
    auto: false,
    timer: null,
    score: 0,
    tickNumber: 0,
    tick: function () {
        window.clearTimeout(game.timer);
        game.tickNumber++;
        if (game.tickNumber % 10 == 0) {
            game.addRandomFruit();
        };
        var result = snake.move(snake.nextLocation());
        if (result == "gameover") {
            alert("Game over!");
            return
        };
        graphics.drawGame();
        game.timer = window.setTimeout("game.tick()", 500);
    },
    addRandomFruit: function () {
        var randomY = Math.floor(Math.random() * this.board.board1.length) + 0;
        var randomX = Math.floor(Math.random() * this.board.board1[randomY].length) + 0;
        var randomLocation = { x: randomX, y: randomY };
        if (game.isEmpty(randomLocation) && !game.isFruit(randomLocation)) {
            game.fruit.push(randomLocation);
        };
    },
    isEmpty: function (location) {
        return game.board.board1[location.y][location.x] == " ";
    },
    isWall: function (location) {
        return game.board.board1[location.y][location.x] == "#";
    },
    isFruit: function () {
        for (var fruitNumber = 0; fruitNumber < game.fruit.length; fruitNumber++) {
            var fruit = game.fruit[fruitNumber];
            for (var snakePart = 0; snakePart < snake.parts.length; snakePart++) {
                var part = snake.parts[snakePart];
                if (part.x == fruit.x && part.y == fruit.y) {
                    game.fruit.splice(fruitNumber, 1)
                    return true;
                }
            }

        }
    },
    fruit: [
        { x: 1, y: 1 }
    ]
};
var graphics = {
    canvas: document.getElementById('canvas'),
    squareSize: 30,
    drawboard: function (ctx) {
        var currentYoffset = 0;
        game.board.board1.forEach(function checkline(line) {
            line = line.split('');
            var currentXoffset = 0;
            line.forEach(function checkCharacter(character) {
                if (character == "#") {
                    ctx.fillStyle = "black";
                    ctx.fillRect(currentXoffset, currentYoffset, graphics.squareSize, graphics.squareSize);
                };
                currentXoffset += graphics.squareSize;
            });
            currentYoffset += graphics.squareSize;
        });
    },
    draw: function (ctx, source, colour) {
        source.forEach(function (part) {
            var partXlocation = part.x * graphics.squareSize;
            var partYlocation = part.y * graphics.squareSize;
            ctx.fillStyle = colour;
            ctx.fillRect(partXlocation, partYlocation, graphics.squareSize, graphics.squareSize)
        })
    },
    drawGame: function () {
        var ctx = graphics.canvas.getContext("2d");
        ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height)
        graphics.drawboard(ctx);
        graphics.draw(ctx, snake.parts, "green");
        graphics.draw(ctx, game.fruit, "red");
    },
};
graphics.drawGame();
var gameControl = {
    processInput: function (keyPressed, location) {
        var key = keyPressed.key.toLowerCase();
        var targetDirection = snake.facing;
        if (key == "w") targetDirection = "N";
        if (key == "a") targetDirection = "W";
        if (key == "s") targetDirection = "S";
        if (key == "d") targetDirection = "E";
        if (key == "e") {
            for (var snakePart = 0; snakePart < snake.parts.length; snakePart++) {
                var part = snake.parts[snakePart];
                part.x = location.x;
                part.y = location.y;
            }
        }
        snake.facing = targetDirection;
        game.tick();
    },
    combineInput: function (keyPressed) {
        gameControl.processInput(keyPressed, snake.nextLocation())
    },
    startGame: function () {
        window.addEventListener("keypress", gameControl.combineInput, false)
        game.tick();
    },
};
gameControl.startGame()
