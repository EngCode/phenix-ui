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
    /*====> Activated Items Detect <====*/
    Phenix('.current-menu-parent, .current-menu-item').addClass('active');
});

