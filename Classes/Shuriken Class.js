let shurikenimg;

function preload() {
    img = loadImage('assests/169-1698857_water-shuriken-water-shuriken-png-transparent-png.png');
}

class Shuriken extends Arrow {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
        this.size = 20;
        this.active = true;
    }
    draw() {
        if (!this.active) return;
        image(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
}
}
//image(img, 0, 0, 25, 25);