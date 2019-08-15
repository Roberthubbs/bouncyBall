/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let speed = 4;\nlet rocket = new Image();\nlet paddleInc = 7;\nrocket.src = 'public/rocket.png';\nlet ship = new Image();\nship.src = 'public/saucerNew.png';\nlet planet = new Image();\nplanet.src = 'public/planet.png';\nlet flame = new Image();\nflame.src = 'public/flame.png';\nlet difficulty = 0;\ndocument.addEventListener('DOMContentLoaded', () => {\n    \n    const canvas = document.getElementById(\"myCanvas\");\n\n\n    canvas.addEventListener('click', () => { \n    \n    const canvas = document.getElementById(\"myCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n    let x = canvas.width/2;\n    let y = canvas.height-290;\n    let rockHeight = 20;\n    let rockWidth = 17;\n    const colors = [\"red\", \"orange\", \"blue\", \"green\"];\n    const easCol = [\"white\"]\n    const randColor = (min, max) => Math.random() * (max-min) + min;\n    const colPol = [];\n    const arr = [];\n    let newX = speed;\n    let newY = -speed;\n    let ballRadius = 10;\n    let paddleWidth = 75;\n    let paddleHeight = 10;\n    let paddleX = (canvas.width-paddleWidth)/2;\n    let planetOpacity = 1;\n    let rightPress = false;\n    let leftPress = false;\n    const shipHeight = canvas.height - 270;\n    const bullRadius = 2;\n    let brickRowCount;\n    let savePaddle;\n    let bullY;\n    let rockY = canvas.height-30;\n    let gameOver = document.getElementById('gameover')\n     if (difficulty === 0){\n         brickRowCount = 3;\n     } else if (difficulty === 1){\n         brickRowCount = 4;\n     }\n     else if (difficulty === 2){\n         brickRowCount = 5;\n     };\n     let containsBrick = [];\n    let brickColumnCount = 5;\n    let brickWidth = 140;\n    let brickHeight = 40;\n    let brickPadding = 10;\n    let brickOffsetTop = 50;\n    let brickOffsetLeft = 30;\n    let bricks = [];\n    let score = 0;\n    let lives = 3;\n    let ballMoving = false;\n    let spacePress = false;\n    let bulletMoving = false;\n    const mouse = { x: x, y: y};\n    for (let i = 0; i < brickColumnCount; i++){\n        bricks[i] = [];\n        for (let j = 0; j < brickRowCount; j++){\n            // if((i + j) % 3 === 0 ){\n                bricks[i][j] = {x: 0, y: 0, val: 1}\n            \n        }\n    };\n   \n\n\n\n    const colPolFiller = function (n) {\n        for (let i = 0; i < n; i++) {\n            colPol.push({\n                x: 0,\n                y: 0,\n                opacity: .5,\n                squareDec: randColor(0.005, 0.02),\n                size: randColor(5, 20),\n                speed: randColor(1, 4),\n                vel: {\n                    x: 1,\n                    y: 1,\n                },\n                color: colors[Math.round(Math.random() * colors.length)]\n            });\n        }\n    }\n    const requestParticles = function (n = 1) {\n        for (let i = 0; i < n; i++) {\n            if (colPol.length <= 0) break;\n\n            const p = colPol.pop();\n            p.x = mouse.x;\n            p.y = mouse.y;\n            p.vel.x = randColor(-1, 1);\n            p.vel.y = randColor(-1, 1);\n            p.speed = randColor(1, 4);\n            p.size = randColor(5, 20);\n            p.opacity = .5;\n            p.squareDec = randColor(0.004, 0.01);\n            arr.push(p);\n        }\n    };\n\n    const update = function () {\n        if (ballMoving) if (colPol.length > 0) requestParticles(10);\n\n        arr.forEach(p => {\n            p.x += p.vel.x * p.speed;\n            p.y += p.vel.y * p.speed;\n            p.opacity -= p.squareDec;\n\n            if (p.x + p.size >= canvas.width || p.x < 0) p.vel.x *= -1;\n            if (p.y + p.size >= canvas.height || p.y < 0) p.vel.y *= -1;\n\n            if (p.opacity <= 0) {\n                const index = arr.indexOf(p);\n                colPol.push(p);\n                arr.splice(index, 1);\n            }\n        });\n    };\n\n   function drawScore(){\n       ctx.font = '16px Helvetica';\n       ctx.fillStyle = \"green\";\n       ctx.fillText(\"Score: \" + score, 8, 20) \n   };\n   function drawLives(){\n       ctx.font = '16px Helvetica';\n       ctx.fillStyle = \"red\";\n       ctx.fillText(\"Balls Remaining: \" + lives, 8, 40);\n   };\n   function drawGameOver(){\n       ctx.font = \"30px Verdana\";\n       // Create gradient\n       ctx.fillStyle = \"red\"\n       ctx.fillText(\"Game Over Maaaaan\", canvas.width/2, canvas.height/2);\n       \n   }\n    function drawBricks(){\n        for (let i = 0; i < brickColumnCount; i++) {\n            for (let j = 0; j < brickRowCount; j++) {\n                \n                if(bricks[i][j].val === 1 && (i+j) !== 5 ){\n                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;\n                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;\n                bricks[i][j].x = brickX;\n                bricks[i][j].y = brickY;\n                ctx.beginPath();\n                ctx.rect(brickX, brickY, brickWidth, brickHeight);\n                ctx.fillStyle = (difficulty === 0) ? easCol[0] : \"red\";\n                ctx.fill();\n                ctx.closePath();\n                } \n                else if (bricks[i][j].val === 1 && (i + j) === 5 ){\n                    let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;\n                    let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;\n                    bricks[i][j].x = brickX;\n                    bricks[i][j].y = brickY;\n                    bricks[i][j].val = 1\n                    ctx.beginPath();\n                    ctx.rect(brickX+30, brickY+20, brickWidth/2, brickHeight/2);\n                    ctx.fillStyle = (difficulty === 0) ? easCol[0] : \"red\";\n                    ctx.fill();\n                    ctx.closePath();\n                }\n            }\n        }\n    }\n    \n    function keyDownHandler(e){\n        if (e.key == \"Right\" || e.key == \"ArrowRight\"){\n            ballMoving = true;\n            rightPress = true;\n        }\n        if (e.key == \"Left\" || e.key == \"ArrowLeft\"){\n            ballMoving = true;\n            leftPress = true;\n        }\n        if (e.key == \"a\" && lives < 3){\n            bulletMoving = true;\n            spacePress = true;\n            savePaddle = paddleX;\n        }\n    };\n    function keyUpHandler(e){\n        if (e.key == \"Right\" || e.key == \"ArrowRight\"){\n            ballMoving = false;\n            rightPress = false;\n        }\n        if (e.key == \"Left\" || e.key == \"ArrowLeft\"){\n            ballMoving = false;\n            leftPress = false;\n        }\n        \n    };\n    function detectCollision() {\n        for (var c = 0; c < brickColumnCount; c++) {\n            for (var r = 0; r < brickRowCount; r++) {\n                var b = bricks[c][r];\n                if (b.val == 1 && (c + r) !== 5) {\n                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {\n                        newY = -newY;\n                        b.val = 0;\n                        score++;\n                        if (score == brickRowCount * brickColumnCount) {\n                            difficulty++;\n                             drawGameOver();\n                            \n                        }\n                    } else if (savePaddle > b.x && savePaddle < b.x + brickWidth && rockY > b.y && rockY < b.y + brickHeight){\n                        b.val = 0;\n                        score++;\n                        bulletMoving = false;\n                        rockY = canvas.height - 30;\n                        if (score == brickRowCount * brickColumnCount) {\n                            difficulty++;\n                        drawGameOver();\n\n                        }\n                    }\n                } else if (b.val === 1 && (c+r) === 5){\n                    if (x > b.x+30 && x < b.x+30 + brickWidth/2 && y > b.y+20 && y < b.y+20 + brickHeight/2){\n                        b.val=0;\n                        score++;\n                        if (score == brickRowCount * brickColumnCount) {\n                            difficulty++;\n                            drawGameOver();\n\n                        };\n                    } \n                }\n            }\n        }\n    }\n    \n    \n    document.addEventListener(\"keydown\", keyDownHandler, false);\n    document.addEventListener(\"keyup\", keyUpHandler, false);\n    \n    function drawBall(){\n        \n        ctx.beginPath();\n        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);\n        ctx.fillStyle = \"red\";\n        ctx.fill();\n        ctx.closePath();\n    }\n    function drawPlanet(){\n        ctx.beginPath();\n        ctx.globalAlpha = planetOpacity;\n        ctx.drawImage(planet, canvas.width/2-400, canvas.height-70, canvas.width, 200);\n        ctx.globalAlpha = 1;\n        ctx.closePath();\n    };\n    function drawFlame(){\n        ctx.beginPath();\n        \n        ctx.drawImage(flame, x, y+200, 200, 200);\n        ctx.globalAlpha = 1;\n        ctx.closePath();\n    };\n    function drawBullet(){\n            bullY = y;\n            ctx.beginPath();\n            ctx.drawImage(rocket, savePaddle, rockY, rockHeight, rockWidth);\n            ctx.fillStyle = \"yellow\";\n            ctx.fill();\n            ctx.closePath();\n        \n    }\n    function drawPaddle(){\n        ctx.beginPath();\n        ctx.drawImage(ship, paddleX, shipHeight, paddleWidth, 50 );\n        ctx.fillStyle = \"orange\";\n        ctx.fill();\n        ctx.closePath();\n    }\n   function draw(){\n       if (lives){\n\n       ctx.clearRect(0, 0, canvas.width, canvas.height);\n       \n       drawBall();\n       update();\n        drawPaddle();\n       if (y + newY < ballRadius) {\n           newY = -newY;\n       } else if (y + newY+250 > canvas.height-ballRadius){\n           if (x > paddleX && x < paddleX + paddleWidth) {\n               newY = -newY;\n           \n            } \n        }\n           if (y + newY + 65 > canvas.height - ballRadius){\n            drawFlame();\n           lives--;\n           planetOpacity -= .33;\n           if (!lives) {\n               // alert(\"Better luck next time\");\n               // document.location.reload();\n               // drawGameOver();\n\n           } else {\n\n               x = canvas.width / 2;\n               y = canvas.height - 290;\n               newX = speed;\n               newY = -speed;\n               paddleX = (canvas.width - paddleWidth) / 2;\n\n           };\n        \n           \n        \n    \n       };\n       if (x + newX > canvas.width-ballRadius || x + newX < ballRadius) {\n           newX = -newX;\n       };\n       if (bulletMoving) {\n           rockY-= 4;\n       };\n       if (rightPress && paddleX < canvas.width - paddleWidth) {\n           paddleX += paddleInc;\n           \n       }\n       else if (leftPress && paddleX > 0) {\n           paddleX -= paddleInc;\n           \n       };\n       arr.forEach(p => {\n           \n            ctx.fillStyle = p.color;\n           ctx.globalAlpha = p.opacity;\n        //    debugger;\n            // console.log(x);\n            // console.log(p.x)\n            \n            if (difficulty === 0){\n                ctx.fillRect((p.x), (p.y+200), p.size, p.size);\n                ctx.fillRect((p.x-350), (p.y+200), p.size, p.size);\n                ctx.fillRect((p.x+350), (p.y+200), p.size, p.size);\n                // ctx.fillRect((x), (p.y), p.size*2, p.size*2);\n                // ctx.arc((newX + p.x), (p.y + newY) - (y), p.size, 0, Math.PI * 2);\n                // ctx.fill();\n            } else {\n                ctx.fillRect((p.x), (p.y + 200), p.size, p.size);\n                ctx.fillRect((p.x - 350), (p.y + 200), p.size, p.size);\n                ctx.fillRect((p.x + 350), (p.y + 200), p.size, p.size);\n                ctx.fillRect((canvas.width-40), (p.y), p.size/4, p.size/2);\n                ctx.fillRect((canvas.width/2), (p.y), p.size/4, p.size/2);\n            }\n       });\n       ctx.globalAlpha = 1;\n       x += newX;\n       y += newY;\n       \n       \n       drawScore();\n       drawLives();\n       detectCollision();\n       if (bulletMoving){\n        drawBullet();\n        \n       }\n       drawBricks();\n        }\n       \n       if (!lives)  {\n           \n           \n           drawFlame();\n           drawGameOver();\n       }\n       if (score == brickColumnCount * brickRowCount)  {\n           drawFlame();\n           ctx.clearRect(0, 0, canvas.width, canvas.height);\n           \n           drawGameOver();\n           \n           lives = 3;\n           speed = speed + 0.0002;\n           paddleInc += .0002;\n        \n       }\n       drawPlanet();\n       requestAnimationFrame(draw);\n    };\n    colPolFiller(400)\n    draw();\n});\n\n// setInterval(() => {speed*=1.1},1000)\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });