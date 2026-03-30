let shurikenimg;

class Shuriken {
    constructor(x, y, speed, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = 20;
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
    }
    
    update() {
        
        this.x += this.vx;
        this.y += this.vy;
    }
    
    draw() {
        if (!this.active) return;
        if (img) {
            image(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }
}
