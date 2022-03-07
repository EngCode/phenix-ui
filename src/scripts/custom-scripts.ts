/*===================================
=                                   =
=  - !Hello There                   =
=  - this is Your working space     =
=  - here you can customize phenix  =
=  - to your app ui design needs    =
=  - Good Luck :)                   =
=                                   =
===================================*/

/*====> Import Phenix <====*/
import Phenix from '.';

//======> D.O.M is Ready [for you] <=======//
Phenix(document).ready((event:any) => {
    //====> Phenix Multimedia <====//
    Phenix('.px-bg,.px-media').multimedia();

    //====> Phenix Menu <====//
    Phenix('.navigator-menu').menu({
        type   : 'navigation',
        hover  : false,
        mobile : 'custom',
    });

    //====> Widget Toggle <====//
    Phenix('.widget-title').on('click', event => {
        //===> Prevent Default <===//
        event.preventDefault();

        //===> Get Element <===//
        let element:HTMLElement = event.target,

        //===> Toggle Element & Get Content <===//
        content = Phenix(element).toggleClass('collapsed').next('.widget-content');

        //===> Toggle Content <===//
        Phenix(content).slideToggle();
    });

    //====> Sticky Elements <====//
    Phenix('.main-header, .navigator-menu').sticky();

    //====> Phenix Uploaders <====//
    Phenix('.px-uploader').uploader();

    //====> Popups Activate <====//
    Phenix('.px-modal').popup();

    //====> Options Toggle <====//
    Phenix('.options-toggle').on('click', clicked => {
        clicked.preventDefault();
        let targeted = Phenix(clicked.target).next('.hidden-options');
        Phenix(targeted).slideToggle(false, false, 'flex');
    });

    //====> assets <====//
    Phenix('.self-hidden').on('click', event => {
        event.preventDefault();
        Phenix(event.target).fadeOut();
    });

    //====> Data Tables <====//
    Phenix('.px-datatable').datatable();

}).utilities('all');