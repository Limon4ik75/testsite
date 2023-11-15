const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const blockSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const playWidth = canvasWidth / blockSize;
const playHeight = canvasHeight / blockSize;

let score = 0;
let direction;

// Задаем начальные координаты для змейки
let snake = [
  { x: playWidth / 2, y: playHeight / 2 },
  { x: playWidth / 2 - 1, y: playHeight / 2 },
  { x: playWidth / 2 - 2, y: playHeight / 2 }
];

let apple = {
  x: Math.floor(Math.random() * playWidth),
  y: Math.floor(Math.random() * playHeight)
};

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x * blockSize, apple.y * blockSize, blockSize, blockSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "green" : "white";
    ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize, blockSize);
  }

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Счёт: ${score}`, blockSize * 2, blockSize * 2);
}

function update() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === apple.x && head.y === apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * playWidth),
      y: Math.floor(Math.random() * playHeight)
    };
  } else {
    snake.pop();
  }

  if (head.x < 0 || head.x >= playWidth || head.y < 0 || head.y >= playHeight) {
    gameOver();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
    }
  }
}

function gameOver() {
  clearInterval(gameInterval);
  alert(`Игра окончена! Ваш счет: ${score}`);
  snake = [
    { x: playWidth / 2, y: playHeight / 2 },
    { x: playWidth / 2 - 1, y: playHeight / 2 },
    { x: playWidth / 2 - 2, y: playHeight / 2 }
  ];
  score = 0;
  direction = undefined;
  gameInterval = setInterval(game, 1000 / 8);
}

function game() {
  update();
  draw();
}

document.addEventListener("keydown", function(event) {
  const keyPressed = event.keyCode;
  const upKey = 87;
  const downKey = 83;
  const leftKey = 65;
  const rightKey = 68;

  if (keyPressed === upKey && direction !== "DOWN") {
    direction = { x: 0, y: -1 };
  } else if (keyPressed === downKey && direction !== "UP") {
    direction = { x: 0, y: 1 };
  } else if (keyPressed === leftKey && direction !== "RIGHT") {
    direction = { x: -1, y: 0 };
  } else if (keyPressed === rightKey && direction !== "LEFT") {
    direction = { x: 1, y: 0 };
  }
});

let gameInterval = setInterval(game, 1000 / 8);