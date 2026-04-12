class Shop {
  constructor() {
    this.buttonW = 200;
    this.buttonH = 60;
    this.shopX = width / 2;
    this.shopY = height / 2 - 100;
    this.continueX = width / 2;
    this.continueY = height / 2 + 150;

    // Upgrade levels and costs
    this.speedLevel = 0;
    this.maxSpeed = 10;
    this.speedCost = 50;

    this.healthLevel = 0;
    this.maxHealth = 300;
    this.healthCost = 100;

    this.fireRateLevel = 0;
    this.minDelay = 100;
    this.fireRateCost = 150;

    this.damageLevel = 0;
    this.maxDamage = 50;
    this.damageCost = 200;

    this.shurikenDamageBase = 10;
  }

  display(gameScreen) {
    // Semi-transparent overlay
    fill(0, 0, 0, 150);
    // rect(0, 0, width, height);
    image(gameImg, 0, 0, width, height);
      

    // Shop title
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text('SHOP', this.shopX, this.shopY - 120);

    // Gold display
    fill('gold');
    textSize(28);
    text(`Gold: ${Gold}`, this.shopX, this.shopY - 80);

    let yOffset = this.shopY - 20;
    textSize(20);
    fill(255);

    // Speed Upgrade
    push();
    text(`Speed Lv${this.speedLevel} (${ninja.baseSpeed.toFixed(1)}): $${this.speedCost}`, this.shopX, yOffset);
    // push();
    if (gameScreen.isHovering(this.shopX, yOffset + 10)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.shopX - this.buttonW/2, yOffset + 5, this.buttonW, this.buttonH, 12);
    noStroke();
    pop();
    fill(0);
    textSize(18);
    text('BUY SPEED', this.shopX, yOffset + 35);

    // Health Upgrade
    yOffset += 80;
    text(`Health Lv${this.healthLevel} (${playerHealth.maxHealth}): $${this.healthCost}`, this.shopX, yOffset);
    push();
    if (gameScreen.isHovering(this.shopX, yOffset + 10)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.shopX - this.buttonW/2, yOffset + 5, this.buttonW, this.buttonH, 12);
    noStroke();
    pop();
    fill(0);
    text('BUY HEALTH', this.shopX, yOffset + 35);

    // Fire Rate Upgrade
    yOffset += 80;
    text(`Fire Rate Lv${this.fireLevel} (${shurikenDelay}ms): $${this.fireRateCost}`, this.shopX, yOffset);
    push();
    if (gameScreen.isHovering(this.shopX, yOffset + 10)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.shopX - this.buttonW/2, yOffset + 5, this.buttonW, this.buttonH, 12);
    noStroke();
    pop();
    fill(0);
    text('BUY FIRE RATE', this.shopX, yOffset + 35);

    // Damage Upgrade
    yOffset += 80;
    let currentDamage = this.shurikenDamageBase + (this.damageLevel * 5);
    text(`Damage Lv${this.damageLevel} (${currentDamage}): $${this.damageCost}`, this.shopX, yOffset);
    push();
    if (gameScreen.isHovering(this.shopX, yOffset + 10)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.shopX - this.buttonW/2, yOffset + 5, this.buttonW, this.buttonH, 12);
    noStroke();
    pop();
    fill(0);
    text('BUY DAMAGE', this.shopX, yOffset + 35);

    // Continue button
    push();
    if (gameScreen.isHovering(this.continueX, this.continueY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.continueX - this.buttonW/2, this.continueY - this.buttonH/2, this.buttonW, this.buttonH, 12);
    noStroke();
    pop();
    fill(0);
    textSize(24);
    text('CONTINUE', this.continueX, this.continueY);
  }

  handleClick(x, y, gameScreen) {
    let buttonTop = this.shopY + 5;
    
    // Speed button
    if (gameScreen.isHovering(this.shopX, buttonTop + 30) && Gold >= this.speedCost && ninja.baseSpeed < this.maxSpeed) {
      this.buySpeed();
    }
    
    // Health button
    buttonTop += 80;
    if (gameScreen.isHovering(this.shopX, buttonTop + 30) && Gold >= this.healthCost && playerHealth.maxHealth < this.maxHealth) {
      this.buyHealth();
    }
    
    // Fire rate button
    buttonTop += 80;
    if (gameScreen.isHovering(this.shopX, buttonTop + 30) && Gold >= this.fireRateCost && shurikenDelay > this.minDelay) {
      this.buyFireRate();
    }
    
    // Damage button
    buttonTop += 80;
    if (gameScreen.isHovering(this.shopX, buttonTop + 30) && Gold >= this.damageCost && (this.shurikenDamageBase + this.damageLevel * 5) < this.maxDamage) {
      this.buyDamage();
    }
    
    // Continue
    if (gameScreen.isHovering(this.continueX, this.continueY)) {
      spawnNewWave();
      game.state = 'game';
    }
  }

  buySpeed() {
    ninja.baseSpeed += 2;
    this.speedLevel++;
    Gold -= this.speedCost;
    console.log('Speed upgraded!');
  }

  buyHealth() {
    playerHealth.maxHealth += 20;
    playerHealth.currentHealth = playerHealth.maxHealth; // Full heal
    this.healthLevel++;
    Gold -= this.healthCost;
    console.log('Health upgraded!');
  }

  buyFireRate() {
    shurikenDelay = max(shurikenDelay - 50, this.minDelay);
    this.fireRateLevel++;
    Gold -= this.fireRateCost;
    console.log('Fire rate upgraded!');
  }

  buyDamage() {
    this.damageLevel++;
    Gold -= this.damageCost;
    console.log('Damage upgraded!'); // Damage applied in shuriken hit logic update later
  }
}



