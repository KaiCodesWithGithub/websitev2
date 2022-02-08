var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player = new paddle(5, 200, 25, 100);
var player = new paddle(5, 200, 25, 100);

function paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
function tick() {
    window.setTimeout("tick()", 1000/60);
}
function renderPaddle(paddle) {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
}
tick();
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 640, 480);
}