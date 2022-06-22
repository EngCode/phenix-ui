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
    let viewPort_Handler = this.forEach((element:any, index) => {
        //====> if its the Main Document Return Nothing <====//
        if (element === window.document) return;

        //====> Get Options Data <====//
        let animation = element.getAttribute('data-animation') || options?.animation || 'fadeIn',
            duration  = parseInt(element.getAttribute('data-duration')) || options?.duration,
            delay  = parseInt(element.getAttribute('data-delay'))  || options?.delay,
            flow   = parseInt(element.getAttribute('data-flow'))   || options?.flow || false,
            offset = parseInt(element.getAttribute('data-offset')) || options?.offset || false,
            into   = parseInt(element.getAttribute('data-into'))   || options?.into  || false,
            directionFix = options?.directionFix || true;

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
        element.classList.add('visibility-hidden', 'animated');

        //====> if the Element in view Show it <====//
        let isInView = () => {
            //====> Animate Method <====//
            let animate = () => {
                //====> Show the Element <====//
                Phenix(element).removeClass('visibility-hidden');
        
                //====> Animations CSS <====//
                element.classList.add('view-active', animation)
                if (delay) element.style.setProperty('--animate-delay', `${delay}ms`);
                if (duration) element.style.setProperty('--animate-duration', `${duration}ms`);
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

    //====> Animations Loader <====//
    let thirdParty:any = options?.animateCSS || 'all';

    //====> Loading Handler <====//
    let animation_loader = (package_name, id) => {
        if (document.querySelector(`#px-animations${id}`)) return;

        //===> Create Script Element <===//
        let animations_loader = document.createElement("link"),
            package_url = `https://cdn.jsdelivr.net/npm/phenix-ui@0.6.5/dist/css/animations/${package_name}.css`;

        //===> Set Attributes <===//
        animations_loader.setAttribute('id', `px-animations${id}`);
        animations_loader.setAttribute('rel', 'stylesheet');

        //===> Set Source <===//
        animations_loader.setAttribute("href", package_url);

        //===> Append Script <===//
        document.head.appendChild(animations_loader);

        //====> When Loaded Run Sliders <====//
        animations_loader.addEventListener("load", () => viewPort_Handler);
    
        //====> When Error Re-Load <====//
        animations_loader.addEventListener("error", () => animations_loader.setAttribute("href", package_url));
    }
    
    //====> Load All Animations <====//
    if (thirdParty.includes('all')) {
        animation_loader('all', '');
    }

    //====> Load Packages one by one <====//
    else {
        thirdParty.forEach(animate_package => animation_loader(animate_package, `-${animate_package}`));
        animation_loader('utilities', '-utilities');
    }

    //====> Return Phenix Elements <====//
    return this;
}