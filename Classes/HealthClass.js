class Health {
  constructor(maxHealth) {
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;

    this.damageAmount = 3; // damage per hit from regular enemy
    this.bossDamageAmount = 10; // damage per hit from boss (2x)

    this.hitTimer = 0; // controls red flash when hit
    this.lastDamageTime = 0; // cooldown timer for continuous damage
    this.damageCooldown = 500; // milliseconds between damage
  }

  takeHit(isBoss = false) {
    let currentTime = millis();
    if (currentTime - this.lastDamageTime > this.damageCooldown) {
      let damageToTake = isBoss ? this.bossDamageAmount : this.damageAmount;
      this.currentHealth -= damageToTake;
      this.lastDamageTime = currentTime;

      if (this.currentHealth < 0) {
        this.currentHealth = 0;
      }

      this.hitTimer = 20; // how long the red flash lasts
      return true; // Damage was applied
    }
    return false; // Cooldown still active, no damage taken
  }

  update() {
    if (this.hitTimer > 0) {
      this.hitTimer--;
    }
  }

  display(x, y, w, h) {
    push();
    
    // Red flash effect when hit
    let flashAlpha = map(this.hitTimer, 0, 20, 0, 100);
    
    // Background - dark red
    fill(100, 40, 40);
    stroke(200, 50, 50);
    strokeWeight(3);
    rect(x, y, w, h, 5);
    
    // Health bar - bright green to red gradient effect
    let healthWidth = map(this.currentHealth, 0, this.maxHealth, 0, w);
    let healthPercent = this.currentHealth / this.maxHealth;
    
    // Color changes based on health
    if (healthPercent > 0.5) {
      fill(0, 255, 100); // Green
    } else if (healthPercent > 0.25) {
      fill(255, 200, 0); // Yellow
    } else {
      fill(255, 50, 50); // Red
    }
    
    // Add flash effect
    if (this.hitTimer > 0) {
      fill(255, 100, 100);
    }
    
    rect(x + 3, y + 3, healthWidth - 6, h - 6, 3);
    
    // Health text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(int(this.currentHealth) + " / " + this.maxHealth, x + w / 2, y + h / 2);
    
    pop();
  }

  isLow() {
    return this.currentHealth < this.maxHealth * 0.3; // low health threshold
  }

  increaseDamage(amount) {
    this.damageAmount += amount;
  }

  isDead() {
    return this.currentHealth <= 0;
  }
}