function cordinate_remap(x, y, out_v) {
    //轉換座標系
    var v = new Vector(x, y);
    vector_add(v, new Vector(0, canvas.height - 1).multiply(-1), v);
    out_v.set(v.x, -v.y);
}

var particles = [];
var now_pos = new Vector(0, 0);
var pre_pos = new Vector(0, 0);
var diff = new Vector(0, 0);
var moving = false;
function canvas_onmousedown(event) {
    var x = event.clientX;
    var y = event.clientY;
    cordinate_remap(x, y, pre_pos);

    moving = true;
}

function canvas_onmouseup(event) {
    moving = false;
}

function canvas_onmousemove(event) {
    if (!moving)
        return;

    var x = event.clientX;
    var y = event.clientY;
    cordinate_remap(x, y, now_pos);

    // create particle by now_pos and diff
    diff.set(now_pos.x - pre_pos.x, now_pos.y - pre_pos.y);
    var P = new Particle(now_pos, diff);
    particles.push(P);

    // rest pre_pos
    pre_pos.set(now_pos.x, now_pos.y);
}

//global variable
var cell_space = 40;
var dx = 20, dy = 20;
var w = 12, h = 12;
var render;

function do_particle_update(dt) {
    for (var i = 0; i < particles.length; ++i) {
        var P = particles[i];
        P.update(10 * dt);
    }
}

window.onload = () => {
    render = new Render(canvas);

    var pre_time = new Date().getTime();
    var sum_time = 0;

    var update = () => {

        // get dt
        var now_time = new Date().getTime();
        var dt = (now_time - pre_time) / 1000;
        pre_time = now_time;
        sum_time += dt;

        //清空畫布
        render.clear();

        do_particle_update(dt);
        for (var i = 0; i < particles.length; ++i) {
            var P = particles[i];
            render.draw_vector(P.pos, P.v);
        }

        window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
}