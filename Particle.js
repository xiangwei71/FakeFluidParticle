function Particle(pos, v) {
    this.pos = new Vector(pos.x, pos.y);
    this.v = new Vector(v.x, v.y);

    this.update = (dt) => {
        vector_add(this.pos, this.v.multiply(dt), this.pos);
    }
}