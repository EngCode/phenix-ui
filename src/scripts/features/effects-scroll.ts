/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Smoth-Scroll
 * ===> 03 - Sticky Elements
 * ===> 04 - Scroll-Spy
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Smoth-Scroll <====*/
PhenixElements.prototype.smothScroll = function (options?:{
    target?:string,
    offset?:number,
}) {
    //====> Loop Through Phenix Elements <====//
    this.on('click', event => {
        //====> Prevent Default Click Behavor <====//
        event.preventDefault();

        //====> Element Data <====//
        let element:HTMLElement = event.target,
            target:HTMLElement  = document.querySelector(options?.target || element.getAttribute('href') || element.getAttribute('data-target')),
            offset:number  = options?.offset || parseInt(element.getAttribute('data-offset')) || 0,
            position:number = target.getBoundingClientRect().top + offset;

        //====> Scroll Animation <====//
        window.scrollTo({
            left : 0,
            top  : position,
            behavior : 'smooth'
        });
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Sticky Elements [un-tested] <====*/
PhenixElements.prototype.sticky = function (options?:{
    type?:string,      //===> Fixed, Sticky
    offset?:number,    //===> Offset Before
    direction?:string, //===> Flow Direction [X, Y]
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach(element => {
        //====> Get Data <====//
        let type   = options?.type || element.getAttribute('data-sticky'),
            offset = options?.offset || parseInt(element.getAttribute('data-offset')) || 0,
            direction = options?.direction;

        //====> Relative to its Parent [workout] <====//
        if (type === 'sticky') element.parentNode.style.transform = "translateZ(0)";

        //====> X Scroll Mode <====//
        if(direction.toLowerCase() === 'x') {
            //====> X Offset <====//
            offset = offset + element.offsetLeft;

            //=== While Window Scrolling ===//
            window.addEventListener('scroll', event => {
                //==== if position matches element Activate ====//
                if (window.scrollX >= offset) element.classList.add('is-sticky'); 
                //==== Otherwise De-Activate ====//
                else element.classList.remove('is-sticky');
            });
        }
        //====> Y Scroll Mode <====//
        else {
            //====> Y Offset <====//
            offset = offset + element.offsetTop;

            //====> Fix Offset Calc <====//
            if (offset < 50) offset = element.offsetTop + 10;
            
            //=== While Window Scrolling ===//
            window.addEventListener('scroll', event => {
                //==== if position matches element Activate ====//
                if (window.scrollY >= offset) element.classList.add('is-sticky'); 
    
                //==== Otherwise De-Activate ====//
                else element.classList.remove('is-sticky');
            });
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Scroll-Spy [un-tested] <====*/
PhenixElements.prototype.scrollSpy = function (active_class?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach(element => {
        //====> Get All Links & Triggers <====//
        let className:string = active_class || 'phenix-active',
            triggers:any = Array.from(element.querySelectorAll('[href], [data-target]'));

        //====> Apply Smoth Scroll <====//
        Phenix(triggers).smothScroll();

        //====> Loop Throgh Links & Triggers <====//
        triggers.forEach(element => {
            //====> Get Data <====//
            let selector = element.getAttribute('href') || element.getAttribute('data-target'),
                activator = () => {
                    //====> if the trigger is item <====//
                    if (element.matches('li')) {
                        //====> Active & Get Siblings <====//
                        let siblings = Phenix(element).addClass(className).siblings();
                        //====> De-Activate Siblings <====//
                        siblings.forEach(sibling => sibling.classList.remove(className));
                    }
                    //====> Otherwise <====//
                    else {
                        //====> Get Item Ancestor <====//
                        let parent = Phenix(element).ancestor('li'),
                            //====> Active & Get Siblings <====//
                            siblings = Phenix(parent).addClass(className).siblings();

                        //====> De-Activate Siblings <====//
                        siblings.forEach(sibling => sibling.classList.remove(className));
                    }
                };

            //====> First View [workout] <====//
            if (Phenix(selector).inView()) activator();

            //====> Check While Scrol if in view-point Activate <====//
            window.addEventListener('scroll', event => Phenix(selector).inView() ? activator() : null);
        });
    });

    //====> Return Phenix Elements <====//
    return this;
}
