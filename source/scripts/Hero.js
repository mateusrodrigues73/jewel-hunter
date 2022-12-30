import Circle from './geometricForms/Circle.js';
import { loadImage } from './loaders/loaderImage.js';

export default class Hero extends Circle {

	constructor(x, y, size, speed = 10, width, height, img, frames) {
		super(x, y, size, speed);
	
		this.hurtbox = new Circle (
			this.x + this.width / 2,
			this.y + this.height / 2,
			this.size,
			0,"rgba(0,0,255,0)"
		);

		this.cellHeight= 32;
		this.cellX = 0;
		this.totalSprites = 3;
		this.img = img;
		this.cellWidth = img.naturalWidth / this.totalSprites;
		this.heroSpeed = 1;
		this.width = width;
		this.height = height;
		this.status = 'down';
		this.controls = {
			's':'down',
			'w':'up',
			'a':'left',
			'd':'rigth',
			'S':'down',
			'W':'up',
			'A':'left',
			'D':'rigth',
		}
		this.animeSprite(frames);
	}

	draw(context) {
		this.setCellY();
		context.drawImage(
			this.img,
			this.cellX * this.cellWidth,
			this.cellY * this.cellHeight,
			this.cellWidth,
			this.cellHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
		this.hurtbox.drawCircle(context);
	}

	animeSprite(frames) { 
		setInterval(() => {
			this.cellX = this.cellX < this.totalSprites - 1 ? this.cellX + 1 : 0;
		}, 1000 / (frames * this.heroSpeed / 10))
	}

	setCellY() {
		let sprites = {
			'down': 0,
			'up': 3,
			'left': 1,
			'rigth':2
		}
		this.cellY = sprites[this.status];
	}

	move(limits, key) {
		let movements = {
			'down': {
				x: this.x,
				y: this.y + this.speed 
			},
			'up': {
				x: this.x, y: this.y - this.speed 
			},
			'left': {
				x: this.x - this.speed, y: this.y 
			},
			'rigth': {
				x: this.x + this.speed, y: this.y 
			}
		}
		this.status = this.controls[key] ? this.controls[key] : this.status;
		this.x = movements[this.status].x;
		this.y = movements[this.status].y;
		this.updateHurtbox();
		this.limits(limits);
	}

	limits(limits) {
		if (this.x + this.size > limits.width - 50) {
			this.x = limits.width - 50 - this.size;
			this.cellX = 1;
		}
		if (this.x - this.size < 0) {
			this.x =  this.size;
			this.cellX = 1;
		}
		if (this.y + this.size > limits.height - 80) {
			this.y = limits.height -80 - this.size;
			this.cellX = 1;
		}
		if (this.y - this.size < 40) {
			this.y = 40 + this.size;
			this.cellX = 1;
		}
	}

	updateHurtbox(){
		this.hurtbox.x = this.x + this.width / 2;
		this.hurtbox.y = this.y + this.height / 2;
	}
}
