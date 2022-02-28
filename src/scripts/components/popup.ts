/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - 
 * ===> 03 - 
 * ===> 03 - 
 * ===> 03 - Loop Through Phenix Query
 * ===> 03 - 
 * ===> 09 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Popups Modals [Un-Tested] <====*/
PhenixElements.prototype.popup = function (options?:{
    hashOpen?:boolean;
    onShow?:any;
    onHide?:any;
}) {

    //====> Loop Through Phenix Query <====//
    this.forEach(popup => {
        //=====> Popup Options <=====//
        let hashOpen = options?.hashOpen || true,  //===> Activate Tab by URL Hash [true || false]
            onShow   = options?.onShow   || function (trigger?, popup?, func?) { return func; }, //===> On Tab Shows Call Back Function
            onHide   = options?.onHide   || function (trigger?, popup?, func?) { return func; }; //===> On Tab Hide Call Back Function

        //====> if Ts is Done Return no thing <====//
        if(popup.classList.contains('pmdone')) return;

        //=====> Get Popup Data <=====//
        var theID = popup.getAttribute('id');

        /*=====> Create Overlay Trigger <=====*/
        popup.insertAdjacentHTML('afterbegin', '<a href="javascript:void(0);" class="modal-overlay"></a>');

        //=====> Open by URL <=====//
        if (hashOpen) {
            var urlHash = window.location.hash.substr(1);
            if (urlHash == theID) popup.classList.add('active');
            //====> on Shows Function <====//
            if(onShow) onShow(null, popup);
        }

        //=====> Activate Triggers <=====///
        Phenix(`*[data-modal="${theID}"]`).setAttributes({
            "tabindex":0,
            "role":"button",
            "aria-pressed":"false",
        }).on('click', event => {
            event.preventDefault();
            //==== Open the Modal ====//
            Phenix(`#${theID}`).addClass('active');
            //====> on Shows Function <====//
            if(onShow) onShow(event.target, popup);
        })

        //=====> Activate Overlay Trigger <=====//
        popup.querySelector('.modal-overlay')?.addEventListener('click', event => {
            event.preventDefault();
            //==== Close the Modal ====//
            event.target.parentNode.classList.remove('active');
            //====> on Hide Function <====//
            if(onHide) onShow(null , popup);
        });

        //=====> Activate Close Triggers <=====///
        popup.querySelectorAll('.close-modal').forEach(trigger => {
            trigger.addEventListener('click', event => {
                event.preventDefault();
                //==== Close the Modal ====//
                Phenix(trigger).ancestor('.px-modal').classList.remove('active');
                //====> on Hide Function <====//
                if(onHide) onShow(event.target , popup);
            });
        });

        //====> Done <====//
        popup.classList.add('pmdone');
    });

    //====> Return Phenix Elements <====//
    return this;
}