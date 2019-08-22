const colors = ["red", "orange", "blue", "green"];
const colPol = [];
const randColor = (min, max) => Math.random() * (max - min) + min;
export const requestParticles = function (n = 1) {
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
 

