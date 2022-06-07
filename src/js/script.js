// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const calc = require('./parts/calc.js');
    const form = require('./parts/form.js');
    const modal = require('./parts/modal.js');
    const slider = require('./parts/slider.js');
    const tabs = require('./parts/tabs.js');
    const timer = require('./parts/timer.js');

    calc();
    form();
    modal();
    slider();
    tabs();
    timer();
});

// if ('NodeList' in window && !NodeList.prototype.forEach) {
//     console.info('polyfill for IE11');
//     NodeList.prototype.forEach = function (callback, thisArg) {
//       thisArg = thisArg || window;
//       for (var i = 0; i < this.length; i++) {
//         callback.call(thisArg, this[i], i, this);
//       }
//     };
//   }






// class Options {
//     constructor(height, width, bg, fontSize, textAlign) {
//         this.height = height;
//         this.width = width;
//         this.bg = bg;
//         this.fontSize = fontSize;
//         this.textAlign = textAlign;
//     }
//     createDiv() {
//         let elem = document.createElement('div');
//         document.body.appendChild(elem);
//         let param = `height:${this.height}px; width:${this.width}px; 
//                      background-color:${this.bg}; font-size:${this.fontSize}; text-align:${this.textAlign}`;
//         elem.style.cssText = param;
//     }
// }

// const item = new Options(300, 400, "red", 16, "center");

// item.createDiv();