/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Effects : SlideUp
 * ===> 03 - Effects : SlideDown
 * ===> 04 - Effects : SlideToggle
 * ===> 05 - Effects : FadeOut
 * ===> 06 - Effects : FadeIn
 * ===> 07 - Effects : FadeToggle
 * ===> 00 - ....
 * ===> 00 - ....
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Effects : SlideUp <====*/
PhenixElements.prototype.slideUp = function (duration?, delay?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Visible <====//
        if (getComputedStyle(element).display !== 'none') {
            //====> Set Animation Base Properties <====//
            Phenix(element).css({"overflow" : 'hidden'});

            //====> Animation Data <====//
            let height = Phenix(element).height(),
                timespeed = duration || 300,
                keyframes = [
                    //====> From <====//
                    {height: `${height}px`},
                    //====> To <====//
                    {height : 0, padding: 0, margin : 0}
                ];

            //====> Slide-Up the Element <====//
            element.animate(keyframes, {
                duration : timespeed,
                easing   : 'linear',
                fill     : 'forwards',
                delay    : delay || 0,
            });

            //====> After Animation : Hide the Element <====//
            window.setTimeout(() => Phenix(element).css({"display" : 'none'}, true), timespeed);
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Effects : SlideDown <====*/
PhenixElements.prototype.slideDown = function (duration?, delay?, display?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Hidden <====//
        if (getComputedStyle(element).display === 'none') {
            //====> Show the Element <====//
            Phenix(element).css({
                "overflow" : 'hidden',
                "display"  : display || 'block',
            });

            //====> Animation Data <====//
            let height = Phenix(element).height(),
                timespeed = duration || 300,
                keyframes = [
                    //====> From <====//
                    {height : 0},
                    //====> To <====//
                    {height: `${height}px`},
                ];

            //====> Slide-Up the Element <====//
            element.animate(keyframes, {
                duration: timespeed,
                easing  : 'linear',
                fill    : 'forwards',
                delay   : delay || 0,
            });

            //====> After Animation : Clear Overflow <====//
            window.setTimeout(() => element.style.overflow = null, timespeed);
        }
    });
    //====> Return Phenix Elements <====//
    return this;
}

/*====> Effects : SlideToggle <====*/
PhenixElements.prototype.slideToggle = function (duration?, delay?, display?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Hidden <====//
        if (getComputedStyle(element).display === 'none') {
            Phenix(element).slideDown(duration, delay, display);
        }
        //====> if the target is Visible <====//
        else {
            Phenix(element).slideUp(duration, delay);
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Effects : FadeOut <====*/
PhenixElements.prototype.fadeOut = function (duration?, delay?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Visible <====//
        if (getComputedStyle(element).display !== 'none') {
            //====> Animation Data <====//
            let timespeed = duration || 300,
                keyframes = [{opacity: 1}, {opacity : 0}];

            //====> Slide-Up the Element <====//
            element.animate(keyframes, {
                duration : timespeed,
                easing   : 'linear',
                fill     : 'forwards',
                delay    : delay || 0,
            });

            //====> After Animation : Hide the Element & Clear inline-style <====//
            window.setTimeout(() => Phenix(element).css({"display" : 'none'}, true), timespeed);
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Effects : FadeIn <====*/
PhenixElements.prototype.fadeIn = function (duration?, delay?, display?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Visible <====//
        if (getComputedStyle(element).display === 'none') {
            //====> Show the Element <====//
            Phenix(element).css({"display" : display || 'block'});

            //====> Animation Data <====//
            let timespeed = duration || 300,
                keyframes = [{opacity: 0}, {opacity : 1}];

            //====> Slide-Up the Element <====//
            element.animate(keyframes, {
                duration : timespeed,
                easing   : 'linear',
                fill     : 'forwards',
                delay    : delay || 0,
            });
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}

/*====> Effects : FadeToggle <====*/
PhenixElements.prototype.fadeToggle = function (duration?, delay?, display?) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:HTMLElement) => {
        //====> if the target is Hidden <====//
        if (getComputedStyle(element).display === 'none') {
            Phenix(element).fadeIn(duration, delay, display);
        }
        //====> if the target is Visible <====//
        else {
            Phenix(element).fadeOut(duration, delay);
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}
