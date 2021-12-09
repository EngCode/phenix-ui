/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Dropdown
 * ===> 03 - Default Options
 * ===> 04 - Set Trigger Accessibility
 * ===> 05 - When Click on the Trigger
 * ===> 06 - De-Activate Other
 * ===> 07 - Activat Button and List
 * ===> 08 - De-Activate on Blank
 * ===> 09 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Dropdown [Un-Tested] <====*/
PhenixElements.prototype.dropdown = function (options?:{
        target?:string,  //====> Target to Toggle (add/remove) Active Class
        active?:string,  //====> Active Class Name : phenix-active
        exclude?:string, //====> Exclude from on Blank Click only [CSS :not()... Selector]

        //====> Hide/Show Toggle Effect [fade, slide] <====//
        effect?:{
            type?:string,
            duration?:number,
            delay?:number,
            display?:string,
        },
    }) {
    //====> Default Options <====//
    let active  = options?.target || 'phenix-active',
        target  = options?.active || '.dropdown-list',
        exclude = options?.exclude || ':not(a[href^="http"]):not(a[href^="//"])',
        activated = `${target}.${active}`,
        delay = options?.effect?.delay || null,
        display = options?.effect?.display || null,
        duration = options?.effect?.duration || 700;

    //====> Set Trigger Accessibility <====//
    this.setAttributes({
        "tabindex":0,
        "role":"button",
        "aria-pressed":"false"

    //====> When Click on the Trigger <====//
    }).on('click', event => {
        //====> Prevent Default Behavor <====//
        event.preventDefault();

        //====> De-Activate Other <====//
        let others = Phenix(activated).removeClass(active),

        //====> Active Button and the Target <====//
        siblings = Phenix(event.target).addClass(active).siblings(target);

        //====> Active Target <====//
        Phenix(siblings).addClass(active);

        //====> Effect : Fade-In-Out <====//
        if (options?.effect?.type == 'fade') {
            others.fadeOut(duration, delay, display);
            Phenix(siblings).fadeIn(duration, delay, display);
        }

        //====> Effect : Slide-Down-Up <====//
        else if (options?.effect?.type == 'slide') {
            others.slideUp(duration, delay, display);
            Phenix(siblings).slideDown(duration, delay, display);
        }
    });

    //====> De-Activate on Blank <====//
    window.addEventListener('click', blank => {
        //====> Clicked Target <====//
        let clicked:any = blank.target;

        //====> if the target is not the current element or any of its childerns <====//
        if (!clicked.matches(target || `${target} *${exclude}`)) {
            //====> De-Activate any active dropdown <====//
            let others = Phenix(activated).removeClass(active);

            //====> Effect : Fade-Out <====//
            if (options?.effect?.type == 'fade') others.fadeOut(duration, delay, display);

            //====> Effect : Slide-Up <====//
            else if (options?.effect?.type == 'slide') others.slideUp(duration, delay, display);
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}