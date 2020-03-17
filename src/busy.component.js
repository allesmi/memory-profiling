class BusyComponent {
    constructor(targetElement) {
        let div = document.createElement('div');
        div.innerText = 'this is a div';
        targetElement.appendChild(div);

        for (let i = 0; i < 10000; i++) {
            div.addEventListener('click', this.newClickHandler());
        }
    }

    newClickHandler() {
        return () => console.log('click handler fired');
    }
}

export {
    BusyComponent
};