/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Notficationss
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

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
        setTimeout(() => current ? current.remove() : '', 500);
    }, duration);

    //====> Return Phenix <====//
    return this;
};