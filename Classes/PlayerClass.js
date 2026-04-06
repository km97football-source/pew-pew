class Ninja {
	constructor(x, y, size, colour, speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.colour = colour;
		this.speed = speed;
	}

	update(collisions) {
		let previousX = this.x;
		let previousY = this.y;

		if (keyIsDown(65) === true) { // A
			this.x -= this.speed;
		}

		if (keyIsDown(68) === true) { // D
			this.x += this.speed;
		}

		if (keyIsDown(87) === true) { // W
			this.y -= this.speed;
		}

		if (keyIsDown(83) === true) { // S
			this.y += this.speed;
		}

		if (collisions) {
			let resolved = collisions.resolveCircleCollision(this.x, this.y, this.size, previousX, previousY);
			this.x = resolved.x;
			this.y = resolved.y;
		}
	}

	draw() {
		fill(this.colour);
		circle(this.x, this.y, this.size * 2);
	}
}