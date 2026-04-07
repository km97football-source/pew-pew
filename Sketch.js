let game;
let bgImg, gameImg, shurikenimg, pimage;

let ninja1, arrow;
let monsters = [];
let boss;
let shurikens = [];
let lastShurikenTime = 0;
let shurikenDelay = 250;

let collisionManager;

function preload() {
  bgImg = loadImage('assests/Welcome To Jungle Adventure.png',
    () => console.log('Background image loaded'),
    () => console.error('Failed to load background image')
  );
  gameImg = loadImage('assests/GamePlayBackground.png',
    () => console.log('Game screen image loaded'),
    () => console.error('Failed to load game screen image')
  );
  shurikenimg = loadImage('assests/SawBladeSuriken.png',
    () => console.log('Shuriken image loaded'),
    () => console.error('Failed to load shuriken image')
  );
  pimage = loadImage('assests/GamePaused.png',
  );
}




function setup() {
	createCanvas(windowWidth, windowHeight);
	game = new GameScreen();

	collisionManager = new CollisionManager();
	collisionManager.addRect(100, 150, 300, 20, '#888');
	collisionManager.addRect(width - 300, height - 220, 220, 20, '#888');
	collisionManager.addCircle(width / 2, height / 2 + 150, 50, '#888');

}

function initGame() {
	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3)
	arrow = new Arrow(ninja1, 50);

	monsters = [];
	monsters.push(new Monster(width / 4, height / 4));
	monsters.push(new Monster(3 * width / 4, height / 4));
	monsters.push(new Monster(width / 2, height / 4 + 100));

	boss = null;
	waveNumber = 0;
}


function draw() {

	if (game.state === "menu") {
		game.update();
		game.display();

	} else if (game.state === "pause") {
		game.update();
		game.display();
	}
	
	else if (game.state === "game") {
		game.update();
		game.display();
		collisionManager.draw();
		ninja1.draw()
		ninja1.update(collisionManager)
		arrow.draw()
		
		if (boss && boss.alive) {
			boss.update(ninja1.x, ninja1.y, collisionManager);
			boss.draw();
		}

		
		for (let m of monsters) {
			m.update(ninja1.x, ninja1.y, collisionManager);
			m.draw();
		}

		// Check if all monsters are defeated and spawn new wave
		if (allMonstersDefeated()) {
			spawnNewWave();
		}
    
		// Update and draw all shurikens with collision detection
        for (let i = shurikens.length - 1; i >= 0; i--) {
            let s = shurikens[i];
            s.update();
            s.draw();
            
            // Check collision with boss
            if (boss && boss.alive && dist(s.x, s.y, boss.x, boss.y) < s.size / 2 + boss.size / 2) {
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
		displayGoldCounter();
	}
}

function mousePressed() {
	if (game.state === "menu") {
		game.handleMousePressed();
		if (game.state === "game") {
			initGame();
		}
	} else if (game.state === "game") {
        let currentTime = millis();
        if (currentTime - lastShurikenTime > shurikenDelay) {
            let newShuriken = new Shuriken(ninja1.x, ninja1.y, 5, mouseX, mouseY);
            shurikens.push(newShuriken);
            lastShurikenTime = currentTime;
            print("shuriken thrown");
        }
	}
}

function keyPressed() {
	if (keyCode === 27) { // ESC key
		if (game.state === "game") {
			game.state = "pause";
		} else if (game.state === "pause") {
			game.state = "game";
		}
		return false; // Prevent default ESC behavior
	}
}

