/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Animations
 * ===> 03 - Get Options Data
 * ===> 04 - Animations Loader
 * ===> 05 - Directions Resolve
 * ===> 06 - Hide the Element
 * ===> 07 - Animate Method
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Animations <====*/
PhenixElements.prototype.animations = function (options?:{
    animation?:string, //===> Animation Name
    duration?:number,  //===> Animation Duration
    delay?:number,     //===> Animation Delay
    animateCSS?:boolean, //===> Animations Library
    directionFix?:boolean, //===> Directions Resolver
    flow:string,    //====> From Top to Bottom [start] Reverse [end] Or Any of [both]
    into:number,    //====> Increase Target Position By [number]
    offset:number,  //====> Decrease Target Position By [number]
    lazyloading:boolean, //====> to Animate Element after Another
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any, index) => {
        //====> Get Options Data <====//
        let animation = element.getAttribute('data-animation') || options?.animation || '',
            duration  = parseInt(element.getAttribute('data-duration')) || options?.duration || 1000,
            delay  = parseInt(element.getAttribute('data-delay'))  || options?.delay || 0,
            flow   = parseInt(element.getAttribute('data-flow'))   || options?.flow || false,
            offset = parseInt(element.getAttribute('data-offset')) || options?.offset || false,
            into   = parseInt(element.getAttribute('data-into'))   || options?.into  || false,
            directionFix = options?.directionFix || true,
            thirdParty = options?.animateCSS || true;

        //====> Animations Loader <====//
        if (thirdParty && !document.querySelector('#px-animations')) {
            Phenix('head').insert('append', `<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css" rel="stylesheet" id="px-animations" />`);
        }

        //====> Directions Resolve <====//
        if (directionFix) {
            //====> LTR <====//
            if (Phenix(document).direction() === 'ltr') {
                if (animation.includes('Start')) {
                    animation = animation.replace('Start', 'Left');
                } else if (animation.includes('End')) {
                    animation = animation.replace('End', 'Right');
                }
            //====> RTL <====//
            } else {
                if (animation.includes('Start')) {
                    animation = animation.replace('Start', 'Right');
                } else if (animation.includes('End')) {
                    animation = animation.replace('End', 'Left');
                }
            }
        }

        //====> Hide the Element <====//
        Phenix(element).addClass('visibility-hidden');

        //====> if the Element in view Show it <====//
        let isInView = () => {
            //====> Animate Method <====//
            let animate = () => {
                //====> Show the Element <====//
                Phenix(element).removeClass('visibility-hidden');
        
                //====> Animations CSS <====//
                Phenix(element).addClass('view-active').css({
                    "animation-name" : `${animation}`,
                    "animation-duration" : `${duration}ms`,
                    "animation-delay" : `${delay}ms`,
                });
            }
            //====> Check for View <====//
            if (Phenix(element).inView({
                offset : offset,
                into   : into,
                flow   : flow,
            })) {
                //====> Animate One After the Other <====//
                if (options?.lazyloading) {
                    let prev_element = index-1;
                    //====> Listen for Animation Ends <====//
                    if (index > 0) {
                        this[prev_element].addEventListener('animationend', () => animate());
                    } else {
                        animate();
                    }
                //====> Animate When Ever it Shows <====//
                } else {
                    animate();
                }
            }
        };

        //====> First Activation <====//
        isInView();

        //====> Scrolling Spy <====//
        Phenix(window).on('scroll', isInView);
    });

    //====> Return Phenix Elements <====//
    return this;
}