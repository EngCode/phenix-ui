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
        active_class?:string, //====> Active Class Name : px-active
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
    let active = options?.active || 0,
        active_class = options?.active_class || 'px-active',
        navigation   = options?.navigation   || '.tabs-buttons';

    //====> Loop Through Phenix Query <====//
    this.forEach(tabs => {
        //====> Get Tabs Buttons <====//
        let buttons = tabs.querySelector(navigation).querySelectorAll('[data-tab]');

        //====> Loog Throgh Buttons <====//
        buttons.forEach((button:HTMLElement, index:number) => {
            //====> Default Activation <====//
            if (index === active) {
                //====> Active Button <====//
                button.classList.add(active_class);
                let active_btn =  button.getAttribute('data-tab' || 'href');
                //====> Active Tab <====//
                Phenix(`#${active_btn.replace(/#/g, "")}`).addClass(active_class);
            }
            //====> When Click on a Tab-Button <====//
            Phenix(button).on('click', clicked => {
                //====> Prevent Default Behavor <====//
                clicked.preventDefault();
    
                //====> Tab Data <====//
                let tab_btn  = button,
                    panel_id = tab_btn.getAttribute('data-tab' || 'href'),
                    panel_element = Phenix(`#${panel_id.replace(/#/g, "")}`);
    
                //====> if Panels Exist <====//
                if (panel_element.length > 0) {
                    //====> Active Panel & Button <====//
                    let other_panel = panel_element.addClass(active_class).siblings(),
                        other_btns = Phenix(tab_btn).addClass(active_class).siblings();

                    //====> Get Other Buttons <====//
                    Phenix(other_btns).removeClass(active_class);
                    //====> De-Activate Siblings <====//
                    Phenix(other_panel).removeClass(active_class);
                }
            });
        });

    });

    //====> Return Phenix Elements <====//
    return this;
}