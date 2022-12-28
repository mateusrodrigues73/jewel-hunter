import Circle from './geometricForms/Circle.js';
import { loadImage } from './loaders/loaderImage.js';

export default class Jewel extends Circle {

	constructor(x, y, size, speed = 10, width, height, img, frames) {
		super(x, y, size, speed);
		
		this.hurtbox = new Circle (
			this.x + width / 2,
			this.y + height / 2,
			this.size,
			0,"rgba(255,255,0,0)"
		);

		this.cellHeight= 48;
		this.cellX = 0;
		this.totalSprites = 10;
		this.img = img;
		this.cellWidth = img.naturalWidth/this.totalSprites;
		this.width = width;
		this.height = height;
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
}
