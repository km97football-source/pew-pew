class CollisionManager {
  constructor() {
    this.shapes = [];
  }

  addRect(x, y, w, h, color = 'gray') {
    this.shapes.push({ type: 'rect', x, y, w, h, color });
  }

  addCircle(x, y, r, color = 'gray') {
    this.shapes.push({ type: 'circle', x, y, r, color });
  }

  draw() {
    push();
    noStroke();
    for (let shape of this.shapes) {
      fill(shape.color);
      if (shape.type === 'rect') {
        rect(shape.x, shape.y, shape.w, shape.h);
      } else if (shape.type === 'circle') {
        ellipse(shape.x, shape.y, shape.r * 2);
      }
    }
    pop();
  }

  isCircleColliding(cx, cy, radius) {
    for (let shape of this.shapes) {
      if (shape.type === 'rect' && this._circleIntersectsRect(cx, cy, radius, shape)) {
        return true;
      }
      if (shape.type === 'circle' && this._circleIntersectsCircle(cx, cy, radius, shape)) {
        return true;
      }
    }
    return false;
  }

  resolveCircleCollision(x, y, radius, prevX, prevY) {
    if (!this.isCircleColliding(x, y, radius)) {
      return { x, y };
    }

    let xOnlyFree = !this.isCircleColliding(x, prevY, radius);
    let yOnlyFree = !this.isCircleColliding(prevX, y, radius);

    if (xOnlyFree && !yOnlyFree) {
      return { x, y: prevY };
    }
    if (!xOnlyFree && yOnlyFree) {
      return { x: prevX, y };
    }
    if (xOnlyFree && yOnlyFree) {
      let dx = Math.abs(x - prevX);
      let dy = Math.abs(y - prevY);
      return dx > dy ? { x, y: prevY } : { x: prevX, y };
    }

    return { x: prevX, y: prevY };
  }

  _circleIntersectsRect(cx, cy, r, rect) {
    let nearestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
    let nearestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
    let dx = cx - nearestX;
    let dy = cy - nearestY;
    return dx * dx + dy * dy < r * r;
  }

  _circleIntersectsCircle(cx, cy, r, circle) {
    let dx = cx - circle.x;
    let dy = cy - circle.y;
    let distanceSq = dx * dx + dy * dy;
    let radiusSum = r + circle.r;
    return distanceSq < radiusSum * radiusSum;
  }
}