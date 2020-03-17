class BusyComponent {
    constructor(targetElement) {
        let div = document.createElement('div');
        targetElement.appendChild(div);

        for (let i = 0; i < 10000; i++) {
            div.addEventListener('click', this.clickHandler);
        }
    }

    clickHandler() {
        console.log('clicked!');
    }
}

export {
    BusyComponent
};