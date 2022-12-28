import Circle from './geometricForms/Circle.js';
import { loadImage } from './loaders/loaderImage.js';

export default class Enemy extends Circle {

	constructor(x, y, size, speed = 10, width, height, img, frames) {
		super(x, y, size, speed);
		
		this.hurtbox = new Circle (
			this.x + this.width / 2,
			this.y + this.height / 2,
			this.size,
			0,"rgba(255,0,0,0)"
		);	
		
		this.cellHeight= 29;
		this.cellX = 0;
		this.totalSprites = 3;
		this.img = img;
		this.cellWidth = img.naturalWidth/this.totalSprites;
		this.enemySpeed = 1;
		this.width = width;
		this.height = height;
		this.animeSprite(frames);
	}

	animeSprite(frames) { 
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
		}, 1000 / (frames * this.enemySpeed / 10))
	}

	draw(context) {
		context.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			0,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
		this.hurtbox.drawCircle(context);
	}

	move(limits) {
		this.y += this.speed;
		this.hurtbox.y += this.speed;
		this.limits(limits);
	}

	limits(limits) {
		if (this.y + 70 > limits.height) {
			this.y = 30;
			this.x = Math.random() * ((limits.width - 80) - 30 ) + 30;
			this.hurtbox.x = this.x + this.width / 2;
			this.hurtbox.y = 30 + this.height / 2;
			this.speed = Math.floor(Math.random() * (6 - 3)) + 3;
		}
	}
}
