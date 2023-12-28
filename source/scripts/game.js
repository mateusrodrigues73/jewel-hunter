import { loadImage } from './loaders/loaderImage.js';
import { loadAudio } from './loaders/loaderAudio.js';
import { keyPress, key } from './keyPress.js';
import hud from "./hud"
import Hero from './Hero';
import Enemy from './Enemy';
import Jewel from './Jewel.js';

let canvas;
let context;
let msg;
let background;
let jewelImage;
let enemyImage;
let heroImage;
let animation;
let limits;
let theme;
let jewelSound;
let gameOverSound;
let hero;
let jewel;
let restartMessage;
let retry = false;
let score = 0;
let gameOver = false;
const frames = 60;
const totalEnemies = 4;
let enemies = Array.from({length: totalEnemies});

const init = async() => {
  console.log('Start');

  canvas = document.querySelector('canvas');
  canvas.width = 700;
  canvas.height = 400;
  context = canvas.getContext('2d');
  msg = document.querySelector('h1');

  background =  await loadImage('/images/background/background.png');
  heroImage = await loadImage('/images/sprites/hero.png');
  enemyImage = await loadImage('/images/sprites/enemy.png');
  jewelImage = await loadImage('/images/sprites/jewel.png');
  theme = await loadAudio('/sounds/theme.mp3');
  theme.volume = .3;
	theme.loop = true;
  jewelSound = await loadAudio('/sounds/jewel.mp3');
  jewelSound.volume = .6;
  gameOverSound = await loadAudio('/sounds/gameover.mp3');
  gameOverSound.volume = .5;

  limits = {
    width: canvas.width,
		height: canvas.height
  };

  hero = new Hero(310, 100, 20, 6, 60, 66, heroImage, frames);
  jewel = new Jewel(410, 200, 12, 5, 30, 30, jewelImage, frames);

  enemies = enemies.map (
    i => new Enemy (
      Math.random() * ((limits.width - 80) - 30 ) + 30, 
      30, 
      20, 
      Math.floor(Math.random() * (6 - 3)) + 3, 
      60, 
      66,
      enemyImage,
      frames
    )
  );

  keyPress(window);
  start();
}

const start = () => {
  hero.x = 310;
  hero.y = 100;
  hero.status = 'down';

  jewel.x = 410;
  jewel.y = 200;
  jewel.hurtbox.x = jewel.x + jewel.width / 2;
  jewel.hurtbox.y = jewel.y + jewel.height / 2;

  enemies.forEach(e => {
    e.y = 30;
		e.x = Math.random() * ((limits.width - 80) - 30 ) + 30;
		e.hurtbox.x = e.x + e.width / 2;
		e.hurtbox.y = 30 + e.height / 2;
		e.speed = Math.floor(Math.random() * (6 - 3)) + 3;
  });
  
  let startInterval = setInterval(() => {
    if (!retry) {
      context.drawImage(background, 0, 0, limits.width, limits.height);
      restartMessage = 'Press ENTER for start!!';
    }

    hud(context, restartMessage, 'lightgreen', limits.height / 2);

    if (key == 'Enter') {
      theme.currentTime = 0;
      theme.play();
      clearInterval(startInterval);
      loopAnimation();
    }
  }, 500);
}

const loopAnimation = () => {
  msg.style.color = 'lightgreen';
  msg.innerText = `YOUR SCORE: ${score}`;
  setTimeout(() => {
    context.drawImage(background, 0, 0, limits.width, limits.height);

    jewel.draw(context);

    enemies.forEach(e => {
      e.move(limits);
      e.draw(context);
      gameOver = !gameOver ? e.colision(hero.hurtbox) : true;
    });  

    hero.move(limits, key);
		hero.draw(context);

    if (jewel.colision(hero.hurtbox)) {
      jewel.x = Math.floor(Math.random() * ((limits.width - 80) - 30 )) + 30;
      jewel.y = Math.floor(Math.random() * ((limits.height - 60) - 140 )) + 140;
      jewel.hurtbox.x = jewel.x + jewel.width / 2;
      jewel.hurtbox.y = jewel.y + jewel.height / 2;
      jewel.cellX = Math.floor(Math.random() * 10);
      jewelSound.currentTime = 0;
      jewelSound.play();
      score++;
      msg.innerText = `YOUR SCORE: ${score}`;
    }

    if (gameOver) { 
      gameOver = false;
      retry = true;
      restartMessage = 'Press ENTER for restart!!';
      console.error('GAMEOVER');
      cancelAnimationFrame(animation);
      gameOverSound.currentTime = 0;
      gameOverSound.play();
      theme.pause();
      msg.style.color = 'darkred';
      msg.innerText = `GAME OVER!!!  YOUR SCORE: ${score}`;
      score = 0;
      setTimeout(() => {
        start();
      }, 1000);
    }
    else {
      animation = requestAnimationFrame(loopAnimation);
    }
  }, 1000 / frames);
}

export { init };
