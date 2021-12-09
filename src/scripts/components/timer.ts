/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Timer Counter
 * ===> 03 - Loop Through Phenix Elements
 * ===> 04 - Get Options Data
 * ===> 05 - Timer Markup Elements
 * ===> 06 - Create Date Object
 * ===> 07 - Time Loop
 * ===> 08 - Get Elapsed Time
 * ===> 09 - Timer Calculation
 * ===> 10 - Update Timer
 * ===> 11 - Clear Time Loop
 * ===> 12 - Return Phenix Elements
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Timer Counter [un-tested] <====*/
PhenixElements.prototype.timer = function (options?:{
        time?:string,    //===> Time = Hour:Minutes
        date?:string,    //===> Date = Year-Month-Day
        message?:string, //===> Time End Message
    }) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((element:any) => {
        //====> Get Options Data <====//
        let time = element.getAttribute('data-time') || options?.time || '00:00',
            date = element.getAttribute('data-date').replace(/:/g, "/") || options?.date.replace(/:/g, "/") || '2030-10-20',
            message = element.getAttribute('data-date') || options?.message || 'Time is up.',

        //====> Timer Markup Elements <====//
        elementPds = Phenix(element),
        childs  = {
            seconds : element.querySelector('.seconds') || elementPds.insert('append', '<span data-after="seconds" class="seconds">00</span>'),
            minutes : element.querySelector('.minutes') || elementPds.insert('append', '<span data-after="minutes" class="minutes">00</span>'),
            hours   : element.querySelector('.hours')   || elementPds.insert('append', '<span data-after="hours" class="hours">00</span>'),
            days    : element.querySelector('.days')    || elementPds.insert('append', '<span data-after="days" class="days">00</span>')
        },

        //====> Create Date Object <====//
        stringDate = new Date(`${date}T${time}`).getTime(),

        //====> Time Loop <====//
        update = setInterval(function () {
            //====> Get Elapsed Time <====//
            let current = new Date().getTime(),
                elapsed = stringDate - current,

            //====> Timer Calculation <====//
            days = Math.floor(elapsed / (1000 * 60 * 60 * 24)),
            hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

            //====> Update Timer <====//
            childs.seconds.innerHTML = seconds;
            childs.minutes.innerHTML = minutes;
            childs.hours.innerHTML = hours;
            childs.days.innerHTML = days;

            //====> Clear Time Loop <====//
            if (elapsed < 0) {
                clearInterval(update);
                element.innerHTML = message;
            }
        }, 1000);
    });

    //====> Return Phenix Elements <====//
    return this;
}