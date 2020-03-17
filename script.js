function createOneBusyComponent() {

}

function createNestedComponents() {

}

let btn1 = document.querySelector('#btn-1');
btn1.addEventListener('click', createOneBusyComponent);

let btn2 = document.querySelector('#btn-2');
btn2.addEventListener('click', createNestedComponents);
