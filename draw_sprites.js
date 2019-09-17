let paddleWidth = 100;
let rocket = new Image();
rocket.src = 'public/rocket.png';
let ship = new Image();
ship.src = 'public/saucerNew.png';
let planet = new Image();
planet.src = 'public/planet.png';
let flame = new Image();
flame.src = 'public/flame.png';
let ball = new Image();
ball.src = 'public/ball.png';
let explosion = new Image();
explosion.src = 'public/explosion.png';
let ballRadius = 20;
export const drawBall = (ctx, x, y) => {
    ctx.save();
    ctx.beginPath();
    ctx.drawImage(ball, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
    ctx.rotate(.25);



    ctx.closePath();
    ctx.restore();
}

export const drawPlanet = (ctx, canvas, planetOpacity) => {
    ctx.beginPath();
    ctx.globalAlpha = planetOpacity;
    ctx.drawImage(planet, canvas.width / 2 - 400, canvas.height - 70, canvas.width, 200);
    ctx.globalAlpha = 1;
    ctx.closePath();
};
export const drawFlame = (ctx2, explosionX, explosionY) => {
    ctx2.beginPath();

    ctx2.drawImage(flame, explosionX, explosionY, 100, 100);
    ctx2.globalAlpha = 1;
    ctx2.closePath();
};
export const drawExplosion = (ctx2, explosionX, explosionY) => {
    ctx2.beginPath();

    ctx2.drawImage(explosion, explosionX, explosionY, 100, 100);
    ctx2.globalAlpha = 1;
    ctx2.closePath();
};
export const drawBullet = (ctx, bullY, y, savePaddle, rockY, rockHeight, rockWidth) => {
    bullY = y;
    ctx.beginPath();
    ctx.drawImage(rocket, savePaddle, rockY, rockHeight, rockWidth);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

}
export const drawPaddle = (ctx, paddleX, shipHeight) => {
    ctx.beginPath();
    ctx.drawImage(ship, paddleX - paddleWidth / 2, shipHeight, paddleWidth, 50);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();
};