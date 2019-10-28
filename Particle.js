function Particle(pos, v) {
    this.pos = new Vector(pos.x, pos.y);
    this.v = new Vector(v.x, v.y);
    this.drag_scale = 0.99;

    this.update = (dt) => {
        vector_add(this.pos, this.v.multiply(dt), this.pos);

        // drag
        this.v.x = this.v.x * this.drag_scale;
        this.v.y = this.v.y * this.drag_scale;
    }

    this.boundary_condition = (min_x, max_x, min_y, max_y) => {
        if (this.pos.x > max_x) {
            this.pos.x = max_x;
            this.v.x = -this.v.x;
        } else if (this.pos.x < min_x) {
            this.pos.x = min_x;
            this.v.x = -this.v.x;
        } else if (this.pos.y < min_y) {
            this.pos.y = min_y;
            this.v.y = -this.v.y;
        } else if (this.pos.y > max_y) {
            this.pos.y = max_y;
            this.v.y = -this.v.y;
        }

    }
}