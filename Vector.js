var Zero = new Vector(0, 0);

function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.set = (x, y) => {
        this.x = x;
        this.y = y;
    }

    this.multiply = (s) => {
        return new Vector(s * this.x, s * this.y);
    }

    this.normalized = (out) => {
        var r = Math.sqrt(this.x * this.x + this.y * this.y);
        if (r == 0) {
            out.set(Zero.x, Zero.y);
        }

        out.set(this.x / r, this.y / r);
    }
}

function vector_dot(v, v2) {
    return v.x * v2.x + v.y * v2.y;
}

function vector_add(v, v2, result) {
    result.x = v.x + v2.x;
    result.y = v.y + v2.y;
}