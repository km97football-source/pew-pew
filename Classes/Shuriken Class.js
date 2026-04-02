class Shuriken {
    constructor(x, y, speed, targetX, targetY) {
        this.x = x ;
        this.y = y;
        this.speed = speed;
        this.size = 50;
        this.active = true;
        
        let dx = targetX - x;
        let dy = targetY - y;
        let magnitude = sqrt(dx * dx + dy * dy);
        
        if (magnitude > 0) {
            this.vx = (dx / magnitude) * speed;
            this.vy = (dy / magnitude) * speed;
        } else {
            this.vx = speed;
            this.vy = 0;
        }

        this.sprite = new Sprite(shurikenimg, this.size, [
			new SubImage(0, 32, 31, 32),
			new SubImage(30, 32, 31, 32),
		])
        this.frameCounter = 0;
        this.frameRate = 7;
    }
    
    update() {
        
        this.x += this.vx;
        this.y += this.vy;
    }
    
    draw() {
        if (!this.active) return;

        let frameIndex = Math.floor(this.frameCounter / this.frameRate) % this.sprite.subImages.length;
        this.frameCounter++;
        
        this.sprite.draw({x: this.x, y: this.y}, frameIndex);
    }
}
