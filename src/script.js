import {
    BusyComponent
} from './busy.component.js';
import {
    NestedComponent
} from './nested.component.js';

function humanize(bytes) {
    const prefixes = ['GB', 'MB', 'KB', 'B'];
    let prefix = prefixes.length - 1;
    while (bytes > 1024 && prefix >= 0) {
        bytes = bytes / 1024;
        prefix -= 1;
    }

    return `${bytes.toFixed(2)} ${prefixes[prefix]}`;
}

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
        let main = document.querySelector('main');
        main.innerHTML = ''
        this._div = document.createElement('div');
        main.appendChild(this._div);
    }

    run() {
        this._component = new NestedComponent(this._div, 1000);
    }

    tearDown() {
        this._div.innerHTML = '';
        this._component = null;
    }
}

function runExperiment(experimentClass) {
    console.log('Use the debugger to set a breakpoint on this line and then ' +
        'trigger a GC manually using the DevTools');

    const memoryBefore = copyMemoryObject(performance.memory);
    console.log('The heap size limit is', humanize(memoryBefore
        .jsHeapSizeLimit));
    const experiment = new experimentClass();
    experiment.run();
    const memoryPeak = copyMemoryObject(performance.memory);
    experiment.tearDown();
    const memoryAfter = copyMemoryObject(performance.memory);

    const totalHeapSizeGrowth = memoryPeak.totalJSHeapSize - memoryBefore
        .totalJSHeapSize;
    const usedHeapSizeGrowth = memoryPeak.usedJSHeapSize - memoryBefore
        .usedJSHeapSize;

    console.log('total heap size grew by', humanize(totalHeapSizeGrowth));
    console.log('used heap size grew by', humanize(usedHeapSizeGrowth));

    console.log('Use the debugger to set a breakpoint on this line and then ' +
        'trigger a GC manually using the DevTools');

    const memoryAfterGC = copyMemoryObject(performance.memory);
    const collectedMemorySize = memoryPeak.usedJSHeapSize - memoryAfterGC
        .usedJSHeapSize;
    console.log('Memory collected during GC:', humanize(collectedMemorySize));
}

let btn1 = document.querySelector('#btn-1');
btn1.addEventListener('click', () => runExperiment(BusyComponentExperiment));

let btn2 = document.querySelector('#btn-2');
btn2.addEventListener('click', () => runExperiment(NestedComponentExperiment));