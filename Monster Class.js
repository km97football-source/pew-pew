class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 40;
    this.speed = random(1, 2); // p5.js random
    this.maxHealth = 50;
    this.health = this.maxHealth;
    this.alive = true;
  }

  // Move toward player
  update(playerX, playerY) {
    if (!this.alive) return;

    let dx = playerX - this.x;
    let dy = playerY - this.y;

    let distance = dist(this.x, this.y, playerX, playerY);

    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }

  // Display monster
  display() {
    if (!this.alive) return;

    push();

    // Monster body
    fill(0, 150, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);

    // Health bar background
    fill(255, 0, 0);
    rect(this.x - 20, this.y - 30, 40, 5);

    // Health bar foreground
    fill(0, 255, 0);
    let healthWidth = (this.health / this.maxHealth) * 40;
    rect(this.x - 20, this.y - 30, healthWidth, 5);

    pop();
  }

  // Take damage
  takeDamage(amount) {
    this.health -= amount;
    HitSound.play();
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  // Collision with player
  hitsPlayer(playerX, playerY, playerSize) {
    let d = dist(this.x, this.y, playerX, playerY);
    return d < this.size / 2 + playerSize / 2;
  }

  // Collision with shuriken
  hitsShuriken(shurikenX, shurikenY, shurikenSize) {
    let d = dist(this.x, this.y, shurikenX, shurikenY);
    return d < this.size / 2 + shurikenSize / 2;
  }
}