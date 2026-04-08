
class GameScreen {
  constructor() {
    this.state = "menu"; 
    this.buttonW = 220;
    this.buttonH = 70;

    this.playAgainX = width / 2;
    this.playAgainY = height / 2 + 110;
    this.mainMenuX = width / 2;
    this.mainMenuY = height / 2 + 10;
    this.instrX = width / 2;
    this.instrY = height / 2 + 210;
    this.backX = width / 2;
    this.backY = height / 2 + 60;
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

      fill(255);
      textSize(60);
      text("Jungle Adventure", width / 2, height / 2 - 100);

      push();
      // hover effect for START
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
      text("START", this.backX, this.backY);

    } else if (this.state === "game") {
      if (gameImg) {
        image(gameImg, 0, 0, width, height);
      }
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
      text("PLAY AGAIN", this.playAgainX, this.playAgainY);

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

    } else if (this.state === "instructions") {
      background(0);
      fill(255);
      textSize(48);
      text("INSTRUCTIONS", width/2, height/2 - 100);

      textSize(24);
      text("Instructions screen (placeholder).\nPress back to return.", width/2, height/2);

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
    if (this.state === "menu" && this.isHovering(this.backX, this.backY)) {
      this.state = "game";
    } else if (this.state === "pause") {
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        this.state = "menu";
      } else if (this.isHovering(this.playAgainX, this.playAgainY)) {
        this.state = "game";
      } else if (this.isHovering(this.instrX, this.instrY)) {
        this.state = "instructions";
      }
    } else if (this.state === "instructions" && this.isHovering(this.backX, this.backY)) {
      this.state = "menu";
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