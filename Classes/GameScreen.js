
class GameScreen {
  constructor() {
    this.state = "menu"; 
    this.buttonW = 220;
    this.buttonH = 70;

    this.startX = width / 2;
    this.startY = height / 2 + 60;
    this.playAgainX = width / 2;
    this.playAgainY = height / 2 + 110;
    this.mainMenuX = width / 2;
    this.mainMenuY = height / 2 + 10;
    this.instrX = width / 2;
    this.instrY = height / 2 + 210;
    this.backX = width / 2;
    this.backY = height - 100;
    this.howToX = width / 2;
    this.howToY = height / 2 + 160;
    this.shopY = height / 2 + 310;
    this.shopX = width / 2;
    
    // Instruction screen tracking
    this.instrPage = 1;
    this.totalInstrPages = 2;
    this.leftArrowX = 50;
    this.leftArrowY = height / 2;
    this.rightArrowX = width - 50;
    this.rightArrowY = height / 2;
    this.arrowSize = 40;

    //unknown stuff from shop class
    this.continueX = width / 2;
    this.continueY = height / 2 + 150;
    this.goldX = width / 2;
    this.goldY = 160;

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

  update() {
    // nothing needed yet
  }

  display() {
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    if (this.state === "menu") {
      // MENU SCREEN
      if (bgImg) {
        image(bgImg, 0, 0, width, height);
      }

  

      push();
      // hover effect for START
      if (this.isHovering(this.startX, this.startY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.startX, this.startY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();

      fill(0);
      textSize(24);
      text("START", this.startX, this.startY);

      push();
      // Instructions button
      if (this.isHovering(this.howToX, this.howToY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.howToX, this.howToY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("HOW TO PLAY", this.howToX, this.howToY);

    } else if (this.state === "game") {
      if (gameImg) {
        image(gameImg, 0, 0, width, height);
      }
    } else if (this.state === "shop") {
      // if (shop) {
      //   shop.display(this);
      // }
      if (gameImg) {
        image(gameImg, 0, 0, width, height);
      }
    //     display(gameScreen) {
    // // Semi-transparent overlay
    // fill(0, 0, 0, 150);
    // rect(0, 0, width, height);

    // Gold display
    fill('gold');
    textSize(28);
    text(`Gold: ${Gold}`, this.goldX, this.goldY);

    // let yOffset = this.shopY - 20;
    // textSize(20);
    // fill(255);

    // Speed Upgrade
    text(`Speed Lv${this.speedLevel} (${ninja.baseSpeed.toFixed(1)}): $${this.speedCost}`, this.shopX, yOffset);
    push();
    if (this.isHovering(this.shopX, yOffset + 10)) {
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
    if (this.isHovering(this.shopX, yOffset + 10)) {
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
    if (this.isHovering(this.shopX, yOffset + 10)) {
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
    if (this.isHovering(this.shopX, yOffset + 10)) {
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
    if (this.isHovering(this.continueX, this.continueY)) {
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
  
    } else if (this.state === "pause") {
      if (pimage) {
        image(pimage, 0, 0, width, height);
      }

      push();
      // Main Menu button
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.mainMenuX, this.mainMenuY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("MAIN MENU", this.mainMenuX, this.mainMenuY);

      push();
      // Play Again button
      if (this.isHovering(this.playAgainX, this.playAgainY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.playAgainX, this.playAgainY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("RESTART", this.playAgainX, this.playAgainY);

      push();
      // Instructions button
      if (this.isHovering(this.instrX, this.instrY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.instrX, this.instrY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("INSTRUCTIONS", this.instrX, this.instrY);

            push();
      // Shop button
      if (this.isHovering(this.shopX, this.shopY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.shopX, this.shopY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("SHOP", this.shopX, this.shopY);

    } else if (this.state === "gameover") {
      if (window.gameoverImg) {
        image(window.gameoverImg, 0, 0, width, height);
      } else {
        background(0);
        fill(255, 0, 0);
        textSize(80);
        text("GAME OVER", width / 2, height / 2 - 150);
      }

      push();
      // Main Menu button
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.mainMenuX, this.mainMenuY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("MAIN MENU", this.mainMenuX, this.mainMenuY);

      push();
      // Play Again button
      if (this.isHovering(this.playAgainX, this.playAgainY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.playAgainX, this.playAgainY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("RESTART", this.playAgainX, this.playAgainY);

      push();
      // Instructions button
      if (this.isHovering(this.instrX, this.instrY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.instrX, this.instrY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("INSTRUCTIONS", this.instrX, this.instrY);

      push();
      // Shop button
      if (this.isHovering(this.shopX, this.shopY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.shopX, this.shopY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("SHOP", this.shopX, this.shopY);

    } else if (this.state === "instructions") {
      // Display instruction images
      if (this.instrPage === 1 && window.instructionsImg1) {
        image(window.instructionsImg1, 0, 0, width, height);
      } else if (this.instrPage === 2 && window.instructionsImg2) {
        image(window.instructionsImg2, 0, 0, width, height);
      }
      
      // Left arrow button
      if (this.instrPage > 1) {
        push();
        if (this.isHoveringArrow(this.leftArrowX, this.leftArrowY)) {
          fill(255, 200, 0);
        } else {
          fill('#eecf9b');
        }
        stroke(0);
        strokeWeight(3);
        rect(this.leftArrowX, this.leftArrowY, this.arrowSize, this.arrowSize, 8);
        noStroke();
        pop();
        fill(0);
        textSize(28);
        text("<", this.leftArrowX, this.leftArrowY);
      }
      
      // Right arrow button
      if (this.instrPage < this.totalInstrPages) {
        push();
        if (this.isHoveringArrow(this.rightArrowX, this.rightArrowY)) {
          fill(255, 200, 0);
        } else {
          fill('#eecf9b');
        }
        stroke(0);
        strokeWeight(3);
        rect(this.rightArrowX, this.rightArrowY, this.arrowSize, this.arrowSize, 8);
        noStroke();
        pop();
        fill(0);
        textSize(28);
        text(">", this.rightArrowX, this.rightArrowY);
      }

      push();
      // Back button
      if (this.isHovering(this.backX, this.backY)) {
        fill(255, 200, 0);
      } else {
        fill('#eecf9b');
      }
      stroke(0);
      strokeWeight(3);
      rect(this.backX, this.backY, this.buttonW, this.buttonH, 12);
      noStroke();
      pop();
      fill(0);
      textSize(24);
      text("BACK", this.backX, this.backY);
    }
  }

  handleMousePressed() {
    if (this.state === "menu" && this.isHovering(this.startX, this.startY)) {
      this.state = "game";
    }else if (this.isHovering(this.howToX, this.howToY)){
      this.state = "instructions";
    }else if (this.state === "pause") {
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        this.state = "menu";
      } else if (this.isHovering(this.playAgainX, this.playAgainY)) {
        this.state = "game";
      } else if (this.isHovering(this.instrX, this.instrY)) {
        this.state = "instructions";
      } else if (this.isHovering(this.shopX, this.shopY)){
        this.state = "shop";
      }
    } else if (this.state === "shop") {
      // if (shop) {
      //   shop.handleClick(mouseX, mouseY, this);
      // } 
          // Speed button
    if (this.isHovering(this.shopX, buttonTop + 30) && Gold >= this.speedCost && ninja.baseSpeed < this.maxSpeed) {
      this.buySpeed();
    }
    
    // Health button
    buttonTop += 80;
    if (this.isHovering(this.shopX, buttonTop + 30) && Gold >= this.healthCost && playerHealth.maxHealth < this.maxHealth) {
      this.buyHealth();
    }
    
    // Fire rate button
    buttonTop += 80;
    if (this.isHovering(this.shopX, buttonTop + 30) && Gold >= this.fireRateCost && shurikenDelay > this.minDelay) {
      this.buyFireRate();
    }
    
    // Damage button
    buttonTop += 80;
    if (this.isHovering(this.shopX, buttonTop + 30) && Gold >= this.damageCost && (this.shurikenDamageBase + this.damageLevel * 5) < this.maxDamage) {
      this.buyDamage();
    }
    
    // Continue
    if (this.isHovering(this.continueX, this.continueY)) {
      spawnNewWave();
      game.state = 'game';
    }
    } else if (this.state === "gameover") {
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        this.state = "menu";
      } else if (this.isHovering(this.playAgainX, this.playAgainY)) {
        this.state = "game";
      } else if (this.isHovering(this.instrX, this.instrY)) {
        this.state = "instructions";
      } else if (this.isHovering(this.shopX, this.shopY)){
        this.state = "shop";
      }
    } else if (this.state === "instructions") {
      if (this.isHovering(this.backX, this.backY)) {
        this.state = "menu";
        this.instrPage = 1; // Reset to first page when leaving
      } else if (this.instrPage < this.totalInstrPages && this.isHoveringArrow(this.rightArrowX, this.rightArrowY)) {
        this.instrPage++;
      } else if (this.instrPage > 1 && this.isHoveringArrow(this.leftArrowX, this.leftArrowY)) {
        this.instrPage--;
      }
    }
  }
  
  handleKeyPressed(key) {
    if (this.state === "instructions") {
      if (key === "ArrowRight" && this.instrPage < this.totalInstrPages) {
        this.instrPage++;
      } else if (key === "ArrowLeft" && this.instrPage > 1) {
        this.instrPage--;
      }
    }
  }

  isHovering(x, y) {
    return (
      mouseX > x - this.buttonW / 2 &&
      mouseX < x + this.buttonW / 2 &&
      mouseY > y - this.buttonH / 2 &&
      mouseY < y + this.buttonH / 2
    );
  }
  
  isHoveringArrow(x, y) {
    return (
      mouseX > x - this.arrowSize / 2 &&
      mouseX < x + this.arrowSize / 2 &&
      mouseY > y - this.arrowSize / 2 &&
      mouseY < y + this.arrowSize / 2
    );
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