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
            color = options?.color || progress.getAttribute('data-color') || 'var(--primary-color)',
            value = options?.value || parseInt(progress.getAttribute('data-value')) || 0,
            label = progress.getAttribute('data-label') || options?.label,
            size  = progress.getAttribute('data-size')  || options?.size || 16,
            lazy  = progress.getAttribute('data-lazy')  || options?.lazyloading;

        //====> Set Progress <====//
        let setProgress = (bar) => {
            //====> Get Current Value <====//
            let value = parseInt(progress.getAttribute('data-value')) || options?.value || 0;
            //====> Set Bar Data <====//
            if (type === 'bar') {
                bar.style.width = `${value}%`;
                bar.style.backgroundColor = color;
                bar.setAttribute('data-value', value);
                bar.setAttribute('data-label', label);
            }
        };

        //====> Wrapper Properties <====//
        progress.classList.add('position-rv', 'tx-align-center');
        progress.setAttribute('data-type', type);

        //====> Bar Mode <====//
        if (type === 'bar') {
            //====> get the bar <====//
            let progressBar = progress.querySelector('.px-progress-bar');
            //====> Create the bar if not existed <====// 
            if (!progressBar) {
                //====> Add Progress Bar <====//
                Phenix(progress).insert('append', `<span class="px-progress-bar display-block transtion-fast overflow-hidden position-rv" data-value="${value}" ${label ? `data-label="${label}"`: null} style="width:0;height:100%"></span>`);
                progressBar = progress.querySelector('.px-progress-bar'); 
            }

            //====> Setup the Progress <====//
            if (!progress.classList.contains('px-progress-bar-js')) {
                //====> Base Background <====//
                progress.classList.add('bg-alpha-10', 'overflow-hidden', 'px-progress-bar-js');
                progress.style.height = `${size}px`;
                progress.style.lineHeight = `calc(${size}px)`;
                progress.style.setProperty('--width', `${progress.clientWidth}px`);

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
            } else {
                setProgress(progressBar);
            }
        }
    });

    //====> Return Phenix Elements <====//
    return this;
}
