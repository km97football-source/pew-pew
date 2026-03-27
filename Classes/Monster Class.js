class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 40;
    this.speed = random(1, 2); // movement speed
    this.maxHealth = 50;
    this.health = this.maxHealth;
    this.alive = true;
  }

  // Move toward player
  update(playerX, playerY) {
    if (!this.alive) return;

    let dx = playerX - this.x;
    let dy = playerY - this.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    }
  }

  // Draw monster
  draw() {
    if (!this.alive) return;

    push();
    fill(0, 150, 0); // green jungle monster
    ellipse(this.x, this.y, this.size);

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