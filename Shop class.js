class Shop {
  constructor() {
    this.active = false;

    this.coins = 20;

    this.buttonW = 260;
    this.buttonH = 60;

    this.pierceY = height / 2 - 40;
    this.doubleY = height / 2 + 40;
    this.closeY = height / 2 + 140;

    this.piercingUnlocked = false;
    this.doubleUnlocked = false;
  }

  update() {
    this.pierceY = height / 2 - 40;
    this.doubleY = height / 2 + 40;
    this.closeY = height / 2 + 140;
  }

  display() {
    if (!this.active) return;

    // dark overlay
    rectMode(CORNER);
    fill(0, 180);
    rect(0, 0, width, height);

    rectMode(CENTER);
    textAlign(CENTER, CENTER);

    fill(255);
    textSize(40);
    text("SHOP", width / 2, height / 2 - 150);

    textSize(20);
    text("Coins: " + this.coins, width / 2, height / 2 - 100);

    // ===== PIERCING =====
    fill(255);
    text("Piercing Shuriken\nMore damage + goes through enemies", width/2, this.pierceY - 35);

    fill(this.isHovering(width/2, this.pierceY) ? color(0,255,100) : color(0,200,100));
    rect(width / 2, this.pierceY, this.buttonW, this.buttonH, 10);

    fill(0);
    text(this.piercingUnlocked ? "OWNED" : "BUY (10)", width / 2, this.pierceY);

    // ===== DOUBLE =====
    fill(255);
    text("Double Shuriken\nThrows two at once", width/2, this.doubleY - 35);

    fill(this.isHovering(width/2, this.doubleY) ? color(0,200,255) : color(0,150,255));
    rect(width / 2, this.doubleY, this.buttonW, this.buttonH, 10);

    fill(0);
    text(this.doubleUnlocked ? "OWNED" : "BUY (15)", width / 2, this.doubleY);

    // ===== CLOSE =====
    fill(255, 80, 80);
    rect(width / 2, this.closeY, this.buttonW, this.buttonH, 10);

    fill(0);
    text("CLOSE", width / 2, this.closeY);
  }

  handleMousePressed() {
    if (!this.active) return;

    // BUY PIERCING
    if (
      this.isHovering(width / 2, this.pierceY) &&
      !this.piercingUnlocked &&
      this.coins >= 10
    ) {
      this.coins -= 10;
      this.piercingUnlocked = true;
    }

    // BUY DOUBLE
    if (
      this.isHovering(width / 2, this.doubleY) &&
      !this.doubleUnlocked &&
      this.coins >= 15
    ) {
      this.coins -= 15;
      this.doubleUnlocked = true;
    }

    // CLOSE
    if (this.isHovering(width / 2, this.closeY)) {
      this.active = false;
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
}