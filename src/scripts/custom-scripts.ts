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
    let content_menu = Phenix('.on-page-menu').insert('append', '<ul class="reset scrollspy-menu"></ul>'),
        last_title;

    /*===> Loop Throgh Titles <===*/
    Phenix('.content-side h1,.content-side h2,.content-side h3').forEach((element:HTMLElement, index:number) => {
        //====> Element Data <====//
        let title:string  = element.textContent,
            itemHtml:string = `<li><a href="#section-${index}" class="smoth-scroller">${title}</a></li>`;
        //====> Set ID <====//
        element.setAttribute('id', `section-${index}`);

        //====> Sub-Titles <====//
        if (element.matches('h3' || 'h4')) {
            //===> ... <===//
            let last_item = document.querySelector('.on-page-menu .scrollspy-menu > li:last-child'),
                last_list = last_item.querySelector('ul');

            //====> Create new Menu <====//
            if (!last_list) last_list = Phenix(last_item).insert('append', '<ul></ul>');
            
            //====> Create as Menu Item <====//
            Phenix(last_list).insert('append', itemHtml);
        }
        //====> Create as Main Title <====//
        else Phenix(content_menu).insert('append', itemHtml);

        //====> Asign Last Title <====//
        last_title = element;
    });

    /*====> Scroll Spy Active <====*/
    Phenix(content_menu).scrollSpy({
        flow : 'start',
        offset : 70,
    });

    /*====> Sticky Header <====*/
    Phenix('.main-header').sticky();

    //====> Versions Changer <====//
    Phenix('#version-select').on('change', changed => {
        //===> Get Value <===//
        let val = changed.target.value;
        //===> Go to It <===//
        window.location = val;
    });
});