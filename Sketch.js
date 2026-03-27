let ninja, arrow, monster;
let shurikens = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');

	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3)
	arrow = new Arrow(ninja1, 50);
	monster = new Monster(width / 4, height / 4);
}

function draw() {
	background('white');
	ninja1.draw()
	ninja1.update()
	arrow.draw()
    monster.update(ninja1.x, ninja1.y);
    monster.draw()
    
    for (let s of shurikens) {
        s.draw();
    }
}

function mousePressed() {
    let newShuriken = new Shuriken(ninja1.x, ninja1.y, 5);
    shurikens.push(newShuriken);
}