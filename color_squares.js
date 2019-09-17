import {x, y} from './index';
const colPol = [];
const randColor = (min, max) => Math.random() * (max - min) + min;
const colors = ["red", "orange", "blue", "green"];
const arr = [];
// const mouse = { x: x, y: y };
export const requestParticles = function (n = 1, mouse) {
    for (let i = 0; i < n; i++) {
        if (colPol.length <= 0) break;

        const p = colPol.pop();
        p.x = mouse.x;
        p.y = mouse.y;
        p.vel.x = randColor(-1, 1);
        p.vel.y = randColor(-1, 1);
        p.speed = randColor(1, 4);
        p.size = randColor(5, 20);
        p.opacity = .5;
        p.squareDec = randColor(0.004, 0.01);
        arr.push(p);
    }
};

export const colPolFiller = function (n) {
    for (let i = 0; i < n; i++) {
        colPol.push({
            x: 0,
            y: 0,
            opacity: .5,
            squareDec: randColor(0.005, 0.02),
            size: randColor(5, 20),
            speed: randColor(1, 4),
            vel: {
                x: 1,
                y: 1,
            },
            color: colors[Math.round(Math.random() * colors.length)]
        });
    }
}

    export const update = function (canvas, ballMoving, mouse, ctx, difficulty) {
    if (ballMoving) if (colPol.length > 0) requestParticles(10, mouse);

    arr.forEach(p => {
        p.x += p.vel.x * p.speed;
        p.y += p.vel.y * p.speed;
        p.opacity -= p.squareDec;

        if (p.x + p.size >= canvas.width || p.x < 0) p.vel.x *= -1;
        if (p.y + p.size >= canvas.height || p.y < 0) p.vel.y *= -1;

        if (p.opacity <= 0) {
            const index = arr.indexOf(p);
            colPol.push(p);
            arr.splice(index, 1);
        }
    });
    arr.forEach(p => {

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        //    debugger;
        // console.log(x);
        // console.log(p.x)

        if (difficulty === 0) {
            ctx.fillRect((p.x), (p.y + 200), p.size, p.size);
            ctx.fillRect((p.x - 350), (p.y + 200), p.size, p.size);
            ctx.fillRect((p.x + 350), (p.y + 200), p.size, p.size);
            // ctx.fillRect((x), (p.y), p.size*2, p.size*2);
            // ctx.arc((newX + p.x), (p.y + newY) - (y), p.size, 0, Math.PI * 2);
            // ctx.fill();
        } else {
            ctx.fillRect((p.x), (p.y + 200), p.size, p.size);
            ctx.fillRect((p.x - 350), (p.y + 200), p.size, p.size);
            ctx.fillRect((p.x + 350), (p.y + 200), p.size, p.size);
            ctx.fillRect((canvas.width - 40), (p.y), p.size / 4, p.size / 2);
            ctx.fillRect((canvas.width / 2), (p.y), p.size / 4, p.size / 2);
        }
    });
    ctx.globalAlpha = 1;
};