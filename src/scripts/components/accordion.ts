/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Accordion
 * ===> 03 - 
 * ===> 03 - Loop Through Phenix Query
 * ===> 03 - 
 * ===> 09 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Accordion <====*/
PhenixElements.prototype.accordion = function (options?:{
        onChange?:any;
        onShow?:any;
        onHide?:any;
        firstActive?:boolean
    }) {

    //=====> Accordion Options <=====//
    let onChange = options?.onChange || function (btn?, panel?, func?) { return func; },
        onShow   = options?.onChange || function (btn?, panel?, func?) { return func; },
        onHide   = options?.onShow   || function (btn?, panel?, func?) { return func; };
    //====> Loop Through Phenix Query <====//
    this.forEach(accordion => {
        //====> if Ts is Done Return no thing <====//
        if(accordion.classList.contains('acdone')) return;

        //====> Store Playable Elements <====//
        let nextPanel   = Phenix(accordion).siblings('.accordion-content'),
            thisParent  = Phenix(accordion).ancestor('.accordion-item'),
            auto_active = options?.firstActive || false;
            

        //=====> Accessibility <=====//
        Phenix(accordion).setAttributes({
            "tabindex":0,
            "role":"button",
            "aria-pressed":"false",
        });

        //====> Activate First Accordion <====//
        if(auto_active && thisParent.matches('.accordion-item:first-child')) {
            if(!Phenix(accordion).ancestor('.accordion')?.querySelector('.active')) thisParent.classList.add('active');
        }

        //====> Accordion Handler <====//
        accordion.addEventListener('click', event => {
            event.preventDefault();

            //==== Check if the Clicked Button is Activated or Not ====//
            if (thisParent.classList.contains('active')) {
                //==== Deactivate Clicked Accordion if its Activated ====//
                thisParent.classList.remove('active');
                //==== Close the Panel ====//
                Phenix(nextPanel).slideUp();
                //====> on Hide Function <====//
                if(onChange) onChange(accordion, nextPanel);
            } else {
                //==== Close Siblings Panels ====//
                Phenix(thisParent).siblings('.accordion-item').forEach((sibling:any) => {
                    //==== Close Other Activated Siblings ====//
                    sibling.classList.remove('active');
                    var siblingPanel = sibling.querySelector('.accordion-content');
                    //==== Close Siblings Panels ====//
                    if (siblingPanel) Phenix(siblingPanel).slideUp();
                });
                //==== Open the Panel ====//
                Phenix(nextPanel).slideDown();
                //==== Deactivate Clicked Accordion if its Activated ====//
                thisParent.classList.add('active');
                //====> on Shows Function <====//
                if(options?.onShow) onChange(accordion, nextPanel);
            }

            //====> on Change Function <====//
            if(onChange) onChange(accordion, nextPanel);
        });

        //====> Done <====//
        accordion.classList.add('acdone');
    });

    //====> Return Phenix Elements <====//
    return this;
}