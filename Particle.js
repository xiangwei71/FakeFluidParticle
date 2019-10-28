var particle_fade_rate = 0.01;
var particle_v_boost = 5;
var particle_small_r = 0.1;
var particel_init_pos = new Vector(-10, -10);

function Particle(index) {
    this.index = index;
    this.pos = new Vector(particel_init_pos.x, particel_init_pos.y);
    this.v = new Vector(0, 0);
    this.active = false;
    this.curl = null;
    this.strength = 0;

    this.copy = (pos, v) => {
        this.pos.copy(pos);
        this.v.copy(v);
    }


    this.update = (dt, pool) => {
        // test if in curl
        var in_curl = curl.in_range(this.pos);
        if (in_curl) {
            this.curl = curl;
            this.strength = this.v.Len();
        }


        if (this.curl != null) {
            this.curl.update_pos(this, dt);
        }
        else
            vector_add(this.pos, this.v.multiply(dt), this.pos);

        var active_rate = (1 - particle_fade_rate * dt);
        // drag
        this.v.x = this.v.x * active_rate;
        this.v.y = this.v.y * active_rate;


        // reset
        if (this.v.Len() < particle_small_r) {
            pool.reset_P(this.index);
        }
    }

    this.split = () => {

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