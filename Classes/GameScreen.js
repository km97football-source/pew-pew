
class GameScreen {
  constructor() {
    this.state = "menu"; // "menu" or "game"

    this.buttonW = 220;
    this.buttonH = 70;

    this.bx = width / 2;
    this.by = height / 2 + 60;
  }

  update() {
    // nothing needed yet
  }

  display() {
    if (this.state === "menu") {
      // MENU SCREEN
      if (bgImg) {
        image(bgImg, 0, 0, width, height);
      }

      textAlign(CENTER, CENTER);

      fill(255);
      textSize(60);
      text("Jungle Adventure", width / 2, height / 2 - 100);

      // hover effect
      if (this.isHovering(this.bx, this.by)) {
        fill(255, 200, 0);
      } else {
        fill(255, 150, 0);
      }

      rectMode(CENTER);
      rect(this.bx, this.by, this.buttonW, this.buttonH, 12);

      fill(0);
      textSize(24);
      text("START", this.bx, this.by);

    } else if (this.state === "game") {
  
      if (gameImg) {
        image(gameImg, 0, 0, width, height);
      }
    } else if (this.state === "pause") {

      if (pimage) {
        image(pimage, 0, 0, width, height);
      }
    }
  }

  handleMousePressed() {
    if (this.state === "menu" && this.isHovering(this.bx, this.by)) {
      this.state = "game"; // switch screen
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