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
import Phenix, { PhenixElements } from "..";

/*====> Phenix Blocks Script <====*/
PhenixElements.prototype.init = function (scripts?:[]) {
    //===> Smooth Scroll <====//
    Phenix('a[href^="#"]').smothScroll();

    /*====> Add Data Options to un-reachable Elements <====*/
    Phenix(`[data-add-options]`).forEach((element:HTMLElement) => {
        //===> Get Data Options <====//
        let dataOptions = JSON.parse(element.getAttribute('data-add-options'));
        //===> Add Data Options the Elements <====//
        Object.entries(dataOptions).forEach(([selector, options]) => {
            //===> Get Selector <====//
            element.querySelectorAll(`.${selector}`).forEach((item:HTMLElement) => {
                //===> Add Data Options to Elements <====//
                Object.entries(options).forEach(([attribute, value]) => item.setAttribute(`${attribute}`, value));
            });
        });
    });

    //====> Validation Demo <====//
    Phenix('.wpcf7-form').validation();

    //====> Sticky Header Fixes <====//    
    if (Phenix('[data-sticky="absolute"]')[0]) {
        //===> Define Data <===//
        const stickyHeader = Phenix('[data-sticky="absolute"]'),
              headerHeight = stickyHeader.height();

        //====> Full Screen Fixes <====//
        Phenix('.full-screen').forEach((element:HTMLElement) => {
            //===> Check for Row Element and Padding <====//
            let rowElement:HTMLElement = element.querySelector('[class*="row"]') || element.querySelector('[class*="flexbox"]'),
                hasPadding = [Phenix(element).getCSS('padding-top'), Phenix(element).getCSS('padding-bottom')],
                paddingValue:any = 0; hasPadding.forEach((value:string) => paddingValue += parseInt(value));

            console.log(hasPadding);
            //===> Set Height <===//
            element.style.minHeight = `calc(100vh - ${headerHeight+paddingValue}px)`;
            if (rowElement) rowElement.style.minHeight = `calc(100vh - ${headerHeight+paddingValue}px)`;
        });

        Phenix('.full-screen-wide').forEach((element:HTMLElement) => {
            //===> Check for Row Element and Padding <====//
            let rowElement:HTMLElement = element.querySelector('[class*="row"]') || element.querySelector('[class*="flexbox"]'),
                hasPadding = [Phenix(element).getCSS('padding-top'), Phenix(element).getCSS('padding-bottom')],
                paddingValue:any = 0; hasPadding.forEach((value:string) => paddingValue += parseInt(value));

            //===> Set Height <===//
            element.style.minHeight = `calc(85vh - ${headerHeight+paddingValue}px)`;
            if (rowElement) rowElement.style.minHeight = `calc(85vh - ${headerHeight+paddingValue}px)`;
        });
    }

    //===> Sticky Elements <====//
    Phenix("[data-sticky").sticky();

    //===> Element Overlap <===//
    Phenix(".pos-overlap").forEach((element:HTMLElement) => {
        let height = Phenix(element).height(),
            nextEl = Phenix(element).next() || Phenix(element.parentNode).next(),
            nextElPadding = nextEl ? Phenix(nextEl).getCSS("paddingTop") : 0;
        //===> Element CSS <===//
        element.style.marginBottom = `-${height}px`;
        if(nextEl) Phenix(nextEl).css({'padding-top': `${height+parseInt(nextElPadding)}px`});
    });

    //====> Sliders <====//
    Phenix('.px-slider').slider();

    //====> Multimedia <====//
    Phenix('.px-media').multimedia();

    //===> Phenix Menu <===//
    Phenix('.px-navigation').menu();

    //====> Dropdown Buttons <====//
    Phenix('.px-dropdown').dropdown();

    //===> Lightbox Images <===//
    Phenix('.lightbox-image img').forEach((image:HTMLElement) => {
        image.classList.add('px-lightbox');
        image.classList.add('mouse-pointer');
        image.setAttribute('data-src', image.getAttribute('src'));
    });

    //====> Popups <====//
    Phenix('.px-modal').popup();

    //===> Animations <===//
    Phenix('[data-animation], .px-animate').animations({animateCSS: ["fading", "sliding", "zooming", "utilities"]});

    //====> Activate Select <====//
    Phenix('.px-select').select();

    //===> .Others. <===//
    Phenix(document).utilities();
}