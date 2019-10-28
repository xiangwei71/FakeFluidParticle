var particle_fade_rate = 0.1;
var particle_v_boost = 5;

function Particle(pos, v) {
    this.pos = new Vector(pos.x, pos.y);
    this.v = new Vector(v.x, v.y);


    this.update = (dt) => {
        vector_add(this.pos, this.v.multiply(dt), this.pos);

        var active_rate = (1 - particle_fade_rate * dt);
        // drag
        this.v.x = this.v.x * active_rate;
        this.v.y = this.v.y * active_rate;
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