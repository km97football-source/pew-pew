let ninja1, arrow;
let monsters = [];
let boss;
let shurikens = [];
let img;
let lastShurikenTime = 0;
let shurikenDelay = 250;

function preload() {
    img = loadImage('assests/SingleSawBladeSuriken.png', 
        () => console.log('Shuriken image loaded'),
        () => console.error('Failed to load shuriken image')
    );
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');

	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3)
	arrow = new Arrow(ninja1, 50);

	monsters.push(new Monster(width / 4, height / 4));
	monsters.push(new Monster(3 * width / 4, height / 4));
	monsters.push(new Monster(width / 2, height / 4 + 100));

	boss = new Boss(width / 2, height / 4 - 100);
}

function draw() {
	background('white');
	ninja1.draw()
	ninja1.update()
	arrow.draw()
	
	// Update and draw boss
	if (boss.alive) {
		boss.update(ninja1.x, ninja1.y);
		boss.draw();
	}

	// Update and draw all monsters
	for (let m of monsters) {
		m.update(ninja1.x, ninja1.y);
		m.draw();
	}
    
	// Update and draw all shurikens with collision detection
    for (let i = shurikens.length - 1; i >= 0; i--) {
        let s = shurikens[i];
        s.update();
        s.draw();
        
        // Check collision with boss
        if (boss.alive && dist(s.x, s.y, boss.x, boss.y) < s.size / 2 + boss.size / 2) {
            boss.takeDamage(10);
            shurikens.splice(i, 1);
            print("Boss hit! Health:", boss.health);
        } else {
            // Check collision with all monsters
            for (let j = monsters.length - 1; j >= 0; j--) {
                let m = monsters[j];
                if (m.alive && dist(s.x, s.y, m.x, m.y) < s.size / 2 + m.size / 2) {
                    m.takeDamage(10);
                    shurikens.splice(i, 1);
                    print("Monster hit! Health:", m.health);
                    break;
                }
            }
        }
    }
}

function mousePressed() {
    let currentTime = millis();
    if (currentTime - lastShurikenTime > shurikenDelay) {
        let newShuriken = new Shuriken(ninja1.x, ninja1.y, 5, mouseX, mouseY);
        shurikens.push(newShuriken);
        lastShurikenTime = currentTime;
        print("shuriken thrown");
    }
}