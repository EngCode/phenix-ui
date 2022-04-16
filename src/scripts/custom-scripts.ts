/*===================================
=                                   =
=  - !Hello There                   =
=  - this is Your working space     =
=  - here you can customize phenix  =
=  - to your app ui design needs    =
=  - Good Luck :)                   =
=                                   =
===================================*/

/*====> Import Phenix <====*/
import Phenix from '.';

//======> D.O.M is Ready [for you] <=======//
Phenix(document).ready((event:any) => {
    //====> Sticky Header <====//
    Phenix('.main-header').sticky();

    //====> Navigation Menu <====//
    Phenix('.px-navigation').menu();

    //====> Media Activate <====//
    Phenix('.px-media').multimedia();

    //====> Sliders Activate <====//
    Phenix('.px-slider').slider();

    //====> Popups Activate <====//
    Phenix('.px-modal').popup();

    //====> Dynamic Word Coloring <====//
    Phenix('body:not(.wp-admin) .colored-word').forEach((title:HTMLElement) => {
        //====> Setup Properties <====//
        var titleContent = title.innerHTML,
            word_array = titleContent.split(/[ ]+/),
            lastword  = word_array.splice(-1);
        //====> Return Title <====//
        let theResult = `${word_array} <span class="primary-color">${lastword}</span>`;
        title.innerHTML = theResult.replace(/,/g, ' ');
    });

    //====> FAQS <====//
    Phenix('.accordion-item .accordion-title').accordion();

    //====> H1 Fix <====//
    let headline = document.querySelector('h1');
    if(headline !== null) Phenix('.main-header').insert('append', `<h1 class="hidden">${document.title}</h1>`);
}).utilities('all').copyrights(`Untitled`).lazyLoading();