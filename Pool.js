// object 一定要有index和active屬性
function Pool(max_count, create_obj_callback) {
    this.max_count = max_count;
    this.index = 0;
    this.active_count = 0;
    this.elements = new Array(max_count);
    for (var i = 0; i < max_count; ++i) {
        this.elements[i] = create_obj_callback(i);
    }

    this.get = () => {
        var counter = 0;
        while (true) {
            // 沒有空的
            if (counter == (max_count - this.active_count))
                break;

            var E = this.elements[this.index];
            this.index = (this.index + 1) % max_count;
            ++counter;
            if (E.active == false) {
                E.active = true;
                this.active_count++;
                return E;
            }
        }
        return null;
    }

    this.reset = (index) => {
        --this.active_count;

        var E = this.elements[index];
        E.active = false;
        return E;
    }

    this.foreach = (callback) => {
        for (var i = 0; i < this.elements.length; ++i) {
            var E = this.elements[i];
            if (!E.active)
                continue;

            callback(E);
        }
    }
}