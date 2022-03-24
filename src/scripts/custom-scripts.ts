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

    //====> Sticky Elements <====//
    Phenix('.main-header, .navigator-menu').sticky();

    //====> Phenix Uploaders <====//
    Phenix('.px-uploader').uploader();

    //====> Popups Activate <====//
    Phenix('.px-modal').popup();

    //====> Data Tables <====//
    Phenix('.px-datatable').datatable();

}).utilities('all');