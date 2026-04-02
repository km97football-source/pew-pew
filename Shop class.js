class Shop {
  constructor() {
    this.coins = 20;

    this.buttonW = 300;
    this.buttonH = 60;

    this.piercingUnlocked = false;
    this.doubleUnlocked = false;
  }

  display() {
    background(30);

    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    // TITLE
    fill(255);
    textSize(60);
    text("SHOP", width / 2, 80);

    // COINS
    textSize(24);
    text("Coins: " + this.coins, width / 2, 130);

    let centerX = width / 2;
    let startY = 200;
    let gap = 150;

    // ===== PIERCING =====
    let y1 = startY;

    fill(255);
    textSize(22);
    text("Piercing Shuriken", centerX, y1);

    textSize(16);
    text("Goes through enemies + extra damage", centerX, y1 + 25);

    fill(this.isHovering(centerX, y1 + 70) ? color(0,255,120) : color(0,200,100));
    rect(centerX, y1 + 70, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.piercingUnlocked ? "OWNED" : "BUY (10)", centerX, y1 + 70);

    // ===== DOUBLE =====
    let y2 = startY + gap;

    fill(255);
    textSize(22);
    text("Double Shuriken", centerX, y2);

    textSize(16);
    text("Throws two at once", centerX, y2 + 25);

    fill(this.isHovering(centerX, y2 + 70) ? color(0,200,255) : color(0,150,255));
    rect(centerX, y2 + 70, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.doubleUnlocked ? "OWNED" : "BUY (15)", centerX, y2 + 70);

    // ===== BACK =====
    let y3 = startY + gap * 2;

    fill(this.isHovering(centerX, y3) ? color(255,120,120) : color(255,80,80));
    rect(centerX, y3, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text("BACK", centerX, y3);

    // CLICK ZONES
    this.pierceY = y1 + 70;
    this.doubleY = y2 + 70;
    this.backY = y3;
  }

  handleMousePressed() {
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

    // BACK TO MENU
    if (this.isHovering(width / 2, this.backY)) {
      game.state = "menu";
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