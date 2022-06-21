/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Progress Plugin
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Progress <====*/
PhenixElements.prototype.progress = function (options?:{
    type?:string,    //===> Timer Type [bar, circle, radial]
    color?:any,      //===> the Progress Color
    value?:number,   //===> the prorgress value
    label?:string,   //===> the progress label
    size?:number,    //===> the size of the progress with px
    lazyloading?:boolean,  //====> Animate when its visible
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach((progress:any) => {
        //====> Get Progress Data <====//
        let type = progress.getAttribute('data-type') || options?.type || 'bar',
            color = progress.getAttribute('data-color') || options?.color || 'var(--primary-color)',
            value = parseInt(progress.getAttribute('data-value')) || options?.value || 0,
            label = progress.getAttribute('data-label') || options?.label,
            size  = progress.getAttribute('data-size') || options?.size || 16,
            lazy  = progress.getAttribute('data-lazy') || options?.lazyloading;

        //====> Set Progress <====//
        let setProgress = (bar) => {
            //====> Get Current Value <====//
            let value = parseInt(progress.getAttribute('data-value')) || options?.value || 0;
            //====> Set the Value <====//
            bar.style.width = `${value}%`;
        };

        //====> Wrapper Properties <====//
        progress.classList.add('position-rv', 'tx-align-center');
        progress.setAttribute('data-type', type);

        //====> Bar Mode <====//
        if (type === 'bar') {
            //====> Base Background <====//
            progress.classList.add('bg-alpha-10', 'overflow-hidden', 'px-progress-bar-js');
            progress.style.height = `${size}px`;
            progress.style.lineHeight = `calc(${size}px)`;
            progress.style.setProperty('--width', `${progress.clientWidth}px`);

            //====> Add Progress Bar <====//
            Phenix(progress).insert('append', `<span class="px-progress-bar display-block transtion-fast overflow-hidden position-rv" data-value="${value}" ${label ? `data-label="${label}"`: null} style="width:0;height:100%"></span>`);

            //====> get the bar and the label <====//
            let progressBar = progress.querySelector('.px-progress-bar');

            //====> Set Color <====//
            if (typeof(color) === "string") Phenix(progressBar).css({"background-color" : color});

            //====> Set Progress <====//
            if (!lazy) {
                setProgress(progressBar);
            } else {
                //===> First View <===//
                if (Phenix(progress).inView()) setProgress(progressBar);

                //===> Hidden View <===//
                window.addEventListener('scroll', scrolling => {
                    if (Phenix(progress).inView()) setProgress(progressBar);
                });
            }
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}