let shurikenimg;

class Shuriken {
    constructor(x, y, speed, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = 15;
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
			new SubImage(0, 10, 128, 118),
			new SubImage(0, 10, 128, 118),
			new SubImage(0, 10, 128, 118),
		])
    }
    
    update() {
        
        this.x += this.vx;
        this.y += this.vy;
    }
    
    draw() {
        if (!this.active) return;

        if (img) {
            noStroke();
            image(img, this.x - this.size / 2, this.y - this.size / 2, this.size * 5, this.size * 5);
        }
    }
}
