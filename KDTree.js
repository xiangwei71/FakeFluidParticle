/**
 * 
 * @param {*} element object
 * @param {*} x_split true or false 
 * @param {*} get_value_callback for space partition 
 */
function KDTreeNode(element, x_split, get_value_callback) {
    this.element = element;
    this.x_split = x_split;
    this.left_child = null;
    this.right_child = null;
    this.get_value_callback = get_value_callback;

    this.get_value = () => {
        return get_value_callback(this.element);
    }
}

function KDTree() {
    this.node = null;
    this.x_split = true;
    this.build = (list, sort_x_callback, sort_y_callback, get_x_callback, get_y_callback) => {
        this.x_split = true;
        this.node = this.split(list, sort_x_callback, sort_y_callback, get_x_callback, get_y_callback)
    }

    this.split = (list, sort_x_callback, sort_y_callback, get_x_callback, get_y_callback) => {
        if (list.length == 0) {
            // console.log("null");
            return null;
        }

        if (list.length == 1) {
            // console.log("one");
            return KDTreeNode(list[0], this.x_split, this.x_split ? get_x_callback : get_y_callback);
        }

        //找出中間，分2堆
        list.sort((a, b) => {
            if (this.x_split)
                return sort_x_callback(a, b);
            else
                return sort_y_callback(a, b);
        });

        var index = Math.floor(list.length / 2);
        var node = new KDTreeNode(list[index], this.x_split, this.x_split ? get_x_callback : get_y_callback);

        this.x_split = !this.x_split;
        node.left_child = this.split(list.slice(0, index), sort_x_callback, sort_y_callback, get_x_callback, get_y_callback);
        node.right_child = this.split(list.slice(index + 1), sort_x_callback, sort_y_callback, get_x_callback, get_y_callback);
        this.x_split = !this.x_split;
        return node;
    }

    this.draw_node = (node, render) => {
        if (node.x_split) {
            var x = node.get_value();
            render.draw_vector(new Vector(x, 10), new Vector(0, 600));
        } else {
            var y = node.get_value();
            render.draw_vector(new Vector(10, y), new Vector(600, 0));
        }

        if (node.left_child)
            this.draw_node(node.left_child, render);

        if (node.right_child)
            this.draw_node(node.right_child, render);
    }

    this.draw = (render) => {
        this.draw_node(this.node, render);
    }
}