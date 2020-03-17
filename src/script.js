import {
    BusyComponent
} from './busy.component.js';

function copyMemoryObject({
    jsHeapSizeLimit,
    totalJSHeapSize,
    usedJSHeapSize
}) {
    return {
        jsHeapSizeLimit,
        totalJSHeapSize,
        usedJSHeapSize
    };
}

class BusyComponentExperiment {
    constructor() {
        let main = document.querySelector('main');
        main.innerHTML = '';
        this._div = document.createElement('div');
        main.appendChild(this._div);
    }

    run() {
        let component = new BusyComponent(this._div);
    }

    tearDown() {
        this._div.innerHTML = '';
    }
}

class NestedComponentExperiment {
    constructor() {

    }
}

function runExperiment(experimentClass) {
    const memoryBefore = copyMemoryObject(performance.memory);
    const experiment = new experimentClass();
    experiment.run();
    const memoryPeak = copyMemoryObject(performance.memory);
    experiment.tearDown();
    const memoryAfter = copyMemoryObject(performance.memory);

    console.log('memory before the experiment', memoryBefore);
    console.log('memory at peak', memoryPeak);
    console.log('memory after the experiment', memoryAfter);
}

let btn1 = document.querySelector('#btn-1');
btn1.addEventListener('click', () => runExperiment(BusyComponentExperiment));

let btn2 = document.querySelector('#btn-2');
btn2.addEventListener('click', () => runExperiment(NestedComponentExperiment));