class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 40;
    this.speed = random(1, 2); // movement speed
    this.maxHealth = 50;
    this.health = this.maxHealth;
    this.alive = true;
    
    // Randomly pick a monster emoji
    const emojis = ['👻', '🧟', '🧛'];
    this.emoji = random(emojis);
  }

  // Move toward player
  update(playerX, playerY, collisionManager) {
    if (!this.alive) return;

    let prevX = this.x;
    let prevY = this.y;

    let dx = playerX - this.x;
    let dy = playerY - this.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }

    // Resolve collision
    if (collisionManager) {
      let resolved = collisionManager.resolveCircleCollision(this.x, this.y, this.size / 2, prevX, prevY);
      this.x = resolved.x;
      this.y = resolved.y;
    }
  }

  // Draw monster
  draw() {
    if (!this.alive) return;

    push();
    // Draw random emoji as the monster
    textAlign(CENTER, CENTER);
    textSize(this.size * 1.1); // Scale emoji to fit monster size
    text(this.emoji, this.x - 20, this.y - 5); // Slight offset to position nicely

    // health bar
    fill(255, 0, 0);
    rect(this.x - 20, this.y - 30, 40, 5);

    fill(0, 255, 0);
    let healthWidth = (this.health / this.maxHealth) * 40;
    rect(this.x - 20, this.y - 30, healthWidth, 5);

    pop();
  }

  // Take damage from shuriken
  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.alive = false;
      addGold(1); // 1 gold per monster defeated
    }
  }

  // Check collision with player
  hitsPlayer(playerX, playerY, playerSize) {
    let d = dist(this.x, this.y, playerX, playerY);
    return d < this.size / 2 + playerSize / 2;
  }

  // Check collision with shuriken
  hitsShuriken(shurikenX, shurikenY, shurikenSize) {
    let d = dist(this.x, this.y, shurikenX, shurikenY);
    return d < this.size / 2 + shurikenSize / 2;
  }
}

function allMonstersDefeated() {
	// Check if boss exists and is still alive
	if (boss !== null && boss.alive) {
		return false;
	}
	// Check if all regular monsters are dead
	return monsters.length === 0 || monsters.every(m => !m.alive);
}

function spawnNewWave() {
	waveNumber++;
	let randomCount = random(2, 6); // spawn 2-5 monsters
	randomCount = floor(randomCount);
	
	for (let i = 0; i < randomCount; i++) {
		let randomX = random(width * 0.2, width * 0.8);
		let randomY = random(height * 0.2, height * 0.6);
		monsters.push(new Monster(randomX, randomY));
	}
	

	if (waveNumber % 2=== 0) {
		boss = new Boss(width / 2, height * 0.8);
	}
	
	print("Wave " + waveNumber + " spawned! Monsters: " + randomCount);
}
