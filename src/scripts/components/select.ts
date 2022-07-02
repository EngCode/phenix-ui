/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - 
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Select [un-tested] <====*/
PhenixElements.prototype.select = function (options?:{
    search:boolean,
    multiple:boolean,
    placeholder?:string,
    searchPlaceholder?:string,
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach(select => {
        //====> if Already Mounted <====//
        if (select.classList.contains('px-mounted')) return;

        //====> Get Options <====//
        let events_data,
            multiple = select.hasAttribute('multiple'),
            classes  = select.classList,
            search = select.getAttribute('data-search') || options?.search,
            placeholder = select.getAttribute('data-placeholder') || options?.placeholder || '',
            searchPlaceholder = select.getAttribute('data-search-placeholder') || options?.searchPlaceholder || 'Search in Options';

        //====> Create Custom Select <====//
        let new_select = Phenix(select).insert('before', `<div class="px-select flexbox position-rv" style="line-height:var(--height);cursor: pointer;"></div>`);
        
        //====> Copy Select Classes and Hide it <====//
        new_select.classList.add(...classes);
        new_select = Phenix(new_select);
        select.classList.add('hidden', 'px-mounted');
        
        //====> Create Placeholder <====//
        let new_select_value = new_select.insert('prepend', `<button class="reset-button px-select-value col">${placeholder}</button>`);
        
        //====> Create Options Wrapper <====//
        let options_list = new_select.insert('append', `<ul class="reset-list fs-14 hidden border-1 border-solid border-alpha-10 fluid bg-inherit px-select-options position-ab fluid lineheight-160 pos-start-0 pos-after-y z-index-dropdown overflow-y-auto" style="max-height:270px;"></ul>`);
        options_list = Phenix(options_list);
        
        //====> Wrap the Original Select <====//
        select = new_select.insert('append', select);

        //====> Create Search <====//
        if(search) {
            options_list.insert('prepend', `<li class="pdy-5 pdx-15 divider-b">
                <input class="px-select-search col reset-input input-inherit" placeholder="${searchPlaceholder}">
            </li>`);
        }

        //====> Create Options List <====//
        select.querySelectorAll(':scope > *').forEach(option => {
            //====> Get Option Data <====//
            let option_text = option.textContent,
                option_value = option.getAttribute('value'),
                option_classes = 'divider-b pdy-5';

            if (option.matches('optgroup')) {
                options_list.insert('append', `<li class="px-select-group bg-alpha-05 pdx-10 weight-strong ${option_classes}" data-value="${option_value}">${option_text}</li>`);
            } else {
                options_list.insert('append', `<li class="px-select-option pdx-15 ${option_classes}" data-value="${option_value}">${option_text}</li>`);
            }
        });

        //====> Create Custom Events <====//
        const opened = new CustomEvent('opened', {detail: events_data}), //===> Fired when options list is opened
              change = new CustomEvent('change', {detail: events_data}), //===> Fired when select value is changed
              typing = new CustomEvent('typing', {detail: events_data}), //===> Fired when typing in options search
              focus = new CustomEvent('focus',   {detail: events_data}), //===> Fired when focued on options search
              closed = new CustomEvent('closed', {detail: events_data}); //===> Fired when options list is closed

        //====> Dynamic Position <====//
        let change_position = () => {
            //=== Check for Visiblity ===//
            let panel_size = Math.round(options_list[0].clientHeight),
                stickyElement = document.querySelector('[data-sticky="absolute"]')?.getBoundingClientRect().height;
            
            if (panel_size == 0) return;

            //=== get viewport postion ===//
            let top = Math.round(options_list[0].getBoundingClientRect().top),
                stickySize = Math.round(stickyElement) || 0,
                offsetTop = Math.round(top+stickySize-(stickySize/4)),
                offsetBottom = Phenix(document).viewport().height - (panel_size + offsetTop);
            //====> to Top <====//
            if (offsetBottom < 0) {
                options_list.addClass('pos-before-y').removeClass('pos-after-y');
            } 
            //====> to Bottom <====//
            else {
                options_list.addClass('pos-after-y').removeClass('pos-before-y');
            }
        };

        //====> Show Options <====//
        new_select_value.addEventListener('click', clicked => {
            Phenix(options_list).fadeToggle();
            change_position();
        });

        //====> Hide Options on Blank <====//
        window.addEventListener('click', blank => {
            //====> Clicked Target <====//
            let clicked:any = blank.target;
            //====> if the target is not the current element or any of its childerns <====//
            if (clicked !== new_select[0] && clicked !== new_select_value && !clicked.matches('.px-select-search')) {
                Phenix(options_list).fadeOut();
            }
        });

        //====> Change Position on Scroll <====//
        window.addEventListener('scroll', scrolling => {
            var isScrolling;

            isScrolling = setTimeout(() => {
                change_position();
                window.clearTimeout( isScrolling );
            } ,50);
        });
    });

    //====> Return Phenix <====//
    return this;
}