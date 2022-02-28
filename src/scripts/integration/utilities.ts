/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Phenix Utilities
 * ===> 03 - Form Utilities
 * ===> 04 - Placeholder Handler
 * ===> 05 - Accessibility
 * ===> 06 - Buttons Accessibility
 * ===> 00 - Global Utilities
 * ===> 00 - Item Remover
 * ===> 00 - Responsive Multimedia
 * ===> 00 - Viewport Utilities
 * ===> 00 - 
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Phenix Utilities <====*/
PhenixElements.prototype.utilities = function (options?:{
    type?:string, //====> Utilities Types
}) {
    //====> Default Type <====//
    let type = options?.type || 'all';

    //======> D.O.M is Ready <=======//
    Phenix(document).ready(ready => {
        //====> Form Utilities <====//
        if (type === 'form' || 'all') {
            //===> Placeholder Effect <====//
            Phenix('[placeholder]').forEach((control:HTMLElement) => {
                //====> Current Placeholder <===//
                let holder = control.getAttribute('placeholder');
                //====> Empty Placeholder <===//
                Phenix(control).on('focus', event => control.removeAttribute('placeholder'));
                //====> Restore Placeholder <===//
                Phenix(control).on('blur', event => control.setAttribute('placeholder', holder));
            });
        }

        //====> Accessibility <====//
        if (type === 'accessibility' || 'all') {
            //====> Buttons Accessibility <====//
            Phenix('.btn, .remove-item').setAttributes({
                "tabindex":0,
                "role":"button",
                "aria-pressed":"false",
            });
        }

        //====> Global Utilities <====//
        if (type === 'global' || 'all') {
            //====> Item Remover <====//
            Phenix('.remove-item').on('click', click => {
                //====> Prevent Default Behavor <====//
                click.preventDefault();
                //====> Remover Data <====//
                let trigger = click.target,
                    target  = trigger.getAttribute('data-target' || 'href') || false,
                    relation = trigger.getAttribute('data-relation');
    
                //=== Remove Target in Ancestors ===//
                if (!relation || relation === 'ancestor') Phenix(trigger).ancestor(target).remove();
                //=== Remove Target in Siblings ===//
                else if (relation === 'sibling') {
                    Phenix(trigger).siblings(target).forEach(sibling => sibling .remove());
                }
                //=== Remove Target as Global ===//
                else if (relation === 'global' || 'none') document.querySelector(target).remove();
                //=== Remove the Closest Target ===//
                else if (relation === 'closest' || 'related') trigger.closest(target).remove();
            }, true);
        }

        //====> Viewport Utilities <====//
        if (type === 'viewport' || 'all') {
            //====> Watched Elements <====//
            Phenix('[data-counter], .view-status').forEach((element:HTMLElement) => {
                //====> Animations Data <====//
                let animation = element.getAttribute('data-animation'),
                    delay = element.getAttribute('data-delay') || 0,
                    duation = element.getAttribute('data-duration') || 1000;
                //====> Scrolling Spy <====//
                Phenix(window).on('scroll', scroll => {
                    //====> if the Element in view <====//
                    if (Phenix(element).inView()) {
                        //====> Active Counters <====//
                        if (element.matches('[data-counter]')) Phenix(element).counter();
    
                        //====> Active View Status <====//
                        else if (element.matches('.view-status')) Phenix(element).addClass('view-active').css({
                            animationName : animation,
                            animationDuration : delay,
                            animationDelay : duation,
                        });
                    }
                });
            });
        }
    });

    //====> Return Phenix Query <====//
    return this;
}
