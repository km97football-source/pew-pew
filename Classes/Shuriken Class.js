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
    
    update(collisionManager) {
        let prevX = this.x;
        let prevY = this.y;
        
        this.x += this.vx;
        this.y += this.vy;

        // Resolve collision with obstacles
        if (collisionManager) {
            let resolved = collisionManager.resolveCircleCollision(this.x, this.y, this.size / 2, prevX, prevY);
            
            // If position changed from attempted position, shuriken hit obstacle
            if (resolved.x !== this.x || resolved.y !== this.y) {
                this.active = false;
                return;
            }
            
            this.x = resolved.x;
            this.y = resolved.y;
        }

        // Remove shuriken if it goes off screen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
            this.active = false;
        }
    }
    
    draw() {
        if (!this.active) return;

        let frameIndex = Math.floor(this.frameCounter / this.frameRate) % this.sprite.subImages.length;
        this.frameCounter++;
        
        this.sprite.draw({x: this.x, y: this.y}, frameIndex);
    }
}
