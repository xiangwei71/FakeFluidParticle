var max_count = 3000;

function ParticlePool() {
    this.particles = new Array(max_count);
    this.index = 0;
    this.active_count = 0;
    for (var i = 0; i < max_count; ++i)
        this.particles[i] = new Particle(i);

    this.get_p = () => {
        var counter = 0;
        while (true) {
            // 沒有空的
            if (counter == (max_count - this.active_count))
                break;

            var P = this.particles[this.index];
            this.index = (this.index + 1) % max_count;
            ++counter;
            if (P.active == false) {
                P.active = true;
                this.active_count++;
                return P;
            }
        }
        return null;
    }

    this.reset_p = (index) => {
        var P = this.particles[index];
        P.active = false;
        P.pos.copy(particel_init_pos);

        --this.active_count;
    }

    this.draw = (render) => {
        for (var i = 0; i < this.particles.length; ++i) {
            var P = this.particles[i];
            if (!P.active)
                continue;

            P.v.normalized(v_visualize);
            render.draw_vector(P.pos, v_visualize);
            // render.draw_vector(P.pos, P.v);
        }
    }

    this.do_particle_update = (dt) => {
        for (var i = 0; i < this.particles.length; ++i) {
            var P = this.particles[i];

            if (!P.active)
                continue;

            P.update(dt, this);
            P.boundary_condition(0, canvas.width - 1, 0, canvas.height - 1);
        }
        console.log(this.active_count);
    }
}