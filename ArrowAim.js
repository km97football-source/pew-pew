class Arrow {
	constructor(ninja, length) {
		this.ninja = ninja;
		this.length = length;
	}

	draw() {
		let dx = mouseX - this.ninja.x;
		let dy = mouseY - this.ninja.y;

		let magnitude = sqrt(dx * dx + dy * dy);
		if (magnitude === 0) return;

		let endX = this.ninja.x + (dx / magnitude) * this.length;
		let endY = this.ninja.y + (dy / magnitude) * this.length;

		stroke('green');
		line(this.ninja.x, this.ninja.y, endX, endY);

		let angle = atan2(dy, dx);

		push();
		translate(endX, endY);
		rotate(angle);
		fill('green');
		triangle(0, 0, -10, 5, -10, -5);
		pop();
	}
}