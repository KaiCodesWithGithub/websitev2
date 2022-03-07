var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player = new paddle(5, 200, 25, 100);
var ai = new paddle(610, 200, 25, 100);
var ball = {
    x: 320, y: 240, radius: 3, xSpeed: 2, ySpeed: 0,
    reverseX: function () {
        this.xSpeed *= -1;
    },
    reverseY: function () {
        this.ySpeed *= -1;
    },
};

function paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hasCollidedWith = function (ball) {
        var paddleLeftWall = this.x;
        var paddleRightWall = this.x + this.width;
        var paddleTopWall = this.y;
        var paddleBottomWall = this.y + this.height;
        if (ball.x > paddleLeftWall
            && ball.x < paddleRightWall
            && ball.y > paddleTopWall
            && ball.y < paddleBottomWall) {
            return true
        }
        return false
    }
    this.move = function (keyPressed) {
        var nextY = this.y;
        var key = keyPressed.key.toLowerCase();
        if (key == "w") nextY += 5
        if (key == "s") nextY -= 5
        //if (keycode == 40) {
        //    nextY += 5;
        //} else if (keycode == 38) {
        //    nextY -= 5;
        //}
        nextY = nextY < 0 ? 0 : nextY;
        nextY = nextY + this.height > 480 ? 480 - this.height : nextY;
    }
}

var render = {
    paddle: function (paddle) {
        ctx.fillStyle = 'white';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    },
    ball: function (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill()
    }
}

var game = {
    tick: function () {
        game.update()
        window.setTimeout("game.tick()", 1000 / 60);
        game.draw();
    },
    draw: function () {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 640, 480);
        render.paddle(ai);
        render.paddle(player);
        render.ball(ball)
    },
    update: function () {
        ball.x += ball.xSpeed;
        ball.y += ball.ySpeed;
        var collidedWithPlayer = player.hasCollidedWith(ball);
        var collidedWithAi = ai.hasCollidedWith(ball);
        if (collidedWithPlayer || collidedWithAi) {
            ball.reverseX();
        }
        // for (var keycode in heldDown) {
        //     player.move(keyPressed)
        // }
    },
}
        window.addEventListener("keypress", player.move, false)
game.tick()

