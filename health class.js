class Health {
  constructor(maxHealth) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;

    this.damageAmount = 10; // damage per hit

    this.hitTimer = 0; // controls red flash when hit
  }

  takeHit() {
    this.currentHealth -= this.damageAmount;

    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    }

    this.hitTimer = 20; // how long the red flash lasts
  }

  update() {
    if (this.hitTimer > 0) {
      this.hitTimer--;
    }
  }

  display(x, y, w, h) {
    // background
    fill(80);
    rect(x, y, w, h);

    // health amount
    let healthWidth = map(this.currentHealth, 0, this.maxHealth, 0, w);
    fill(0, 200, 0);
    rect(x, y, healthWidth, h);

    // border
    noFill();
    stroke(0);
    rect(x, y, w, h);
    noStroke();
  }

  isLow() {
    return this.currentHealth < this.maxHealth * 0.3; // low health threshold
  }

  isDead() {
    return this.currentHealth <= 0;
  }
}