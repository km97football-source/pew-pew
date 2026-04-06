let ninja, arrow, monster;
let collisionManager;
let shurikens = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');

	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3);
	arrow = new Arrow(ninja1, 50);
	monster = new Monster(width / 4, height / 4);

	collisionManager = new CollisionManager();
	collisionManager.addRect(100, 150, 300, 20, '#888');
	collisionManager.addRect(width - 300, height - 220, 220, 20, '#888');
	collisionManager.addCircle(width / 2, height / 2 + 150, 50, '#888');
}

function draw() {
	background('white');
	collisionManager.draw();
	ninja1.update(collisionManager);
	ninja1.draw();
	arrow.draw();
	monster.update(ninja1.x, ninja1.y, collisionManager);
	monster.draw();
    
    for (let s of shurikens) {
        s.draw();
    }
}

function mousePressed() {
    let newShuriken = new Shuriken(ninja1.x, ninja1.y, 5);
    shurikens.push(newShuriken);
}