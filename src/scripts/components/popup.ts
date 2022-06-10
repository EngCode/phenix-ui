/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Loop Through Phenix Query
 * ===> 03 - Popup Options
 * ===> 04 - Backdrop Trigger
 * ===> 05 - Popup CSS Classes
 * ===> 06 - Create Custom Event
 * ===> 07 - Show and Hide Modal
 * ===> 08 - Open by URL
 * ===> 09 - Open on Load
 * ===> 10 - Open When Scroll
 * ===> 11 - Lightbox Mode
 * ===> 12 - Active Triggers
 * ===> 13 - Close Triggers
 * ===> 14 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Popups Modals [Un-Tested] <====*/
PhenixElements.prototype.popup = function (options?:{
    type:string;        //===> the type of the popup as modal or lightbox
    hash_url?:boolean;  //===> Show the Modal if called from url
    backdrop?:boolean;  //===> Enable/Disable Close by Backdrop
    onload?:boolean;    //===> Show on Page Load Required for 'timeout';
    showon?:string;     //===> Show the Modal when the target is in View-Point
    timeout?:number;    //===> Delay the Modal from showing work for [showon, onload]
}) {
    //====> Loop Through Phenix Query <====//
    this.forEach(popup => {
        //=====> Popup Options <=====//
        let type     = options?.type || popup.getAttribute('data-type') || 'modal',
            timeout  = options?.timeout || parseInt(popup.getAttribute('data-timeout')),
            showon   = options?.showon || popup.getAttribute('data-showon'),
            onload   = options?.onload || popup.getAttribute('data-onload'),
            hash_url = options?.hash_url || popup.getAttribute('data-hash'),
            backdrop = options?.backdrop || true,
            modal_id = popup.getAttribute('id');

        /*=====> Backdrop Trigger <=====*/
        if (backdrop && !popup.querySelector('.backdrop-btn')) {
            Phenix(popup).insert('append', `<button class="backdrop-btn modal-close position-ab w-fluid h-100vh position-start-0 position-top-0 bg-transparent"></button>`);
            backdrop = popup.querySelector('.backdrop-btn');
        }

        //====> Return if has no ID <====//
        if (!modal_id) return;

        //====> Popup CSS Classes <====//
        popup.classList.add(
            'px-popup',
            'w-fluid',
            'h-100vh',
            'flexbox',
            'position-fx',
            'overlay-dark',
            'z-index-modal',
            'position-top-0',
            'position-start-0',
            'overflow-y-auto'
        );

        popup.querySelector('.modal-content')?.classList.add('position-rv', 'z-index-header');

        //====> Create Custom Event <====//
        const showed = new Event('modal-showed'),
              hidden = new Event('modal-hidden');

        //====> Show and Hide Modal <====//
        let show_modal = () => {
            //=====> Close Other Modals <=====//
            document.querySelector('.px-popup.active') ? hide_modal('.px-popup.active > *') : '';
            //==== Prevent Scroll ====//
            document.body.classList.add('overflow-hidden');
            //==== Open the Modal ====//
            Phenix(`#${modal_id}`).fadeIn(500, 0, 'flex').addClass('active');
            popup.classList.add('has-shown');
            //====> Fire Event <====//
            popup.dispatchEvent(showed);
        },

        hide_modal = (trigger) => {
            //==== Close the Modal ====//
            let parent = Phenix(trigger).ancestor('.px-modal');
            Phenix(parent).fadeOut().removeClass('active');
            //==== Restore Scroll ====//
            document.body.classList.remove('overflow-hidden');
            //====> Fire Event <====//
            popup.dispatchEvent(hidden);
        };

        //=====> Lightbox Mode <=====//
        if (type === 'lightbox') {
            //===> Set ID <===//
            modal_id = 'px-lightbox';

            //===> Lighbox Triggers <===//
            Phenix('.px-lightbox').on('click', isClicked => {
                //===> Prevent Default <===//
                isClicked.preventDefault();

                //===> Cleanup Lightbox <===//
                popup.querySelectorAll('.px-lightbox-media, .lighbox-slider').forEach(element => element.remove());

                //===> Get the Media URL <===//
                let thumbnail = isClicked.target,
                    media_url = thumbnail.getAttribute('href') || thumbnail.getAttribute('data-src');

                //===> Fix URl <===//
                if(!media_url) {
                    thumbnail = Phenix(isClicked.target).ancestor('.px-lightbox');
                    media_url = thumbnail.getAttribute('href') || thumbnail.getAttribute('data-src');
                }

                //===> Check Group <===//
                let lightbox_group = thumbnail.getAttribute('data-group'),
                    lightbox_wrapper = popup.querySelector('.modal-content');

                //===> if Single Media <===//
                if (!lightbox_group) {
                    //===> Create the Media Element if Not Exist <===//
                    Phenix(lightbox_wrapper).insert('append', `<img src="${media_url}" alt="Full Size Image" class="px-lightbox-media" />`);
                }

                //===> Group Mode <===//
                else {
                    //===> Create Slider Wrapper <===//
                    let slider_wrapper = Phenix(lightbox_wrapper).insert('append', `<div class="lighbox-slider" data-controls="1"></div>`);

                    //===> Insert Elements of the Group <===//
                    Phenix(`[data-group="${lightbox_group}"]`).forEach((item:any) => {
                        //===> Get the URL of each item <===//
                        media_url = item.getAttribute('href') || item.getAttribute('data-src');

                        //===> Insert the Current Item as First <===//
                        if (item === thumbnail) {
                            Phenix(slider_wrapper).insert('prepend', `<div class="px-item">
                                <img src="${media_url}" alt="Full Size Image" class="fluid" />
                            </div>`);
                        } else {
                            Phenix(slider_wrapper).insert('append', `<div class="px-item">
                                <img src="${media_url}" alt="Full Size Image" class="fluid" />
                            </div>`);
                        }
                    });

                    lightbox_wrapper.classList.add('w-max-1100');

                    //===> Activate the Slider <===//
                    popup.addEventListener('modal-showed', event => {
                        Phenix('.lighbox-slider').slider();
                    });
                }

                //===> Show Lightbox <===//
                show_modal();
            });
        }

        //=====> Open by URL <=====//
        if (hash_url) if (hash_url !== '0' || 'false') window.addEventListener('load', () => {
            setTimeout(() => {
                if (window.location.hash.substr(1) == modal_id) show_modal();
            }, timeout)
        });

        //=====> Open on Load <=====//
        if (onload) if (onload !== '0' || 'false') window.addEventListener('load', () => setTimeout(show_modal, timeout));
        
        //=====> Open When Scroll <=====//
        if (showon) {
            Phenix(showon).forEach(selector => {
                //===> First View <===//
                if (Phenix(selector).inView()) show_modal();

                //===> Hidden View <===//
                window.addEventListener('scroll', scrolling => {
                    if (Phenix(selector).inView()) {
                        if (!popup.classList.contains('active') && !popup.classList.contains('has-shown')) show_modal();
                    }
                });
            });
        }

        //=====> Active Triggers <=====//
        if (type === 'modal') {
            let triggers_select = `[data-modal="${modal_id}"], [href="#${modal_id}"]:not([target="_blank"])`;
            Phenix(triggers_select).on('click', show_modal);
        }

        //=====> Close Triggers <=====///
        popup.querySelectorAll('.modal-close').forEach(trigger => trigger.addEventListener('click', () => {
            hide_modal(trigger);
        }));
    });

    //====> Return Phenix Elements <====//
    return this;
}