/**======> Referance By Comment <======
 * ===> 01 - Phenix and Splide
 * ===> 02 - Phenix Slider
 * ===> 03 - Create Markup
 * ===> 02 - 
 * ===> 02 - 
*/


/*====> Phenix Query <====*/
import Phenix, { PhenixElements } from "..";
/*====> Splide JS for The Slider Core <====*/
declare var Splide: any;

/*====> Phenix Slider <====*/
PhenixElements.prototype.slider = function (options?:{
    type?:string;
    focus?:any;
    items?:number;
    steps?:number;
    speed?:number;
    start?:number;
    duration?:number;
    autoplay?:boolean;
    controls?:any;
    pagination?:any;
    breakpoints?:any;
    direction?:string;
    splide_options?:any;
    arrow?:string;
    page?:string;
}) {
    //====> Sliders to Return <====//
    let all_sliders:any = [];

    //====> Sliders Activator <====//
    let slider_handler = () => this.forEach((slider:HTMLElement) => {
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
            duration = parseInt(inline('data-duration')) || options?.duration || 6000,
            autoplay = inline('data-autoplay') || options?.autoplay || true,
            controls = inline('data-controls') || options?.controls,
            pagination = inline('data-pagination') || options?.pagination,
            start = parseInt(inline('data-start')) || options?.start,
            breakpoints = options?.breakpoints || {},
            direction = inline('data-direction') || options?.direction || Phenix(document).direction();

        //====> Inline Responsive <====//
        inline('data-sm') ? breakpoints[570] = { 
            //===> Small Screens <===//
            perPage: inline('data-sm') || items,
            // height: verticalFix(inline('data-sm') || items),
        } : '';
        //===> Medium Screens <===//
        inline('data-md') ? breakpoints[760] = {
            perPage: inline('data-md') || items,
            // height: verticalFix(inline('data-md') || items),
        } : ''; 
        //===> Large Screens <===//
        inline('data-lg') ? breakpoints[1170] = {
            perPage: inline('data-lg') || items,
            // height: verticalFix(inline('data-md') || items),
        } : '';
        //===> xLarge Screens <===//
        inline('data-xl') ? breakpoints[1400] = {
            perPage: inline('data-xl') || items,
            // height: verticalFix(inline('data-md') || items),
        } : '';

        //====> Custom Classes <====//
        let controls_class = 'flexbox position-ab position-center-y align-between align-center-y position-start-0 col-12',
            pagination_class = 'position-ab position-center-x position-bottom-15',
            arrow_class = inline('data-arrow') || options?.arrow || 'btn primary small square',
            page_class  = inline('data-page') || options?.page || 'pd-5 bg-primary no-border tiny square radius-circle mx-5';

        if (typeof(controls) === "string") {
            controls !== "1" ? controls_class = controls : null;
        }

        if (typeof(pagination) === "string") {
            pagination !== "1" ? pagination_class = pagination : null;
        }

        //====> Slider to Splide <====//
        let slider_options:any = {
            type : type,
            focus: focus,
            speed: speed,
            autoplay: autoplay,
            interval: duration,
            perPage: items,
            perMove: steps,
            pauseOnHover: false,
            mediaQuery: 'min',
            direction: direction,
            breakpoints: breakpoints,
            paginationDirection: Phenix(document).direction(),
            //====> Classes <====//
            classes: {
                // Add classes for arrows.
                arrows: `splide__arrows px-slider-controls ${controls_class}`,
                arrow : `splide__arrow px-slider-button ${arrow_class}`,
                prev  : `splide__arrow--prev px-prev`,
                next  : `splide__arrow--next px-next`,
                // Add classes for pagination.
                pagination: `splide__pagination px-slider-pagination ${pagination_class}`, // container
                page      : `splide__pagination__page px-slider-page ${page_class}`, // each button
            },
        };

        //====> Add Options <====//
        if (start) slider_options.start = start;
        if (!controls) slider_options.arrows = false;
        if (!pagination) slider_options.pagination = false;

        //====> Splide Active <====//
        let the_slider = new Splide(sliderWraper, slider_options).mount();
        all_sliders.push(the_slider);

        //====> Integration <====//
        let slider_integration = () => {
            //====> Multimedia Integration <====//
            let media_elements = slider.querySelectorAll('.px-media, [data-src]');
            Phenix(media_elements).multimedia();
    
            //====> Lazyloading Integration <====//
            slider.querySelectorAll('.px-loading, .px-loader').forEach(media => {
                if (Phenix(media).inView()) {
                    //====> Multimedia Loader <====//
                    if (media.getAttribute('data-src')) {
                        Phenix(media).multimedia();
                    } else {
                        media.setAttribute('src', media.getAttribute('data-lazyload'));
                    }
                }
            });
        };

        //====> Mounted Run Integration <====//
        the_slider.on(['mounted', 'active'], event => slider_integration());
    });

    //====> Load Splid JS <====//
    if (!document.querySelector('#splidejs-phenix')) {
        //===> Create Script Element <===//
        let splide_loader = document.createElement("script");
        //===> Set ID <===//
        splide_loader.setAttribute('id', 'splidejs-phenix')
        //===> Set Source <===//
        splide_loader.setAttribute("src", "https://cdn.jsdelivr.net/npm/phenix-ui@0.6.5/dist/js/splide.min.js");
        //===> Append Script <===//
        document.body.appendChild(splide_loader);
    
        //====> When Loaded Run Sliders <====//
        splide_loader.addEventListener("load", slider_handler);
    
        //====> When Error Re-Load <====//
        splide_loader.addEventListener("error", (ev) => {
            splide_loader.setAttribute("src", "https://cdn.jsdelivr.net/npm/phenix-ui@0.6.5/dist/js/splide.min.js");
        });

    //====> if Al-ready loaded run the sliders <====//
    } else slider_handler;

    //====> Return Phenix Elements <====//
    return all_sliders;
}