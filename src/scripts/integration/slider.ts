/**======> Referance By Comment <======
 * ===> 01 - Phenix and Splide
 * ===> 02 - Phenix Slider
 * ===> 03 - Create Markup
 * ===> 02 - 
 * ===> 02 - 
*/

/*====> Phenix and Splide <====*/
import Phenix, { PhenixElements } from "..";
import Splide from '@splidejs/splide';

/*====> Phenix Slider <====*/
PhenixElements.prototype.slider = function (options?:{
    type?:string;  //==> [slide, loop, fade]
    focus?:any;    //==> number | 'center'
    items?:number;
    steps?:number;
    speed?:number;
    duration?:number;
    autoplay?:boolean;
    controls?:boolean;
    pagination?:boolean;
    breakpoints?:any;
    direction?:string;
}) {
    //====> Phenix Elements <====//
    this.forEach((slider:HTMLElement) => {
        /*====> Get Inline Options <====*/
        let inline = attr => slider.getAttribute(attr),
            currentClasses = slider.classList;

        //====> Already Exist <====//
        if (currentClasses.contains('splide') || currentClasses.contains('splide__list')) return;

        //====> Create Markup <====//
        Phenix(slider).insert('before', `<div class="px-slider splide ${currentClasses}"><div class="splide__track"></div></div>`);
        Phenix(slider).prev('.px-slider').querySelector('.splide__track').append(slider);

        //====> Mark Wraper <====//
        let sliderWraper = Phenix(slider).ancestor('.px-slider');
            slider.classList.add('splide__list');

        //====> Move Main Classes <====//
        Array.from(currentClasses).forEach(cl => {
            if(!cl.includes('splide__list') && !cl.includes('row')) {
                /* cl.includes('slider') || cl.includes('carousel') */
                sliderWraper.classList.add(cl);
                slider.classList.remove(cl);
            }
        });

        //====> Mark Slides <====//
        Array.from(slider.children).forEach(el => el.classList.add('splide__slide'));

        //====> Default Options <====//
        let type = inline('data-type') || options?.type || "loop",
            focus = inline('data-focus') || options?.focus || 0,
            items = parseInt(inline('data-items')) || options?.items || 1,
            steps = parseInt(inline('data-steps')) || options?.steps || 1,
            speed = parseInt(inline('data-speed')) || options?.speed || 700,
            autoplay = inline('data-autoplay') ? true : options?.autoplay || true,
            controls = inline('data-controls') ? true : options?.controls || false,
            duration = parseInt(inline('data-duration')) || options?.duration || 6000,
            pagination = inline('data-pagination') ? true : options?.pagination || false,
            breakpoints = options?.breakpoints || {},
            direction = inline('data-direction') || options?.direction || Phenix(document).direction(),
            //====> Vertical Mode Fix <====//
            verticalFix = (slides) => {
                if (direction == 'ttb') {
                    let first = Phenix(slider.children[0]).height();
                    return first*slides;
                }
            },

            height = verticalFix(items);

        //====> Inline Responsive <====//
        inline('data-sm') ? breakpoints[570] = { 
            //===> Small Screens <===//
            perPage: inline('data-sm') || items,
            height: verticalFix(inline('data-sm') || items),
        } : '';
        //===> Medium Screens <===//
        inline('data-md') ? breakpoints[760] = {
            perPage: inline('data-md') || items,
            height: verticalFix(inline('data-md') || items),
        } : ''; 
        //===> Large Screens <===//
        inline('data-lg') ? breakpoints[1170] = {
            perPage: inline('data-lg') || items,
            height: verticalFix(inline('data-md') || items),
        } : '';
        //===> xLarge Screens <===//
        inline('data-xl') ? breakpoints[1400] = {
            perPage: inline('data-xl') || items,
            height: verticalFix(inline('data-md') || items),
        } : '';

        //====> Splide Active <====//
        let the_slider = new Splide(sliderWraper, {
            type : type,
            focus: focus,
            speed: speed,
            arrows: controls,
            autoplay: autoplay,
            interval: duration,
            perPage: items,
            perMove: steps,
            pagination: pagination,
            pauseOnHover: false,
            mediaQuery: 'min',
            direction: direction,
            height: height,
            breakpoints: breakpoints
        }).mount();

        //====> Integration <====//
        the_slider.on(['move','mounted', 'active'], moved => {
            let media_elements = slider.querySelectorAll('.px-media, [data-src]');

            //====> Multimedia Activate <====//
            Phenix(media_elements).multimedia();

            //====> Lazyloading <====//
            slider.querySelectorAll('.px-loading, .px-loader').forEach(media => {
                if (Phenix(media).inView()) {
                    if (media.getAttribute('data-src')) {
                        Phenix(media).multimedia();
                    } else {
                        media.setAttribute('src', media.getAttribute('data-lazyload'));
                    }
                }
            });
        });
    });

    //====> Return Phenix Elements <====//
    return this;
}