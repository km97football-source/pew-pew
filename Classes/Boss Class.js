class Boss extends Monster {
  constructor(x, y) {
    super(x, y);

    // Boss stats - stronger than regular monsters
    this.size = 80; // much bigger
    this.maxHealth = 200; // 4x more HP
    this.health = this.maxHealth;
    this.speed = random(1, 2); // faster and more dangerous
    
    // Randomly pick a boss emoji
    const emojis = ['👹', '👺', '👽', '🧌'];
    this.emoji = random(emojis);
  }

  // Override takeDamage to give 3 gold instead of 1
  takeDamage(amount) {
    this.health -= amount;

    if (this.health <= 0) {
      this.alive = false;
      addGold(5); // 5 gold per boss defeated
    }
  }

  // Override draw to make boss look different
  draw() {
    if (!this.alive) return;

    push();
    
    // Draw random emoji as the boss
    textAlign(CENTER, CENTER);
    textSize(this.size * 1.5); // Scale emoji to fit boss size
    text(this.emoji, this.x - 25, this.y); // Slight offset to position nicely

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
