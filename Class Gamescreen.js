class GameScreen {
  constructor() {
    this.title = "Jungle Adventure";

    this.buttonX = width / 2;
    this.buttonY = height / 2 + 60;
    this.buttonW = 220;
    this.buttonH = 70;

    this.started = false; 
  }

  update() {
    // nothing yet
  }

  display() {
    if (!this.started) {
      // ===== TITLE SCREEN =====
      background(20, 100, 40);

      textAlign(CENTER, CENTER);

      // Title
      fill(255);
      textSize(60);
      text(this.title, width / 2, height / 2 - 100);

      // Instructions
      textSize(20);
      text("Use WASD to move, click to throw shurikens", width / 2, height / 2 - 40);

      // Button hover
      if (this.isHovering()) {
        fill(255, 200, 0);
      } else {
        fill(255, 150, 0);
      }

      rectMode(CENTER);
      rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, 12);

      fill(0);
      textSize(24);
      text("START", this.buttonX, this.buttonY);

    } else {
      // ===== ACTUAL GAME =====
      background(30, 120, 60);

      // example player
      fill(50, 50, 255);
      ellipse(width / 2, height / 2, 40);

      // (you’ll add monsters + movement here)
    }
  }

  isHovering() {
    return (
      mouseX > this.buttonX - this.buttonW / 2 &&
      mouseX < this.buttonX + this.buttonW / 2 &&
      mouseY > this.buttonY - this.buttonH / 2 &&
      mouseY < this.buttonY + this.buttonH / 2
    );
  }

  handleMousePressed() {
    if (!this.started && this.isHovering()) {
      this.started = true; // switch to gameplay
    }
  }
}