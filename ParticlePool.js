var v_visualize = new Vector(0, 0);

function ParticlePool(max_count) {
    this.pool = new Pool(max_count, (index) => { return new Particle(index); });

    this.get_P = () => {
        return this.pool.get();
    }

    this.reset_P = (index) => {
        var E = this.pool.reset(index);
        E.pos.copy(particel_init_pos);
    }

    this.draw = (render) => {
        this.pool.foreach((P) => {
            P.v.normalized(v_visualize);
            render.draw_vector(P.pos, v_visualize);
            // render.draw_vector(P.pos, P.v);
        });
    }

    this.do_particle_update = (dt) => {
        this.pool.foreach((P) => {
            P.update(dt, this);
            P.boundary_condition(0, canvas.width - 1, 0, canvas.height - 1);
        });

        //console.log(this.pool.active_count);
    }
}