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

var find_E = new Vector(-100, -100);
//已知問題：滑鼠點擊和實際上有落差(會偏向右下)
var click_mark = new Vector(-100, -100);
function canvas_onmousedown(event) {
    var x = event.clientX;
    var y = event.clientY;
    cordinate_remap(x, y, pre_pos);

    moving = true;

    click_mark.copy(pre_pos);
    //測試KDTree find
    kd_tree.find_closest(pre_pos.x, pre_pos.y, (curl_P) => {
        var V = new Vector(0, 0);
        vector_minus(pre_pos, curl_P.pos, V);
        var find_it = (V.Len() < curl_P.R);
        find_E = curl_P.pos;

        return find_it;
    });
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
    var P = particle_pool.get_P();
    if (P != null) { //有空位
        P.copy(now_pos, diff.multiply(particle_v_boost))
    }

    // rest pre_pos
    pre_pos.set(now_pos.x, now_pos.y);
}

//global variable
var render;
var particle_pool;
var kd_tree;

function get_random_pos() {
    return new Vector(Math.random() * canvas.width, Math.random() * canvas.height);
}

window.onload = () => {
    render = new Render(canvas);
    particle_pool = new ParticlePool(3000);

    //test KDTree(使用CurlParticle)
    var list = [];
    for (var i = 0; i < 16; ++i) {
        var p = get_random_pos();
        var crul_P = new CurlParticle(p.x, p.y, Math.random() * 50, Math.random() * 40 + 10, Math.random() > 0.5 ? -1 : 1);
        list.push(crul_P);
    }

    kd_tree = new KDTree();
    kd_tree.build(list, (a, b) => { return a.pos.x - b.pos.x; }, (a, b) => { return a.pos.y - b.pos.y; }, (E) => { return E.pos.x; }, (E) => { return E.pos.y; });

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

        //render.draw_point(curl.pos, curl.R);
        for (var i = 0; i < list.length; ++i)
            render.draw_point(list[i].pos, list[i].R);

        kd_tree.draw(render, canvas.width, canvas.height);
        render.draw_point(find_E, 10);
        render.draw_point(click_mark, 10);

        window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);
}