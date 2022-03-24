/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Menu Builder
 * ===> 03 - Get Inline Options
 * ===> 04 - Default Options
 * ===> 05 - Dropdown Submenus
 * ===> 06 - Marking Submenus
 * ===> 07 - Marking Triggers
 * ===> 08 - Get Triggers
 * ===> 09 - Submenus Handler 
 * ===> 10 - Active Submenus
 * ===> 11 - Responsive Toggle
 * ===> 12 - Phenix Selecting Method
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Menu Builder <====*/
PhenixElements.prototype.menu = function (options?:{
    type?:string,       //===> Menu Type [navigation, dropdown]
    menu_id?:string,    //===> Menu CSS ID
    hover?:boolean,     //===> Dropdown on Hover [Disktop only]
    active?:boolean,    //===> Menu CSS Active Class [px-active]
    sub_active?:boolean,//===> Submenus CSS Active Class [px-submenu-active]
    mobile?:string,     //===> Responsive Mode [dropdown, custom]
    effect?:string,     //===> Dropdown Effect [slide, fade, custom]
}) {
    //====> Loop Through Phenix Query <====//
    this.forEach(menu => {
        /*====> Get Inline Options <====*/
        let inline = attr => menu.getAttribute(attr);

        /*====> Default Options <====*/
        let menu_type = inline('data-type') || options?.type || 'navigation',
            menu_id = inline('data-id') || options?.menu_id || null,
            hover = inline('data-hover') || options?.hover || false,
            active = inline('data-active') || options?.active || 'px-menu-active',
            sub_active = inline('data-sub-active') || options?.sub_active || 'px-submenu-active',
            effect = inline('data-effect') || options?.effect || 'custom',
            responsive = inline('data-mobile') || options?.mobile || 'dropdown';

        //====> Dropdown Submenus <====//
        let submenus = menu.querySelectorAll('li > ul, li > .megamenu'),
            dropdowns = [];

        //====> Dropdown Default Effect <====//
        if (menu_type === 'dropdown') !effect ? effect = 'slide' : null;

        //====> Marking Submenus <====//
        submenus.forEach((submenu_item:any) => {
            submenu_item.classList.add('submenu');
            submenu_item.parentNode.classList.add('submenu-item');
            //===> Megamenu Fix <===//
            if(submenu_item.classList.contains('megamenu')) {
                submenu_item.parentNode.style.position = 'static';
                submenu_item.querySelectorAll('ul').forEach(element => element.classList.add('megalist'));
            }
        });

        //====> Marking Triggers <====//
        Phenix(dropdowns).addClass('submenu-toggle');

        //====> Get Triggers <====//
        submenus.forEach(submenu => dropdowns.push(...Phenix(submenu).siblings('a')));

        //====> Submenus Handler <====//
        let submenus_handle = (elements:any) => Phenix(elements).on('click', click => {
            //===> Disable Default Behavor <===//
            click.preventDefault();

            //===> Dropdown Data <===//
            let trigger = click.target,
                parent  = trigger.parentNode,
                siblings = Phenix(parent).siblings(`.${sub_active}`),
                target = parent.querySelector('.submenu');

            //===> Toggle Dropdown <===//
            if (effect === 'slide') Phenix(target).slideToggle();
            else if (effect === 'fade') Phenix(target).fadeToggle();
            parent.classList.toggle(sub_active);

            //===> Disable Others <===//
            if (siblings) siblings.forEach(element => {
                if (effect === 'slide') Phenix(element.querySelector('.submenu')).slideUp();
                else if (effect === 'fade') Phenix(element.querySelector('.submenu')).fadeOut();
                element.classList.remove(sub_active);
            });
        });

        /*====> Active Submenus <====*/
        if(!hover) submenus_handle(dropdowns);
        /*====> Media Query Check <====*/
        else if (hover && Phenix(document).viewport('width') < 1100) window.addEventListener('resize', resized => {
            if (Phenix(document).viewport('width') < 1100) submenus_handle(dropdowns);
        });

        /*====> Responsive Toggle <====*/
        if (menu_id && menu_id !== null) {
            /*====> Set ID to the Menu <====*/
            if (responsive === 'dropdown') !menu.getAttribute('id') ? menu.setAttribute('id', menu_id) : null;

            /*====> Create External Menu <====*/
            else if (responsive === 'custom') {
                if (!document.querySelector(`#${menu_id}`)) {
                    //====> Create the Menu into the Body <====//
                    Phenix(document.body).insert('append', 
                        `<nav id="${menu_id}" class="phenix-custom-menu">
                            <div class="menu-wraper">${menu.innerHTML}</div>
                            <a href="#${menu_id}" class="menu-toggle" tabindex="0" role="button" aria-pressed="false"></a>
                        </nav>`
                    );
    
                    //====> Clean Markup <====//
                    Phenix(`#${menu_id} [id]`).forEach((element:HTMLElement) => element.removeAttribute('id'));
                    Phenix(`#${menu_id} .menu-wraper > *`).removeClass('flexbox');
    
                    /*====> Active Submenus <====*/
                    submenus_handle(Phenix(`#${menu_id} .submenu-item > a`));
                }
            }

            /*====> Toggle Button <====*/
            Phenix('.menu-toggle').on('click', click => {
                //===> Disable Default Behavor <===//
                click.preventDefault();
                //===> Dropdown Data <===//
                let trigger = click.target,
                    target  = trigger.getAttribute('data-id');

                //===> Define Target <====//
                if (target) target = `#${target}`;
                else target = trigger.getAttribute('href');
                target = document.querySelector(target);

                //===> Toggle Menu <====//
                target.classList.toggle(active);
                if (effect === 'slide') {
                    if (effect === 'slide') Phenix(target).slideToggle();
                    else if (effect === 'fade') Phenix(target).fadeToggle();
                }
            });
        }
    });

    //====> Return Phenix Query <====//
    return this;
}