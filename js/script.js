
'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';


        import tabs from './modules/tabs';
        import modal, { openModal } from './modules/modal';
        import timer from './modules/timer';
        import slider from './modules/slider';
        import forms from './modules/forms';
        import cards from './modules/cards';
        import calc from './modules/calc';

window.addEventListener("DOMContentLoaded", function(){
   
  
    const modalTimer = setTimeout(() => openModal("[data-modalWindow]", modalTimer), 50000); 

    tabs(".tabcontent", ".tabheader__items", ".tabheader__item", 'tabheader__item_active');
    modal("[data-modal]", "[data-modalWindow]", modalTimer);
    timer(".timer", "2020-08-30");
    slider({
        container : '.offer__slider', 
        slides : '.offer__slide',
        prevArrow : '.offer__slider-prev',
        nextArrow : '.offer__slider-next',
        currentCounter : '#current',
        totalCounter : '#total',
        wrapper : '.offer__slider-wrapper',
        sliderWindow : '.offer__slider__inner'
    });
    forms(modalTimer);
    cards();
    calc();
});
