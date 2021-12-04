/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Animated Counter
 * ===> 03 - Get Options Data
 * ===> 04 - Counter Data
 * ===> 05 - Count Runer
 * ===> 06 - Start Counting
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Animated Counter <====*/
PhenixElements.prototype.counter = function (options?:{
        value?:number,    //===> Number to Count
        duration?:number, //===> Animation Duration
        delay?:number,    //===> Animation Delay
        decimal?:number,  //===> Decimal Numbers Support
        symbol?:string,   //===> Symbol After the Number
        steps?:number,    //===> Steps ber Count
        reverse?:boolean  //===> Count Down instead of Up
    }) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any) => {
        //====> Get Options Data <====//
        let duration = element.getAttribute('data-duration') || options?.duration || 2000,
            decimal  = parseInt(element.getAttribute('data-decimal')) || options?.decimal || 0,
            value    = parseInt(element.getAttribute('data-counter') || options?.value || element.innerText) || 0,
            symbol   = element.getAttribute('data-symbol') || options?.symbol || '',
            delay    = parseInt(element.getAttribute('data-delay')) || options?.delay  || 0,
            steps    = parseInt(element.getAttribute('data-steps')) || options?.steps  || 10,
            reverse  = element.getAttribute('data-reverse') || options?.reverse || false;

        //====> Counter Data <===//
        let input = (element.nodeName.toLowerCase() === 'input') ? true : false,
            count = 0,
            increment = value / (duration / steps),
            interval = null,
            decimal_regex = /\B(?=(\d{3})+(?!\d))/g;

        //====> Switch Count for Counting Down <====//
        if (reverse) count = value;
    
        //====> Count Runer <===//
        const runCounter = () => {
            //===> if [Count Down] is Activated => Decrease the Count <===//
            if (reverse) count -= increment;
            //===> Otherwise Increase the Count <===//
            else count += increment;

            //===> Current Value <===//
            let current = `${(count).toFixed(decimal).toString().replace(decimal_regex, ',')+symbol}`;

            //===> if the Element is Input Control <===//
            if (input) element.value = current;
            //===> Otherwise <===//
            else element.innerHTML = current;

            //===> Clear When Count Up Reaches The Target <===//
            if (!reverse && count === value) clearInterval(interval);

            //===> Clear When Count Down Reaches Zero <===//
            else if (reverse && count === 0) clearInterval(interval);
        };
    
        //====> Start Counting <===//
        setTimeout(function() {
            interval = setInterval(runCounter.bind(this), steps);
        }.bind(this), delay);
    });

    //====> Return Phenix Elements <====//
    return this;
}