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
    //====> !Here Goes Your Code <====//
    let testing = 0;

    /*===> Table of contents Menu <===*/
    let content_menu = Phenix('.on-page-menu').insert('append', '<ul class="reset scrollspy-menu"></ul>');
    
    /*===> Loop Throgh Titles <===*/
    Phenix('.content-side h2').forEach((element:HTMLElement, index:number) => {
        //====> Element Data <====//
        let title:string  = element.textContent;

        //====> Create as Menu Item <====//
        Phenix(content_menu).insert('append', `<li><a href="#section-${index}" class="smoth-scroller">${title}</a></li>`);

        //====> Set ID <====//
        element.setAttribute('id', `section-${index}`);
    });

    /*====> Scroll Spy Active <====*/
    Phenix(content_menu).scrollSpy();

    //====> Versions Changer <====//
    Phenix('#version-select').on('change', changed => {
        //===> Get Value <===//
        let val = changed.target.value;
        //===> Go to It <===//
        window.location = val;
    });
});