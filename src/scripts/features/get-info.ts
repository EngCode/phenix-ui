/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Get Information Class
 * ===> 03 - Page Direction
 * ===> 04 - Get Element Height
 * ===> 05 - ViewPort Detactor
 * ===> 06 - Get CSS Properties Value
 * ===> 07 - Get Viewport Dimensions
 * ===> 00 - ....
 * ===> 00 - ....
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Page Direction <====*/
PhenixElements.prototype.direction = function (property?:string) {
    //======> Default Directions <======//
    let direction  = getComputedStyle(document.body).direction,
        directionStart = 'left',
        directionEnd   = 'right';

    //======> Change Directions if RTL <======//
    if (direction === 'rtl') {
        directionStart = 'right';
        directionEnd = 'left';
    }

    //======> Return Property Value <======//
    if (property == "start") {
        return directionStart;

    } else if (property == "end") {
        return directionEnd;

    } else {
        return direction;
    }
}

/*====> Get Element Height <====*/
PhenixElements.prototype.height = function () {
    //======> Define Target Data <======//
    let element:any = this[0],
        display = getComputedStyle(element).display;

    //======> for Getting the Height of a Hidden Element <=======//
    if (display == 'none') element.style.display = 'block';

    //======> Define Height Data <=======//
    let height = element.scrollHeight,
        padding = parseInt(getComputedStyle(element).padding, 10) || 0;

    if (display === 'none') element.style.display = 'none';

    return height + padding;
}

/*====> Get CSS Properties Value <====*/
PhenixElements.prototype.getCSS = function(property?:string, pseudo?:string) {
    //======> Define the Target <======//
    let element:any = this[0];

    //====> Get the Target Style <====//
    let styles = getComputedStyle(element, pseudo);

    //====> If Property is Targeted <====//
    if (property) styles = styles[property];

    //====> Return Informations <====//
    return styles;
}

/*====> ViewPort Detactor [Update Need] <====*/
PhenixElements.prototype.inView = function () {
    //======> Define Target Data <======//
    let element:any = this[0],
        scrollPosition = window.scrollY || window.pageYOffset,
        boundsTop = element.getBoundingClientRect().top + scrollPosition,
        viewport = {top: scrollPosition,bottom: scrollPosition + window.innerHeight},
        bounds = {top: boundsTop, bottom: boundsTop + element.clientHeight};

    //====== if its visible return [true] =====//
    return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top ? true : false;
}

//=====> Get Viewport Dimensions <=====//
PhenixElements.prototype.viewport = function (property:string) {
    //====> Get Document Element <HTML> <====//
    let element = document.documentElement;

    //====> if the Target is width <====//
    if (property === 'width') Math.max(element.clientWidth || 0, window.innerWidth || 0);
    
    //====> if the Target is width <====//
    else if (property === 'height') Math.max(element.clientHeight || 0, window.innerHeight || 0);
}
