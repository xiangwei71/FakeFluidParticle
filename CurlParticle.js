var curl = new CurlParticle(225, 160, 50, 50, -1);

function complex_multiply(c1, c2) {
    var x = c1.x;
    var y = c1.y;
    var a = c2.x;
    var b = c2.y;
    return new Vector(a * x - b * y, a * y + b * x);
}

function CurlParticle(x, y, strength, R, rot) {
    this.pos = new Vector(x, y);
    this.strength = strength;
    this.R = R;
    this.rot = rot; //決定轉動的方向(1:逆時針)

    this.in_range = (p) => {
        var v = new Vector(this.pos.x - p.x, this.pos.y - p.y);
        var len = v.Len();
        return len < this.R;
    }

    this.update_pos = (P, dt) => {

        var attract_v = new Vector(this.pos.x - P.pos.x, this.pos.y - P.pos.y);
        var len = attract_v.Len();
        attract_v.normalized(attract_v);
        var tangent = new Vector(attract_v.y * this.rot, -attract_v.x * this.rot);
        tangent = tangent.multiply(this.strength);

        //擾動一下tangent
        tangent = complex_multiply(tangent, get_random_vector(30));

        P.v.copy(tangent);

        P.pos.x += tangent.x * dt;
        P.pos.y += tangent.y * dt;
    }
}