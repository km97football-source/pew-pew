let game;
let bgImg, gameImg, shurikenimg, pimage, instructionsImg1, instructionsImg2, gameoverImg, shopImg;
let hitSound, throwSound, dmgtakenSound;

let ninja1, arrow;
let playerHealth;
let monsters = [];
let boss;
let shurikens = [];
let lastShurikenTime = 0;
let shurikenDelay = 250;
let shop;
let bossesDefeated = 0;

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
  pimage = loadImage('assests/GamePause.png',
  );
  instructionsImg1 = loadImage('assests/Instructions1.png',
	() => console.log('Instructions image 1 loaded'),
	() => console.error('Failed to load instructions image 1')
  );
  instructionsImg2 = loadImage('assests/Instructions2.png',
	() => console.log('Instructions image 2 loaded'),
	() => console.error('Failed to load instructions image 2')
  );
  gameoverImg = loadImage('assests/GameOver.png',
	() => console.log('Game over image loaded'),
	() => console.error('Failed to load game over image')
  );
  shopImg = loadImage('assests/Shop.png',
	() => console.log('Shop image loaded'),
	() => console.error('Failed to load shop image')
  );

	hitSound = loadSound('assests/HitSound.mp3',
		() => console.log('Hit sound loaded'),
		() => console.error('Failed to load hit sound')
	);
	throwSound = loadSound('assests/ThrowingSound.mp3',
		() => console.log('Throw sound loaded'),
		() => console.error('Failed to load throw sound')
	);
	dmgtakenSound = loadSound('assests/CharacterDamage.mp3',
		() => console.log('Damage taken sound loaded'),
		() => console.error('Failed to load damage taken sound')
	);

  window.instructionsImg1 = instructionsImg1;
  window.instructionsImg2 = instructionsImg2;
  window.gameoverImg = gameoverImg;
}




function setup() {
	createCanvas(windowWidth, windowHeight);
	game = new GameScreen();

	collisionManager = new CollisionManager();

	collisionManager.addCircle(120, height - 30, 200, '#88888800');
	collisionManager.addCircle(0, height / 2 + 175, 100, '#88888800');

	collisionManager.addCircle(width + 50, height, 275, '#88888800');
	collisionManager.addCircle(width - 175, height - 60, 130, '#88888800');

	collisionManager.addCircle(width - 120, 0, 210, '#88888800');
	collisionManager.addCircle(width - 400, -50, 170, '#88888800');

	collisionManager.addCircle(50, 100, 100, '#88888800');
	collisionManager.addCircle(290, -120, 210, '#88888800');

	let borderThickness = 20;
	collisionManager.addRect(-borderThickness, -borderThickness, width + borderThickness * 2, borderThickness, '#44444400'); // Top
	collisionManager.addRect(-borderThickness, height, width + borderThickness * 2, borderThickness, '#44444400'); // Bottom
	collisionManager.addRect(-borderThickness, -borderThickness, borderThickness, height + borderThickness * 2, '#44444400'); // Left
	collisionManager.addRect(width, -borderThickness, borderThickness, height + borderThickness * 2, '#44444400'); // Right
}

function initGame() {
	ninja1 = new Ninja(width / 2, height / 2, 20, 'green', 3)
	playerHealth = new Health(100);
	playerHealth.damageAmount = 3; // Reset damage to base
		playerHealth.maxHealth = 100; // Reset max health
		arrow = new Arrow(ninja1, 50);
		shop = new Shop();
		shurikenDelay = 250; // Reset fire rate
		bossesDefeated = 0;

	monsters = [];
	monsters.push(new Monster(width / 4, height / 4));
	monsters.push(new Monster(3 * width / 4, height / 4));
	monsters.push(new Monster(width / 2, height / 4 + 100));

	boss = null;
	waveNumber = 0;
}


function draw() {

	if (game.state === "menu" || game.state === "pause" || game.state === "instructions" || game.state === "gameover" || game.state === "shop") {
		game.update();
		game.display();

	} else if (game.state === "game") {
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

		// Check collision between monsters and player
		for (let m of monsters) {
			if (m.alive && m.hitsPlayer(ninja1.x, ninja1.y, ninja1.size)) {
				if (playerHealth.takeHit()) {
					setTimeout(() => dmgtakenSound.play(), 100);
				}
				print("Player hit! Health:", playerHealth.currentHealth);
				break;
			}
		}
		
		// Check collision between boss and player
		if (boss && boss.alive && boss.hitsPlayer(ninja1.x, ninja1.y, ninja1.size)) {
			if (playerHealth.takeHit(true)) {
				setTimeout(() => dmgtakenSound.play(), 100);
			}
			print("Player hit by boss! Health:", playerHealth.currentHealth);
		}
		
		// Check if boss was just defeated and increase monster damage
		if (boss && !boss.alive && boss.health <= 0) {
			playerHealth.increaseDamage(0.5);
			bossesDefeated++;
			boss = null; // prevent duplicate damage increase
		}

		// Update and display player health
		playerHealth.update();
		playerHealth.display(width / 2, height - 80, 200, 30);
		
		// Check if player is dead
		if (playerHealth.isDead()) {
			game.state = "gameover";
		}

		// Check for boss round completion and activate shop
		if (allMonstersDefeated() && boss && !boss.alive) {
			game.state = "shop";
		} else if (allMonstersDefeated()) {
			spawnNewWave();
		}
    
		// Update and draw all shurikens with collision detection
        for (let i = shurikens.length - 1; i >= 0; i--) {
            let s = shurikens[i];
            s.update(collisionManager);
            s.draw();
            
            // Remove shuriken if it hit an obstacle or went off-screen
            if (!s.active) {
                shurikens.splice(i, 1);
                continue;
            }
            
            // Check collision with boss
            if (boss && boss.alive && dist(s.x, s.y, boss.x, boss.y) < s.size / 2 + boss.size / 2) {
                boss.takeDamage(10);
                shurikens.splice(i, 1);
                print("Boss hit! Health:", boss.health);
				hitSound.play();
            } else {
                // Check collision with all monsters
                for (let j = monsters.length - 1; j >= 0; j--) {
                    let m = monsters[j];
                    if (m.alive && dist(s.x, s.y, m.x, m.y) < s.size / 2 + m.size / 2) {
                        m.takeDamage(10);
                        shurikens.splice(i, 1);
                        print("Monster hit! Health:", m.health);
                        hitSound.play();
                        break;
                    }
                }
            }
        }
		displayGoldCounter();
	}
}

function mousePressed() {
	if (game.state !== "game") {
		game.handleMousePressed();
		if (game.state === "game") {
			initGame();
		}
	} else if (game.state === "game") {
        let currentTime = millis();
        if (currentTime - lastShurikenTime > shurikenDelay) {
            let newShuriken = new Shuriken(ninja1.x, ninja1.y, 5, mouseX, mouseY);
            shurikens.push(newShuriken);
            throwSound.play();
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
		} else if (game.state === "instructions") {
			game.state = "menu";
		} else if (game.state === "shop"){
			game.state = "pause";
		}
		return false; // Prevent default ESC behavior
	}
	
	// Handle arrow keys for instructions navigation
	game.handleKeyPressed(key);
}

