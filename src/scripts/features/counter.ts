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
        value?:number,
        duration?:number,
        delay?:number,
        decimal?:number,
        symbol?:string,
        steps?:number,
        countDown?:boolean
    }) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any) => {
        //====> Get Options Data <====//
        let duration = options?.duration || element.getAttribute('data-duration') ||  2000,
            decimal  = options?.decimal  || parseInt(element.getAttribute('data-decimal')) ||  0,
            value    = options?.value    || parseInt(element.getAttribute('data-counter') || element.innerText) ||  0,
            symbol   = options?.symbol || element.getAttribute('data-symbol') ||  '',
            delay    = options?.delay  || parseInt(element.getAttribute('data-delay')) ||  0,
            steps    = options?.steps  || parseInt(element.getAttribute('data-steps')) ||  10;

        //====> Counter Data <===//
        let input = (element.nodeName.toLowerCase() === 'input') ? true : false,
            count = 0,
            increment = value / (duration / steps),
            interval = null,
            regex = /\B(?=(\d{3})+(?!\d))/g;

        //====> Switch Count for Counting Down <====//
        if (options?.countDown) count = value;
    
        //====> Count Runer <===//
        const runCounter = () => {
            //===> if [Count Down] is Activated => Decrease the Count <===//
            if (options?.countDown) count -= increment;
            //===> Otherwise Increase the Count <===//
            else count += increment;

            //===> Current Value <===//
            let current = `${(count).toFixed(decimal).toString().replace(regex, ',')+symbol}`;

            //===> if the Element is Input Control <===//
            if (input) element.value = current;
            //===> Otherwise <===//
            else element.innerHTML = current;

            //===> Clear When Count Up Reaches The Target <===//
            if (!options?.countDown && count === value) clearInterval(interval);

            //===> Clear When Count Down Reaches Zero <===//
            else if (options?.countDown && count === 0) clearInterval(interval);
        };
    
        //====> Start Counting <===//
        setTimeout(function() {
            interval = setInterval(runCounter.bind(this), steps);
        }.bind(this), delay);
    });
    
    //====> Return Phenix Elements <====//
    return this;
}