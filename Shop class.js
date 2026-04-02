class Shop {
  constructor() {
    this.coins = 20;

    this.buttonW = 300;
    this.buttonH = 60;

    this.piercingUnlocked = false;
    this.doubleUnlocked = false;
  }

  display() {
    background(30, 60, 30); // jungle dark green

    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    // ===== TITLE (JUNGLE STYLE) =====
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
    // 🌿 PIERCING PERK
    // ==============================
    let y1 = startY;

    // wood panel
    fill(80, 50, 20);
    rect(centerX, y1 + 40, 360, 130, 15);

    // title shadow
    fill(0, 80, 0);
    textSize(26);
    text("Piercing Shuriken", centerX + 2, y1 + 2);

    // title main
    fill(180, 255, 180);
    text("Piercing Shuriken", centerX, y1);

    // description
    fill(200, 255, 200);
    textSize(16);
    text("Goes through enemies + extra damage", centerX, y1 + 30);

    // button
    fill(this.isHovering(centerX, y1 + 80) ? color(50,200,50) : color(30,150,30));
    rect(centerX, y1 + 80, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text(this.piercingUnlocked ? "OWNED" : "BUY (10)", centerX, y1 + 80);

    // ==============================
    // 🌿 DOUBLE PERK
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
    // 🔙 BACK BUTTON
    // ==============================
    let y3 = startY + gap * 2;

    fill(this.isHovering(centerX, y3) ? color(255,120,120) : color(200,80,80));
    rect(centerX, y3, this.buttonW, this.buttonH, 12);

    fill(0);
    textSize(18);
    text("BACK", centerX, y3);

    // CLICK ZONES
    this.pierceY = y1 + 80;
    this.doubleY = y2 + 80;
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