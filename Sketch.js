let ninja, arrow;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');

	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3)
	arrow = new Arrow(ninja1, 50);
}

function draw() {
	background('white');
	ninja1.draw()
	ninja1.update()
	arrow.draw()

}