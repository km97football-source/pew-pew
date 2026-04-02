class Boss extends Monster {
  constructor(x, y) {
    super(x, y);

    // Boss stats - stronger than regular monsters
    this.size = 80; // much bigger
    this.maxHealth = 200; // 4x more HP
    this.health = this.maxHealth;
    this.speed = random(1, 2); // faster and more dangerous
  }

  // Override takeDamage to give 3 gold instead of 1
  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.alive = false;
      addGold(3); // 3 gold per boss defeated
    }
  }

  // Override draw to make boss look different
  draw() {
    if (!this.alive) return;

    push();
    fill('red'); // red to indicate danger
    ellipse(this.x, this.y, this.size);

    // Add a border to make it stand out
    stroke('darkred');
    strokeWeight(3);
    noFill();
    ellipse(this.x, this.y, this.size);

    // health bar (larger for bigger boss)
    noStroke();
    fill(255, 0, 0);
    rect(this.x - 40, this.y - 50, 80, 8);

    fill(0, 255, 0);
    let healthWidth = (this.health / this.maxHealth) * 80;
    rect(this.x - 40, this.y - 50, healthWidth, 8);

    pop();
  }
}
