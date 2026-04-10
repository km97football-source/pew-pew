
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
    
    // Instruction screen tracking
    this.instrPage = 1;
    this.totalInstrPages = 2;
    this.leftArrowX = 50;
    this.leftArrowY = height / 2;
    this.rightArrowX = width - 50;
    this.rightArrowY = height / 2;
    this.arrowSize = 40;
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
      if (shop) {
        shop.display(this);
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
    }   else if (this.isHovering(this.howToX, this.howToY)){
      this.state = "instructions";
    }else if (this.state === "pause") {
    } else if (this.state === "shop") {
      if (shop) {
        shop.handleClick(mouseX, mouseY, this);
      }
    } else if (this.state === "pause") {
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        this.state = "menu";
      } else if (this.isHovering(this.playAgainX, this.playAgainY)) {
        this.state = "game";
      } else if (this.isHovering(this.instrX, this.instrY)) {
        this.state = "instructions";
      } 
    } else if (this.state === "gameover") {
      if (this.isHovering(this.mainMenuX, this.mainMenuY)) {
        this.state = "menu";
      } else if (this.isHovering(this.playAgainX, this.playAgainY)) {
        this.state = "game";
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
}