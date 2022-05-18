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
    logical_directions?:boolean, //===> Directions Resolver
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any) => {
        //====> Get Options Data <====//
        let animation = element.getAttribute('data-animation') || options?.animation || '',
            duration  = parseInt(element.getAttribute('data-duration')) || options?.duration || 1000,
            delay     = parseInt(element.getAttribute('data-delay')) || options?.delay  || 0,
            directionFix = options?.logical_directions || true,
            thirdParty = options?.animateCSS || true;

        //====> Animations Loader <====//
        if (thirdParty && !document.querySelector('#px-animations')) {
            Phenix('head').insert('append', `<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" id="px-animations" />`);
        }

        //====> if the Element in view Show it <====//
        let isInView = () => {
            //====> Directions Resolve <====//
            if (directionFix && animation.includes('Start' || 'End')) {
                //====> LTR <====//
                if (Phenix(document).direction() === 'ltr') {
                    animation.replace('Start', 'Left');
                    animation.replace('End', 'Right');
                    //====> RTL <====//
                } else {
                    animation.replace('Start', 'Right');
                    animation.replace('End', 'Left');
                }
            }

            //====> Animate <====//
            if (Phenix(element).inView()) Phenix(element).addClass('view-active').css({
                "animation-name" : `${animation}`,
                "animation-duration" : `${duration}ms`,
                "animation-delay" : `${delay}ms`,
            });
        };

        //====> First Activation <====//
        isInView();

        //====> Scrolling Spy <====//
        Phenix(window).on('scroll', isInView);
    });

    //====> Return Phenix Elements <====//
    return this;
}