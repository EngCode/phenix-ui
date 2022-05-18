/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Animated Counter
 * ===> 03 - Get Options Data
 * ===> 04 - Counter Data
 * ===> 05 - Count Runer
 * ===> 06 - Start Counting
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
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any) => {
        //====> Get Options Data <====//
        let animation = element.getAttribute('data-animation') || options?.animation || '',
            duration  = parseInt(element.getAttribute('data-duration')) || options?.duration || 1000,
            delay     = parseInt(element.getAttribute('data-delay')) || options?.delay  || 0,
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
                if (animation.includes('Start')) animation = animation.replace('Start', 'Left');
                else if (animation.includes('End')) animation.replace('End', 'Right');
                //====> RTL <====//
            } else {
                if (animation.includes('Start')) animation = animation.replace('Start', 'Right');
                else if (animation.includes('End')) animation.replace('End', 'Left');
            }
        }

        //====> Hide the Element <====//
        Phenix(element).addClass('visibility-hidden');

        //====> if the Element in view Show it <====//
        let isInView = () => {
            //====> Animate <====//
            if (Phenix(element).inView()) {
                //====> Show the Element <====//
                Phenix(element).removeClass('visibility-hidden');

                //====> Animations CSS <====//
                Phenix(element).addClass('view-active').css({
                    "animation-name" : `${animation}`,
                    "animation-duration" : `${duration}ms`,
                    "animation-delay" : `${delay}ms`,
                });
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