/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Media Setter
 * ===> 03 - Methods
 * ========> - Background Method
 * ===> 04 - Phenix Elements
 * ===> 05 - Get Options Data
 * ===> 06 - Set Media Size
 * ===> 07 - Clean Source [URL]
 * ===> 08 - Media Handler
 * ========> - Background Type
 * ===> 09 - Lazy-Loading Mode
 * ===> 10 - None-Valid Source
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Media Setter [un-tested] <====*/
PhenixElements.prototype.multimedia = function (options?:{
    type?:string,   //===> background, image, video, embed, iframe, gradient, mixed-bg, audio
    src?:string,    //===> Media Source [URL]
    size?:string,   //===> Aspect Ratio Size [1x1, 4x3, 16x9, 16x10, 21x9, *%]
    player?:string, //===> Players [phenix, html or standard]
    lazyloading?:boolean, //===> Lazyloading [true, false]
    //===> Extra <===//
    alt?:string,   //===> Alternative Text for SEO
    cover?:string, //===> Cover Image for [audio, video]
    title?:string, //===> Media Title for Playlist [First Item]
    //===> Gradient Settings <===//
    gradient?:{
        colors?:[],    //===> colors Array
        rotate?:number, //===> Rotation Degree
        mode?:string,   //===> Gradient Mode [linear, radial, conic]
    },
    //===> Playlist Settings [audio, video] types only <===//
    playlist?:[{
        title:string,  //===> Media Title
        url:string,    //===> Media URL
        cover:string,  //===> Cover Image
    }],
}) {
    

    //====> Background Method <====//
    let background = (element, source) => {
        //===> Clean # for CSS Benefits <===//
        source = source.replaceAll('#','%23');

        //===> De-Activate Lazy-Loading <===//
        if (options?.lazyloading) element.classList.remove('lazyloader');

        //===> Set As CSS Background <===//
        element.style.backgroundImage = `url("${source}")`;
    };

    
    //====> Loop Through Phenix Elements <====//
    this.forEach(element => {
        //====> Media Checker <====//
        let mediaDone = false;
        if (mediaDone) return;
        if (element.length != undefined) return;

        //====> Get Options Data <====//
        let type = element.getAttribute('data-type') || options?.type || 'background',
            src  = element.getAttribute('data-src') || options?.src,
            alt  = element.getAttribute('data-alt') || options?.alt || '',
            title  = element.getAttribute('data-title') || options?.title,
            cover  = element.getAttribute('data-cover') || options?.cover,
            ratio  = element.getAttribute('data-size') || options?.size || 'none',
            player = element.getAttribute('data-player') || options?.player || 'html',
            splide = Phenix(element).ancestor('.splide__slide--clone'),
            lazy = element.getAttribute('data-lazyloading') || options?.lazyloading || false;

        //====> Inline Fix <====//
        // if (element.getComputedStyle().display == 'inline') element.style.display = "block";

        //====> Set Media Size <====//
        if (ratio && ratio != 'none') {
            //====> Predefined Ratio's <====//
            if (ratio.includes('x')) element.classList.add(`ratio-${ratio}`);

            //====> Otherwise <====//
            else {
                //====> Convert To Number <====//
                let ratio_convert = parseInt(ratio);
                //====> Set Height w/ Padding Bottom <====//
                element.style.paddingBottom = `${ratio_convert}%`;
            }
        }

        //====> if has Valid Source <====//
        if (src && src !== '' || src !== ' ')  {
            //===> Clean Source [URL] <===//
            if (type === 'background' || 'image' || 'video' || 'audio' || 'embed' || 'iframe') src = encodeURI(src);

            //====> Media Handler <====//
            let mediaHandle = () => {
                //====> De-Activate Lazy-Loading <====//
                if (lazy) {
                    element.classList.remove('phenix-loader');
                    if (element.style.backgroundImage) element.style.removeProperty('background-image');
                }

                //====> Background Type <====//
                if (type == 'background') {                    
                    background(element, src);
                    mediaDone = true;
                }

                //====> Image Type <====//
                else if (type == 'image') {
                    background(element, src);
                    if(!element.querySelector('img')) Phenix(element).insert('prepend',`<img src="${src}" alt="${alt}" class="phenix-media-img" />`);
                    mediaDone = true;
                }
            };

            //====> Lazy-Loading Mode <====//
            if (lazy) {
                //====> Activate Lazy-Loading <====//
                if (!splide) {
                    element.classList.add('phenix-loader');
                    element.style.backgroundImage = `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApIG5vbmUgcmVwZWF0IHNjcm9sbCAwJSAwJTsgZGlzcGxheTogYmxvY2s7IHNoYXBlLXJlbmRlcmluZzogYXV0bzsiIHdpZHRoPSIyMDBweCIgaGVpZ2h0PSIyMDBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGNkY2RjIiBzdHJva2Utd2lkdGg9IjMiIHI9IjE4IiBzdHJva2UtZGFzaGFycmF5PSI4NC44MjMwMDE2NDY5MjQ0MSAzMC4yNzQzMzM4ODIzMDgxMzgiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT4KPCEtLSBbbGRpb10gZ2VuZXJhdGVkIGJ5IGh0dHBzOi8vbG9hZGluZy5pby8gLS0+PC9zdmc+)`;
                }

                //====> First View Handler <=====//
                if (Phenix(element).inView()) mediaHandle();

                //====> On-Scroll Handler <====//
                window.addEventListener('scroll', event => {
                    if (Phenix(element).inView()) mediaHandle();
                });
            }

            //====> None-Lazy <====//
            else mediaHandle();
        }

        //====> None-Valid Source <====//
        else element.style.backgroundImage = 'https://via.placeholder.com/1280x650?text=Source+URL+Not+Supported+or+404';
    });
}