/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Multi-Level Menu Builder
 * ===> 03 - 
 * ===> 04 - 
 * ===> 05 - 
 * ===> 06 - 
 * ===> 00 - ....
 * ===> 00 - Phenix Selecting Method
*/

/*====> Phenix JS <====*/
import Phenix from "..";

/*====> D.O.M is Ready ? <====*/
Phenix(document).ready(ready => {
    /*====> for Front-End <====*/
    if (!document.body.classList.contains('wp-admin')) {
        /*====> Activated Items Detect <====*/
        Phenix('.current-menu-parent, .current-menu-item').addClass('px-item-active');

        /*===== Contact 7 Fixs =====*/
        Phenix('.wpcf7-form br').forEach((space:HTMLElement) => space.remove());
        Phenix('.wpcf7-form[dir],.wpcf7-form [dir]').forEach((element:HTMLElement) => element.removeAttribute('dir'));

        //====> Copyrights Protection <====//
        Phenix(document).on("contextmenu", rightClick => rightClick.preventDefault());
        Phenix(document).on("selectstart", textSelect => textSelect.preventDefault());

        //====> H1 Fix <====//
        let headline = document.querySelector('h1');
        if(headline !== null) Phenix('.main-header').insert('append', `<h1 class="hidden">${document.title}</h1>`);
    }
    /*====> for Admin Panel <====*/
    else {
        console.log('!Hello There Greeting from Phenix Themes.');
    }
});
