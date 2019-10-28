var Zero = new Vector(0, 0);

//回傳介於-degree/2~degree/2之間的向量
function get_random_vector(degree) {
    var radian = degree * Math.PI / 180;
    var r = Math.random() * radian - 0.5 * radian;

    return new Vector(Math.cos(r), Math.sin(r));
}

function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.set = (x, y) => {
        this.x = x;
        this.y = y;
    }

    this.copy = (v) => {
        this.x = v.x;
        this.y = v.y;
    }

    this.multiply = (s) => {
        return new Vector(s * this.x, s * this.y);
    }

    this.normalized = (out) => {
        var r = this.Len();
        if (r == 0) {
            out.set(Zero.x, Zero.y);
        }

        out.set(this.x / r, this.y / r);
    }

    this.Len = () => {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

function vector_dot(v, v2) {
    return v.x * v2.x + v.y * v2.y;
}

function vector_add(v, v2, result) {
    result.x = v.x + v2.x;
    result.y = v.y + v2.y;
}