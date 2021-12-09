/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Tabs Panels
 * ===> 03 - Default Options
 * ===> 03 - Activator
 * ===> 03 - Loop Through Phenix Query
 * ===> 03 - 
 * ===> 09 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Tabs Panels [Un-Tested] <====*/
PhenixElements.prototype.tabs = function (options?:{
        active?:string,       //====> Default Active Tab number Default : first-child;
        active_class?:string, //====> Active Class Name : phenix-active
        navigation?:string,   //====> Tabs menu/buttons Wraper Selector

        //====> Hide/Show Toggle Effect [fade, slide] <====//
        effect?:{
            type?:string,
            duration?:number,
            delay?:number,
            display?:string,
        },
    }) {
    //====> Default Options <====//
    let active = options?.active || 1,
        active_class = options?.active_class || 'phenix-active',
        navigation   = options?.navigation   || '.tabs-buttons';

    //====> Loop Through Phenix Query <====//
    this.forEach(tabs => {
        //====> Get Tabs Buttons <====//
        let buttons = tabs.querySelector(navigation).querySelectorAll('[data-tab]' || '[href^="#"]');

        //====> Default Activation <====//
        buttons.forEach(element => {
            if (element.matches(`:nth-child(${active})`)) {
                //====> Active Button <====//
                let active_btn = element.classList.add(active_class).getAttribute('data-tab' || 'href');
                //====> Active Tab <====//
                Phenix(`#${active_btn.replace(/#/g, "")}`).addClass(active_class);
            }            
        });

        //====> When Click on a Tab-Button <====//
        Phenix(buttons).on('click', clicked => {
            //====> Prevent Default Behavor <====//
            clicked.preventDefault();

            //====> Tab Data <====//
            let tab_btn  = clicked.target,
                panel_id = tab_btn.getAttribute('data-tab' || 'href'),
                panel_element = Phenix(`#${panel_id.replace(/#/g, "")}`);

            //====> if Panel Exist <====//
            if (panel_element.length > 0) {
                //====> Active Panel <====//
                let other_panel = panel_element.addClass(active_class).siblings(active_class),

                //====> Active Button <====//
                this_btn = Phenix(tab_btn).addClass(active_class),
                //====> Get Other Buttons <====//
                other_btns = this_btn.siblings(active_class) || [];

                //====> Other Buttons Polyfill <====//
                if (!other_btns ||  other_btns.length < 1)
                    buttons.forEach(btn => !btn.matches(tab_btn) ? other_btns.push(btn) : null);

                //====> De-Activate Siblings <====//
                Phenix(other_panel).removeClass(active_class);
                Phenix(other_btns).removeClass(active_class);
            }
        });
    });

    //====> Return Phenix Elements <====//
    return this;
}