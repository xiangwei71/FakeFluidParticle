function Render(canvas) {
    this.canvas = canvas;
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.ctx.strokeStyle = '#ffff00';

    this.clear = () => {
        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
    }

    this.set_stroke_color = (color) => {
        this.ctx.strokeStyle = color;
    }

    this.draw_point = (v, size) => {
        var point = this.remap_to_screen_pos(v);

        this.ctx.beginPath();
        this.ctx.arc(point[0], point[1], size, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    this.draw_vector = (from, v) => {
        var point = this.remap_to_screen_pos(from);
        var vector = this.remap_to_screen_vector(v);

        this.ctx.beginPath();
        this.ctx.moveTo(point[0], point[1]);
        this.ctx.lineTo(point[0] + vector[0], point[1] + vector[1]);
        this.ctx.stroke();
    }

    this.remap_to_screen_pos = (v) => {
        // new Vector(1, 0) * a + (0, -1) * b + (0, 511);
        // = (a,-b+511)
        var sx = v.x;
        var sy = -v.y + this.canvas_height - 1;
        return [sx, sy];
    }

    this.remap_to_screen_vector = (v) => {
        // new Vector(1, 0) * a + (0, -1) * b ;
        // = (a,-b)
        var sx = v.x;
        var sy = -v.y;
        return [sx, sy];
    }
}