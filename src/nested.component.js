class NestedComponent {
    constructor(targetElement, depth) {
        this._depth = depth;
        this._element = document.createElement('div');
        this._element.innerText = depth;
        this._payload = Array(256).fill(depth);

        targetElement.appendChild(this._element);

        if (depth >= 0) {
            this._child = new NestedComponent(this._element, depth - 1);
        }
    }
}

export {
    NestedComponent
};