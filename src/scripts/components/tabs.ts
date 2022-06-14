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
    active?:number,     //===> Show Tab # on Initial
    navigation?:string, //===> Navigation Selector
    hash_url?:boolean,  //===> Show Tab from URL #ID
}) {
    //====> Loop Through Phenix Query <====//
    this.forEach(tabs => {
        //====> Options Data <====//
        let active =  parseInt(tabs.getAttribute('data-active')) || options?.active || 0,
            navigation   = options?.navigation || '.tabs-navigation',
            active_class = 'active',
            buttons = tabs.querySelector(navigation).querySelectorAll('[data-tab]');

        //====> Loog Throgh Buttons <====//
        buttons.forEach((button:HTMLElement, index:number) => {
            //====> Default Activation <====//
            if (index === active) {
                //====> Active Button <====//
                button.classList.add(active_class);
                let active_btn = button.getAttribute('data-tab' || 'href');
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