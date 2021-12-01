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
        Phenix('.current-menu-parent, .current-menu-item').addClass('phenix-active');

        /*===== Contact 7 Fixs =====*/
        Phenix('.wpcf7-form br').forEach((space:HTMLElement) => space.remove());
        Phenix('.wpcf7-form[dir],.wpcf7-form [dir]').forEach((element:HTMLElement) => element.removeAttribute('dir'));
    }
    /*====> for Admin Panel <====*/
    else {
        console.log('!Hello There Greeting from Phenix Themes.');
    }
});
