import './style.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;

// // fillRect()
// ctx.fillStyle = 'red';
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillStyle = 'blue';
// ctx.fillRect(200, 20, 150, 100);

// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'green';
// ctx.strokeRect(100, 200, 150, 100);

// // clearRect()
// ctx.clearRect(25, 25, 140, 90);

// // fillText()
// ctx.font = '30px Arial';
// ctx.fillStyle = 'purple';
// ctx.fillText('Hello World', 400, 50);

// // strokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText('Hello World', 400, 100);

// // Paths
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 50);
// ctx.stroke();
// ctx.fillStyle = 'coral';
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(200, 50, 150, 100);
// ctx.fillStyle = 'teal';
// ctx.fill();

// // Arc (circles)
// ctx.beginPath();
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
// ctx.moveTo(centerX + 100, centerY);
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false);
// ctx.moveTo(centerX - 60, centerY - 80);
// ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);
// ctx.moveTo(centerX + 100, centerY - 80);
// ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);
// ctx.stroke();

// // Animation 1
// const circle = {
//   x: 200,
//   y: 200,
//   size: 30,
//   dx: 5,
//   dy: 4,
// };
// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//   ctx.fillStyle = 'purple';
//   ctx.fill();
// }
// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCircle();
//   circle.x += circle.dx;
//   circle.y += circle.dy;
//   // Detect side walls
//   if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
//     circle.dx *= -1;
//   }
//   // Detect top and bottom walls
//   if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
//     circle.dy *= -1;
//   }
//   requestAnimationFrame(update);
// }
// update();

// // Animation 2
// const image = document.getElementById('source') as HTMLImageElement;

// const player = {
//   w: 50,
//   h: 70,
//   x: 20,
//   y: 200,
//   speed: 10,
//   dx: 0,
//   dy: 0,
// };

// function drawPlayer() {
//   ctx.drawImage(image, player.x, player.y, player.w, player.h);
// }

// function clear() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function newPos() {
//   player.x += player.dx;
//   player.y += player.dy;

//   detectWalls();
// }

// function detectWalls() {
//   // Left wall
//   if (player.x < 0) {
//     player.x = 0;
//   }

//   // Right Wall
//   if (player.x + player.w > canvas.width) {
//     player.x = canvas.width - player.w;
//   }

//   // Top wall
//   if (player.y < 0) {
//     player.y = 0;
//   }

//   // Bottom Wall
//   if (player.y + player.h > canvas.height) {
//     player.y = canvas.height - player.h;
//   }
// }

// function update() {
//   clear();

//   drawPlayer();

//   newPos();

//   requestAnimationFrame(update);
// }

// function moveUp() {
//   player.dy = -player.speed;
// }

// function moveDown() {
//   player.dy = player.speed;
// }

// function moveRight() {
//   player.dx = player.speed;
// }

// function moveLeft() {
//   player.dx = -player.speed;
// }

// function keyDown(e: KeyboardEvent) {
//   if (e.key === 'ArrowRight' || e.key === 'Right') {
//     moveRight();
//   } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
//     moveLeft();
//   } else if (e.key === 'ArrowUp' || e.key === 'Up') {
//     moveUp();
//   } else if (e.key === 'ArrowDown' || e.key === 'Down') {
//     moveDown();
//   }
// }

// function keyUp(e: KeyboardEvent) {
//   if (
//     e.key == 'Right' ||
//     e.key == 'ArrowRight' ||
//     e.key == 'Left' ||
//     e.key == 'ArrowLeft' ||
//     e.key == 'Up' ||
//     e.key == 'ArrowUp' ||
//     e.key == 'Down' ||
//     e.key == 'ArrowDown'
//   ) {
//     player.dx = 0;
//     player.dy = 0;
//   }
// }

// update();

// document.addEventListener('keydown', keyDown);
// document.addEventListener('keyup', keyUp);

// game

const image = new Image();
image.src = 'https://i.ibb.co/HHBFJdH/char.png';
ctx.font = '20px Arial';

let gameEnd = false;
let score = 0;

const player = {
  w: 50,
  h: 70,
  x: 20,
  y: 200,
  speed: 10,
  dx: 0,
  dy: 0,
};

const ball = {
  x: 200,
  y: 200,
  size: 30,
  dx: 5,
  dy: 4,
  speed: 0.5,
};

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = 'purple';
  ctx.fill();
}

function moveBall() {
  ball.x += ball.dx * ball.speed;
  ball.y += ball.dy * ball.speed;
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
}

function detectWalls() {
  const { w, h } = player;
  player.x = Math.max(0, Math.min(player.x, canvas.width - w));
  player.y = Math.max(0, Math.min(player.y, canvas.height - h));
}

function movePlayer() {
  player.x += player.dx;
  player.y += player.dy;
  detectWalls();
}

function checkPlayerCollision() {
  if (
    player.x < ball.x + ball.size &&
    player.x + player.w > ball.x &&
    player.y < ball.y + ball.size &&
    player.y + player.h > ball.y
  ) {
    gameEnd = true;
  }
}

function displayScore() {
  ctx.fillText(`Score: ${score}`, 50, 50);
}

setInterval(() => {
  ball.speed += 0.1;
  score += 1;
}, 2000);

function update() {
  if (!gameEnd) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBall();
    moveBall();
    movePlayer();
    displayScore();
    checkPlayerCollision();
    requestAnimationFrame(update);
  }
}
update();

function handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowRight':
    case 'Right':
      player.dx = player.speed;
      break;
    case 'ArrowLeft':
    case 'Left':
      player.dx = -player.speed;
      break;
    case 'ArrowUp':
    case 'Up':
      player.dy = -player.speed;
      break;
    case 'ArrowDown':
    case 'Down':
      player.dy = player.speed;
      break;
  }
}

function handleKeyUp(e: KeyboardEvent) {
  if (['Right', 'ArrowRight', 'Left', 'ArrowLeft', 'Up', 'ArrowUp', 'Down', 'ArrowDown'].includes(e.key)) {
    player.dx = 0;
    player.dy = 0;
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
