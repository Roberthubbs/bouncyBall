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

eval("document.addEventListener('DOMContentLoaded', () => { \n    const canvas = document.getElementById(\"myCanvas\");\n    const ctx = canvas.getContext(\"2d\");\n    let x = canvas.width/2;\n    let y = canvas.height - 30;\n    const colors = [\"red\", \"orange\", \"blue\", \"green\", \"black\", \"#4488FF\", \"teal\"];\n    let newX = 2;\n    let newY = -2;\n    let ballRadius = 10;\n    let paddleWidth = 75;\n    let paddleHeight = 10;\n    let paddleX = (canvas.width-paddleWidth)/2;\n    let rightPress = false;\n    let leftPress = false;\n    let brickRowCount = 3;\n    let brickColumnCount = 5;\n    let brickWidth = 140;\n    let brickHeight = 40;\n    let brickPadding = 10;\n    let brickOffsetTop = 30;\n    let brickOffsetLeft = 30;\n    let bricks = [];\n    let score = 0;\n    let lives = 3;\n    for (let i = 0; i < brickColumnCount; i++){\n        bricks[i] = [];\n        for (let j = 0; j < brickRowCount; j++){\n            bricks[i][j] = {x: 0, y: 0, val: 1}\n        }\n    };\n   function drawScore(){\n       ctx.font = '16px Helvetica';\n       ctx.fillStyle = \"#0095DD\";\n       ctx.fillText(\"Score: \" + score, 8, 20) \n   };\n   function drawLives(){\n       ctx.font = '16px Helvetica';\n       ctx.fillStyle = \"#0095DD\";\n       ctx.fillText(\"Lives: \" + lives, canvas.width-65, 20);\n   };\n    function drawBricks(){\n        for (let i = 0; i < brickColumnCount; i++) {\n            for (let j = 0; j < brickRowCount; j++) {\n                if(bricks[i][j].val === 1){\n                let brickX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;\n                let brickY = (j * (brickHeight + brickPadding)) + brickOffsetTop;\n                bricks[i][j].x = brickX;\n                bricks[i][j].y = brickY;\n                ctx.beginPath();\n                ctx.rect(brickX, brickY, brickWidth, brickHeight);\n                ctx.fillStyle = \"#0095DD\";\n                ctx.fill();\n                ctx.closePath();\n                }\n            }\n        }\n    }\n    \n    function keyDownHandler(e){\n        if (e.key == \"Right\" || e.key == \"ArrowRight\"){\n            rightPress = true;\n        }\n        if (e.key == \"Left\" || e.key == \"ArrowLeft\"){\n            leftPress = true;\n        }\n    };\n    function keyUpHandler(e){\n        if (e.key == \"Right\" || e.key == \"ArrowRight\"){\n            rightPress = false;\n        }\n        if (e.key == \"Left\" || e.key == \"ArrowLeft\"){\n            leftPress = false;\n        }\n    };\n    function detectCollision() {\n        for (var c = 0; c < brickColumnCount; c++) {\n            for (var r = 0; r < brickRowCount; r++) {\n                var b = bricks[c][r];\n                if (b.val == 1) {\n                    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {\n                        newY = -newY;\n                        b.val = 0;\n                        score++;\n                        if (score == brickRowCount * brickColumnCount) {\n                            alert(\"Winner, winner\");\n                            document.location.reload();\n                            \n                        }\n                    }\n                }\n            }\n        }\n    }\n    \n    \n    document.addEventListener(\"keydown\", keyDownHandler, false);\n    document.addEventListener(\"keyup\", keyUpHandler, false);\n    \n    function drawBall(){\n        ctx.beginPath();\n        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);\n        ctx.fillStyle = \"#0095DD\";\n        ctx.fill();\n        ctx.closePath();\n    }\n    function drawPaddle(){\n        ctx.beginPath();\n        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);\n        ctx.fillStyle = \"#0095DD\";\n        ctx.fill();\n        ctx.closePath();\n    }\n   function draw(){\n       ctx.clearRect(0, 0, canvas.width, canvas.height);\n       drawBall();\n       \n       drawBricks();\n       if (y + newY < ballRadius) {\n           newY = -newY;\n       } else if (y + newY > canvas.height-ballRadius){\n           if (x > paddleX && x < paddleX + paddleWidth) {\n               newY = -newY;\n           } else {\n                lives--;\n                if (!lives){\n                    alert(\"Better luck next time\");\n                    document.location.reload();\n                    \n                } else {\n                    x = canvas.width / 2;\n                    y = canvas.height - 30;\n                    newX = 2;\n                    newY = -2;\n                    paddleX = (canvas.width - paddleWidth) / 2;\n                };\n           };\n       };\n       if (x + newX > canvas.width-ballRadius || x + newX < ballRadius) {\n           newX = -newX;\n       };\n       if (rightPress && paddleX < canvas.width - paddleWidth) {\n           paddleX += 7;\n       }\n       else if (leftPress && paddleX > 0) {\n           paddleX -= 7;\n       }\n       x += newX;\n       y += newY;\n       drawPaddle();\n       drawScore();\n       drawLives();\n       detectCollision();\n       requestAnimationFrame(draw);\n   };\n   draw();\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });