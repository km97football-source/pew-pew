class Sprite {
	constructor(originalImage, size, subImages) {
		this.image = originalImage
		this.subImages = subImages
		this.size = size
	}
	
	draw(position, frameIndex = -1) {
		push()
		imageMode(CENTER)

		if (this.subImages) {
			if (frameIndex < 0) {
				frameIndex = Math.round(position.y / 5) % this.subImages.length
			}

			let sub = this.subImages[frameIndex]
			image(this.image, position.x, position.y, this.size, this.size, sub.x, sub.y, sub.w, sub.h)
		}
		else {
			image(this.image, position.x, position.y, this.size, this.size)
		}
		pop()
	}
}

class SubImage {
	constructor(x, y, w, h) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
	}
}

//https://openprocessing.org/sketch/2221200