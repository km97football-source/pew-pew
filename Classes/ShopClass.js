class Shop {
  constructor() {
    this.buttonW = 200;
    this.buttonH = 60;
    this.shopX = width / 2;
    this.shopY = height / 2 - 100;
    this.continueX = width / 2;
    this.continueY = height / 2 + 150;
    this.buySpeedX = width / 2 + 150;
    this.buySpeedY = height / 2 - 50;
    this.buyHealthX = width / 2 - 150;
    this.buyHealthY = height / 2 - 50;
    this.buyFireX = width / 2 - 150;
    this.buyFireY = height / 2 + 50;
    this.buyDamageX = width / 2 + 150;
    this.buyDamageY = height / 2 + 50;

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
    image(shopImg, 0, 0, width, height);
      
    textAlign(CENTER, CENTER);

    // Gold display
    fill('white');
    stroke(0);
    strokeWeight(2);
    rect(this.shopX, this.shopY - 80, 150, 60, 12);
    fill('gold');
    textSize(28);
    text(`Gold: ${Gold}`, this.shopX, this.shopY - 80);

    let yOffset = this.shopY - 20;
    // Speed Upgrade
    push();
    if (gameScreen.isHovering(this.buySpeedX, this.buySpeedY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.buySpeedX, this.buySpeedY, this.buttonW, this.buttonH, 12);
    textSize(20);
    fill(255);
    text(`Speed Lv${this.speedLevel} (${ninja1.baseSpeed.toFixed(1)}): $${this.speedCost}`, this.buySpeedX, this.buySpeedY - 50);
    noStroke();
    pop();
    fill(0);
    textSize(18);
    text('BUY SPEED', this.buySpeedX, this.buySpeedY);

    // Health Upgrade
    yOffset += 80;
    push();
    if (gameScreen.isHovering(this.buyHealthX, this.buyHealthY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.buyHealthX, this.buyHealthY, this.buttonW, this.buttonH, 12);
    textSize(20);
    fill(255);
    text(`Health Lv${this.healthLevel} (${playerHealth.maxHealth}): $${this.healthCost}`, this.buyHealthX, this.buyHealthY - 50);
    noStroke();
    pop();
    fill(0);
    text('BUY HEALTH', this.buyHealthX, this.buyHealthY);

    // Fire Rate Upgrade
    yOffset += 80;
    push();
    if (gameScreen.isHovering(this.buyFireX, this.buyFireY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.buyFireX, this.buyFireY, this.buttonW, this.buttonH, 12);
    textSize(20);
    fill(255);
    text(`Fire Rate Lv${this.fireRateLevel} (${shurikenDelay}ms): $${this.fireRateCost}`, this.buyFireX, this.buyFireY - 50);
    noStroke();
    pop();
    fill(0);
    text('BUY FIRE RATE', this.buyFireX, this.buyFireY);

    // Damage Upgrade
    yOffset += 80;
    let currentDamage = this.shurikenDamageBase + (this.damageLevel * 5);
    push();
    if (gameScreen.isHovering(this.buyDamageX, this.buyDamageY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.buyDamageX, this.buyDamageY, this.buttonW, this.buttonH, 12);
    textSize(20);
    fill(255);
    text(`Damage Lv${this.damageLevel} (${currentDamage}): $${this.damageCost}`, this.buyDamageX, this.buyDamageY - 50);
    noStroke();
    pop();
    fill(0);
    text('BUY DAMAGE', this.buyDamageX, this.buyDamageY);

    // Continue button
    push();
    if (gameScreen.isHovering(this.continueX, this.continueY)) {
      fill(255, 200, 0);
    } else {
      fill('#eecf9b');
    }
    stroke(0);
    strokeWeight(3);
    rect(this.continueX, this.continueY, this.buttonW, this.buttonH, 12);
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



