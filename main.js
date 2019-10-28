function cordinate_remap(x, y, out_v) {
    //轉換座標系
    var v = new Vector(x, y);
    vector_add(v, new Vector(0, canvas.height - 1).multiply(-1), v);
    out_v.set(v.x, -v.y);
}


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
    var P = particle_pool.get_p();
    if (P != null) { //有空位
        P.copy(now_pos, diff.multiply(particle_v_boost))
    }

    // rest pre_pos
    pre_pos.set(now_pos.x, now_pos.y);
}

//global variable
var cell_space = 40;
var dx = 20, dy = 20;
var w = 12, h = 12;
var render;
var particle_pool;

var v_visualize = new Vector(0, 0);
window.onload = () => {

    particle_pool = new ParticlePool();
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

        particle_pool.do_particle_update(dt);
        particle_pool.draw(render);

        window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
}