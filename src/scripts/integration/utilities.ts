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
 * ===> 00 - Notficationss
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
                "tabindex": 0,
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

            //====> Masonry Grid <====//
            Phenix('.px-masonry').forEach((gallery:HTMLElement) => {
                //===> Wait for Loading <===//
                setTimeout(() => {
                    let max_height = Phenix(gallery).height();
                    gallery.style.maxHeight = `${max_height}px`;
                    gallery.classList.add('flow-columns');
                }, 500);
            });

            //====> H1 Fix <====//
            let headline = document.querySelector('h1');
            if(headline !== null) Phenix('body').insert('prepend', `<h1 class="hidden">${document.title}</h1>`);
        }

        //====> Viewport Utilities <====//
        if (type === 'viewport' || 'all') {
            //====> Watched Elements <====//
            Phenix('.view-status').forEach((element:HTMLElement) => {
                //====> Animations Data <====//
                let animation = element.getAttribute('data-animation'),
                    delay = parseInt(element.getAttribute('data-delay')) || 0,
                    duation = parseInt(element.getAttribute('data-duration')) || 1000,
                    isInView = () => {
                        //====> if the Element in view <====//
                        if (Phenix(element).inView()) {
                            //====> Active View Status <====//
                            Phenix(element).addClass('view-active').css({
                                "animation-name" : animation,
                                "animation-duration" : duation,
                                "animation-delay" : delay,
                            });
                        }
                    };
                //====> Scrolling Spy <====//
                isInView();
                Phenix(window).on('scroll', isInView);
            });
        }
    });

    //====> Return Phenix Query <====//
    return this;
}

//=====> Notficationss <=====//
PhenixElements.prototype.notfications = function (options?:{
    message?:string,
    type?:string,
    duration?:number,
}) {
    //====> Element & Data <====//
    let current,
        type = options?.type || 'normal',
        message = options?.message || 'No Message Defined.',
        duration = options?.duration || 1000,
        notfications = document.querySelector('.px-notfis'),
        error_alert = `<div class="px-item pdy-10 pdx-20 fs-14 danger-bg mb-10">${message}</div>`,
        normal_alert = `<div class="px-item pdy-10 pdx-20 fs-14 dark-bg mb-10">${message}</div>`,
        success_alert = `<div class="px-item pdy-10 pdx-20 fs-14 success-bg mb-10">${message}</div>`;
    //====> Create Notifcation Area <====//
    if(!document.querySelector('.px-notfis')) notfications = Phenix('body').insert('append', '<div class="px-notfis"></div>');
    //====> Apply Notifcations <====//
    if (type === 'error') current = Phenix(notfications).insert('append', error_alert);
    else if (type === 'success') current = Phenix(notfications).insert('append', success_alert);
    else current = Phenix(notfications).insert('append', normal_alert);
    //====> Show Notifcations <====//
    Phenix(notfications).fadeIn();
    //====> Hide Notifcations <====//
    setTimeout(()=> {
        Phenix(notfications).fadeOut();
        setTimeout(() => current ? current.remove() : '', 500)
    }, duration);
    //====> Return Phenix <====//
    return this;
};
