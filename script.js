let score = 0;
let gameInterval;
let balloonInterval;
let isGameRunning = false;

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const balloonContainer = document.getElementById('balloon-container');
const scoreElement = document.getElementById('score');
const gameOverSection = document.getElementById('game-over-section');
const finalScoreElement = document.getElementById('final-score');

startBtn.addEventListener('click', startGame);

stopBtn.addEventListener('click', stopGame);

function startGame() {
  if (isGameRunning) return;

  isGameRunning = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  score = 0;
  scoreElement.textContent = score;
  gameOverSection.hidden = true;

  balloonInterval = setInterval(createBalloon, 1000);
}

function stopGame() {
  isGameRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(balloonInterval);
  balloonContainer.innerHTML = ''; 
  finalScoreElement.textContent = score;
  gameOverSection.hidden = false;
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  balloon.style.backgroundColor = randomColor;

  balloon.style.left = Math.random() * 90 + '%';
  balloon.style.bottom = '0px';
  let position = 0;
  const moveBalloon = setInterval(() => {
    if (position >= 400) {
      clearInterval(moveBalloon);
      balloon.remove();
      gameOver();
    } else {
      position += 2;
      balloon.style.bottom = position + 'px';
    }
  }, 20);

  
  balloon.addEventListener('click', () => {
    clearInterval(moveBalloon);
    balloon.remove();
    score += 10;
    scoreElement.textContent = score;
  });

  balloonContainer.appendChild(balloon);
}

function gameOver() {
  stopGame();
  finalScoreElement.textContent = score;
  gameOverSection.hidden = false;
}
