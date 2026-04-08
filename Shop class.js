class Shop {
  constructor() {
    this.coins = 20;

    this.buttonW = 300;
    this.buttonH = 60;

    this.piercingUnlocked = false;
    this.doubleUnlocked = false;
    this.waveUnlocked = false; // NEW
  }

  display() {
    background(30, 60, 30);

    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    // ===== TITLE =====
    fill(0, 100, 0);
    textSize(64);
    text("SHOP", width / 2 + 4, 84);

    fill(120, 255, 120);
    text("SHOP", width / 2, 80);

    // ===== COINS =====
    fill(200, 255, 200);
    textSize(22);
    text("Coins: " + this.coins, width / 2, 130);

    let centerX = width / 2;
    let startY = 200;
    let gap = 160;

    // ==============================
    // 🌿 PIERCING
    // ==============================
    let y1 = startY;

    fill(80, 50, 20);
    rect(centerX, y1 + 40, 360, 130, 15);

    fill(0, 80, 0);
    textSize(26);
    text("Piercing Shuriken", centerX + 2, y1 + 2);

    fill(180, 255, 180);
    text("Piercing Shuriken", centerX, y1);

    fill(200, 255, 200);
    textSize(16);
    text("Goes through enemies + extra damage", centerX, y1 + 30);

    fill(this.isHovering(centerX, y1 + 80) ? color(50,200,50) : color(30,150,30));
    rect(centerX, y1 + 80, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.piercingUnlocked ? "OWNED" : "BUY (10)", centerX, y1 + 80);

    // ==============================
    // 🌿 DOUBLE
    // ==============================
    let y2 = startY + gap;

    fill(80, 50, 20);
    rect(centerX, y2 + 40, 360, 130, 15);

    fill(0, 80, 0);
    textSize(26);
    text("Double Shuriken", centerX + 2, y2 + 2);

    fill(180, 255, 180);
    text("Double Shuriken", centerX, y2);

    fill(200, 255, 200);
    textSize(16);
    text("Throws two at once", centerX, y2 + 30);

    fill(this.isHovering(centerX, y2 + 80) ? color(50,180,220) : color(30,130,200));
    rect(centerX, y2 + 80, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.doubleUnlocked ? "OWNED" : "BUY (15)", centerX, y2 + 80);

    // ==============================
    // 🌪️ SHURIKEN WAVE (NEW)
    // ==============================
    let y3 = startY + gap * 2;

    fill(80, 50, 20);
    rect(centerX, y3 + 40, 360, 130, 15);

    fill(0, 80, 0);
    textSize(26);
    text("Shuriken Wave", centerX + 2, y3 + 2);

    fill(180, 255, 180);
    text("Shuriken Wave", centerX, y3);

    fill(200, 255, 200);
    textSize(16);
    text("Shoots 7 shurikens in a spread", centerX, y3 + 30);

    fill(this.isHovering(centerX, y3 + 80) ? color(200,200,80) : color(160,160,40));
    rect(centerX, y3 + 80, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.waveUnlocked ? "OWNED" : "BUY (20)", centerX, y3 + 80);

    // ==============================
    // 🔙 BACK BUTTON
    // ==============================
    let y4 = startY + gap * 3;

    fill(this.isHovering(centerX, y4) ? color(255,120,120) : color(200,80,80));
    rect(centerX, y4, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text("BACK", centerX, y4);

    // CLICK ZONES
    this.pierceY = y1 + 80;
    this.doubleY = y2 + 80;
    this.waveY = y3 + 80; // NEW
    this.backY = y4;
  }

  handleMousePressed() {
    // PIERCING
    if (
      this.isHovering(width / 2, this.pierceY) &&
      !this.piercingUnlocked &&
      this.coins >= 10
    ) {
      this.coins -= 10;
      this.piercingUnlocked = true;
    }

    // DOUBLE
    if (
      this.isHovering(width / 2, this.doubleY) &&
      !this.doubleUnlocked &&
      this.coins >= 15
    ) {
      this.coins -= 15;
      this.doubleUnlocked = true;
    }

    // 🌪️ WAVE
    if (
      this.isHovering(width / 2, this.waveY) &&
      !this.waveUnlocked &&
      this.coins >= 20
    ) {
      this.coins -= 20;
      this.waveUnlocked = true;
    }

    // BACK
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