class Ninja {
	constructor(x, y, size, colour, speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.colour = colour;
		this.baseSpeed = speed;
		this.speed = speed;
	}

	update(collisionManager) {
		let prevX = this.x;
		let prevY = this.y;

		// Reduce speed by 30% if boss is alive
		if (boss !== null && boss.alive) {
			this.speed = this.baseSpeed * 0.7; // 70% of original speed (30% reduction)
		} else {
			this.speed = this.baseSpeed; // Normal speed
		}

		if (keyIsDown(65) === true) { //A
			this.x = this.x - this.speed;
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

		// Resolve collision
		if (collisionManager) {
			let resolved = collisionManager.resolveCircleCollision(this.x, this.y, this.size, prevX, prevY);
			this.x = resolved.x;
			this.y = resolved.y;
		}

		displayWaveCounter();
	}

	draw() {
		fill(this.colour);
		circle(this.x, this.y, this.size * 2);
	}
}