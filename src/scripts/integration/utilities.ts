/**======> Reference By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - Phenix Utilities
 * ===> 03 - Form Utilities
 * ===> 04 - Placeholder Handler
 * ===> 05 - Global Utilities
 * ===> 06 - Item Remover
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";
declare var Masonry:any;
declare var tinyTypewriter:any;
declare var initMarqueeSlider:any;

/*====> Phenix Utilities <====*/
PhenixElements.prototype.utilities = function (options?:{
    type?:string, //====> Utilities Types
}) {
    //====> Default Type <====//
    let type = options?.type || 'all';

    //===> Form Utils <====//
    if (type.includes("form") || type === "all") {
        //===> Placeholder Effect <====//
        Phenix('[placeholder]').forEach((control:HTMLElement) => {
            //====> Current Placeholder <===//
            let holder = control.getAttribute('placeholder');
            //====> Empty Placeholder <===//
            Phenix(control).on('focus', event => control.removeAttribute('placeholder'));
            //====> Restore Placeholder <===//
            Phenix(control).on('blur', event => control.setAttribute('placeholder', holder));
        });

        //===> Form Controls Group <===//
        Phenix('.form-ui, .px-form').forEach((form:HTMLElement) => {
            //===> Get the Controls Size <====//
            let size = form.getAttribute('data-size') || '';
    
            //===> for Each Form <====//
            form.querySelectorAll('input:not([type="submit"]):not([type="button"]):not([type="radio"):not([type="checkbox"]), select, textarea').forEach(controler => {
                //====> if has no such class names or type <====//
                if (!controler.matches('.btn') && !controler.matches('.form-control')) controler.classList.add('form-control', size);
            });
        });

        //====> Form Repeater <====//
        Phenix(".px-form-repeater").forEach((repeater_container:Element) => {
            //====> Define Data <====//
            const add_btn  = repeater_container.querySelector(".px-repeater-add"),
                  fields_key = repeater_container.getAttribute("data-fields-key"),
                  items_list = repeater_container.querySelector(".px-repeater-items"),
                  original_row = items_list.querySelector("[data-item-key]");

            //===> Set a Number for the Original Row <===//
            if(!original_row.getAttribute('data-item-key')) original_row.setAttribute("data-item-key", "0");

            //===> Correct the name of the Fields <===//
            original_row.querySelectorAll("[name]").forEach((element:HTMLElement) => {
                //====> Get the Name <====//
                let name = element.getAttribute("name");
                //====> Move the Original Name to new Attribute <====//
                element.setAttribute('data-original-name', name);
                //====> Correct the Name <====//
                element.setAttribute("name", `${fields_key}[${original_row.getAttribute('data-item-key')}][${name}]`);
            });

            //===> Remove Button Creator <===//
            const create_remove_btn = (repeater_row:any) => {
                //===> Insert the Remove Button <===//
                const currentRemoveBtn = repeater_row.appendChild(add_btn.cloneNode(false));

                //===> Change the Button Style <===//
                currentRemoveBtn.classList.remove("fa-plus", "tiny", "small", "large", "xlarge");
                currentRemoveBtn.classList.add('fa-minus', 'danger', 'px-repeater-remove');

                //====> Correct Button Size <====//
                if (repeater_row.querySelector(".form-control")) {
                    let classNames = repeater_row.querySelector(".form-control").classList;
                    let sizes = ["tiny", "small", "large", "xlarge"];
                    sizes.some(size => classNames.contains(size) ? currentRemoveBtn.classList.add(size) : '');
                }

                //====> Remove the Item <====//
                currentRemoveBtn.addEventListener("click", (event:any) => Phenix(event.target).ancestor(".px-form-repeater-fields").remove());
            };

            //====> Add New Item (Remove Item Method Included) <====//
            add_btn.addEventListener("click", (event:any) => {
                //===> Create new Row <===//
                const newRow:any  = items_list.appendChild(original_row.cloneNode(true)),
                      currentRows = items_list.querySelectorAll("[data-item-key]").length-1;

                //===> Increase the Row Number <===//
                newRow.setAttribute("data-item-key", currentRows);

                //===> Change the Fields Name <===//
                newRow.querySelectorAll("[name]").forEach((element:any) => {
                    //====> Get the Name <====//
                    let name = element.getAttribute('data-original-name');

                    //====> Set the Name <====//
                    element.setAttribute("name", `${fields_key}[${currentRows}][${name}]`);

                    //====> Cleanup Any Values <====//
                    if (element.value) element.value = "";
                    if (element.tagName === "TEXTAREA") element.innerHTML = "";

                    //====> Clean Up Select Options <====//
                    if (element.tagName === "SELECT") {
                        element.querySelectorAll('[selected]').forEach(option => option.removeAttribute('selected'));
                        //====> Advanced Select Rebuild <====//
                        if (element.classList.contains('px-select')) Phenix(element).rebuildSelect();
                    }
                });

                //===> Create Remove Button <===//
                create_remove_btn(newRow);
            });

            //====> Create Remove Button Whenever it is not found <====//
            setInterval(() => {
                //====> Get the Rows <====//
                let rows = repeater_container.querySelectorAll('[data-item-key]:not([data-item-key="0"])');

                //====> Create Remove Button <====//
                if (rows) rows.forEach(row => !row.querySelector('.px-repeater-remove') ? create_remove_btn(row) : '');
            }, 1000);
        });

        //====> Rating Controllers <====//
        Phenix(".px-rating").rating();
    }

    //====> Others <====//
    if (type.includes("other") || type === "all") {
        //====> Item Remover <====//
        Phenix('.remove-item').on('click', click => {
            //====> Prevent Default Behavior <====//
            click.preventDefault();
            //====> Remover Data <====//
            let trigger = click.target,
                target  = trigger.getAttribute('data-target') || trigger.getAttribute('href') || false,
                relation = trigger.getAttribute('data-relation');
    
            //=== Remove Target in Ancestors ===//
            if (!relation || relation === 'ancestor') Phenix(trigger).ancestor(target).remove();
            //=== Remove Target in Siblings ===//
            else if (relation === 'sibling') {
                Phenix(trigger).siblings(target).forEach(sibling => sibling .remove());
            }
            //=== Remove Target as Global ===//
            else if (relation === 'global' || 'none') document.querySelector(target).remove();
            //=== Remove the Closest Target ===//
            else if (relation === 'closest' || 'related') trigger.closest(target).remove();
        });

        //====> Create Animated Count Up <====//
        Phenix('.px-counter').forEach((element:HTMLElement) => {
            //===> Separate Numbers from Symbols <====//
            const numbers = element.textContent.match(/\d+/g),
                  characters = element.textContent.replace(`${numbers}`, '');

            //===> Set Correct Values <====//
            element.setAttribute('data-value', `${numbers}`);
            if(characters && !element.getAttribute('data-symbol')) element.setAttribute('data-symbol', `${characters}`);

            //====> Start Counter when in View <====//
            Phenix(element).inView({
                callback: () => {
                    if (!element.classList.contains('counting')) Phenix(element).counter();
                }
            });
        });

        //====> To Top Hook <=====//
        let toTopHook = document.querySelector('.entry-content *:first-child');
        if (!toTopHook) toTopHook = document.querySelector('.main-header + *');
        if (toTopHook && !toTopHook.id) toTopHook.id = 'to-top-hook';
    }
    
    //====> Dynamic Word Coloring <====//
    if (type.includes("text") || type === "all") {
        //===> Dynamic Colors Variants for Elements Shadow <===//
        Phenix("[class*='bx-shadow-gls'], .pds-sc-props").forEach((element:HTMLElement) => {
            //====> Color Transformer <====//
            const transformColor = (color: string, amount: number) => {
                let rgb = color.match(/\d+/g).map(Number);
                if (rgb.length > 4) rgb.splice(-(rgb.length - 3));
                return rgb.map(c => Math.max(0, Math.min(255, c + amount))).join(', ');
            };

            //====> Color Contrast Checker <====//
            const isLightOrDark = (color:string) => {
                //===> get Colors Range <====//
                let all = color.split(','),
                    r = parseInt(all[0]), g = parseInt(all[1]), b = parseInt(all[2]);
                //===> Calculate the luminance of the color <===//
                let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                //===> Return 'light' or 'dark' based on the luminance <===//
                return luminance;
            }

            //====> get the Background Color <====//
            let bgColor = window.getComputedStyle(element).backgroundColor,
                bgImage = window.getComputedStyle(element).backgroundImage,
                darkerRgb:any = "0,0,0",
                lighterRgb:any = "255,255,255";

            //====> Check if has Background Gradient <====//
            if (bgImage && bgImage.includes('gradient') && bgImage.match(/gradient\((.*?)\)/)) {
                //===> Check for gradient Match colors <===//
                let colors = [];

                //===> Get Colors <===//
                bgImage.match(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g).forEach((color:string) => {
                    colors.push(color.replace('rgb', '').replace('(', '').replace(')', ''));
                });

                //===> Get the colors from the gradient <===//
                const colorOne = isLightOrDark(colors[colors.length - 1]),
                    colorTwo = isLightOrDark(colors[0]);

                //===> Set the Colors <===//
                darkerRgb  = transformColor(colorOne < colorTwo ? colors[colors.length - 1] : colors[0], -95);
                lighterRgb = transformColor(colorOne > colorTwo ? colors[colors.length - 1] : colors[0], 95);
            }

            //====> Check if has Background Color <====//
            else if (bgColor) {
                //====> Create a darker shade by subtracting 90 from each color component <====//
                darkerRgb = transformColor(bgColor, -95);
                //====> Create a lighter shade by adding 80 to each color component <====//
                lighterRgb = transformColor(bgColor, 95);
            }

            //====> Add the Colors to the CSS Properties <====//
            element.style.setProperty('--shadow-color-dark', darkerRgb);
            element.style.setProperty('--shadow-color-light', lighterRgb);
        });
    }

    //====> icons List <====//
    if (type.includes("icons") || type === "all") Phenix('.icons-list').forEach((list:HTMLElement) => {
        if (list.getAttribute('data-icon')) {
            let classes = list.getAttribute('data-icon').split(" ") || [];
            list.querySelectorAll('li').forEach(item => item.classList.add(...classes));
        }
    });

    //====> Copyrights Protection <====//
    if (type.includes("copyrights")) {
        Phenix(document).on("contextmenu", rightClick => rightClick.preventDefault());
        Phenix(document).on("selectstart", textSelect => textSelect.preventDefault());
    }

    //====> SEO Fix <====//
    if (type.includes("seo") || type === "all") {
        //====> Headline Fix <====//
        let headline = document.querySelector('h1');
        if(!headline) Phenix('body').insert('prepend', `<h1 class="hidden">${document.title}</h1>`);

        //====> Images SEO/Performance <====//
        setTimeout(() => {
            Phenix('img').forEach((img:any) => {
                //===> Get Image Data <===//
                let img_width = img.getAttribute('width') || img.style.width || img.clientWidth,
                    img_height = img.getAttribute('height') || img.style.height || img.clientHeight,
                    parent_width = img.parentNode.clientWidth,
                    parent_height = Phenix(img.parentNode).height();
    
                //===> Set Width and Height <===//
                if (!img_width && parent_width > 0)  img.setAttribute('width', `${parent_width}`);
                if (!img_height && parent_height > 0) img.setAttribute('height', `${parent_height}`);
    
                //===> Alternative Text <===//
                if (!img.getAttribute('alt') || img.getAttribute('alt') === "") {
                    img.setAttribute('alt', img.src.substring(img.src.lastIndexOf('/')+1));
                }
            });
        }, 500);
    
        //====> Links SEO <====//
        Phenix('a:not([title]):empty, button:not([title]):empty, a:not([title]), button:not([title])').forEach((link:any) => {
            //===> Text Checker <===//
            let text = link.getAttribute('data-title') || "";

            //===> Get Text <===//
            if (!link.querySelector('*') && link.textContent) text = link.textContent.trim();
            else text = link.querySelector('h2')?.textContent || link.querySelector('h3')?.textContent || link.querySelector('h4')?.textContent || '';

            //===> Alternative Text <===//
            if (!link.getAttribute('title') || link.getAttribute('title') === "") link.setAttribute('title', text);
            if (!link.getAttribute('aria-label') || link.getAttribute('aria-label') === "") link.setAttribute('aria-label', text);
        });
    }

    //====> Third-Party Libraries <====//
    if (type.includes("libraries") || type === "all") {
        //===> Prevent on WP Editor <====//
        const document_classes = document.body.getAttribute('class');
        //===> Check the Document Type <===//
        if (!document.body.classList.contains('wp-admin') && !document_classes?.includes('-editor')) {
            //===> Import Masonry Grid Plugin <===//
            if(document.querySelector('.px-masonry')) Phenix(document).import("masonry", "script", "masonry.min.js", ()=> {
                Phenix(".px-masonry").forEach((grid:any) => {
                    let first_child_class = grid.children[0].classList[0];
                    var masonry = new Masonry(grid, {itemSelector: `.${first_child_class}`});
                });
            }, { integrated: true });
    
            //===> Typed List <===//
            if(document.querySelector('.typed-list')) {
                //====> Create the List Structure <====//
                Phenix('.typed-list').forEach((text_list:HTMLElement) => {
                    //===> Gather the Items <===//
                    const text_list_items = [];
                    text_list.querySelectorAll('li').forEach(item => text_list_items.push(item.textContent));
            
                    //===> Create the Typed Text Element <===//
                    const text_element = document.createElement('p');
                    text_element.classList.add('typed-text');
            
                    //===> Assign the Text List <===//
                    text_element.textContent = text_list_items[0];
                    text_list_items.forEach((item, index) => text_element.setAttribute(`data-text-${index}`, item));
            
                    //===> Copy List Classed to Text Element <===//
                    text_list.classList.forEach(item => !item.includes('list') ? text_element.classList.add(item) : null);
            
                    //===> Insert the Typed Text <===//
                    Phenix(text_list).insert('before', text_element);
                });
        
                //===> Import Typed Effect for Texts Library <====//
                Phenix(document).import('typed-js', 'script', 'typewriter.js', (isReady) => Phenix('.typed-text').forEach((typeWriter:HTMLElement) => {
                    //===> Items <===//
                    let items = [];
            
                    //===> Get Text Items <===//
                    for (let i = 0; i < 20; i++) {
                        if(typeWriter.getAttribute(`data-text-${i}`)) { items.push(typeWriter.getAttribute(`data-text-${i}`)); }
                    }
            
                    //===> Run the Typewriter <===//
                    typeWriter.style.height = Phenix(document).toREM(Phenix(typeWriter).height());
                    tinyTypewriter(typeWriter, {items: items, cursor: false, startDelay: 700});
                }), { integrated: true });
            }
    
            //===> Marquee Slider <===//
            if(document.querySelector('.px-marquee') || document.querySelector('.px-marquee-reverse')) {
                //====> Import Marquee Library <====//
                Phenix(document).import('marquee-js', 'script', 'marquee.js', (isReady) => {
                    //===> Create Marquee <===//
                    Phenix('.px-marquee, .px-marquee-reverse').forEach((marquee:HTMLElement, index) => {
                        //===> Create Structure Wrappers Elements <===//
                        const marquee_slider = document.createElement('div');
                        const marquee_slides = document.createElement('div');
            
                        //===> Set Slider ID <===//
                        const marquee_id = `px-marquee-${index}`;
                        marquee.style.direction = 'ltr';
                        marquee.setAttribute('id', marquee_id);
        
                        //===> Marquess Settings <===//
                        if(!marquee.getAttribute('data-speed')) marquee.setAttribute('data-speed', "15");
        
                        //===> Set Wrappers Properties <===//
                        marquee_slider.classList.add('marquee-slider-wrapper','display-flex', 'position-rv',);
                        marquee_slides.classList.add('marquee-slider-slides-wrapper', 'display-flex', 'position-rv');
                        marquee_slider.appendChild(marquee_slides);

                        //===> Move Content Items to the Slides Wrapper <===//
                        marquee.querySelectorAll(':scope > *').forEach((item:HTMLElement) => {
                            //===> Set Item Properties <===//
                            item.style.direction = Phenix(document).direction();
                            item.classList.add('marquee-slider-slide');
        
                            //===> Append Item to the Slides Wrapper <===//
                            marquee_slides.appendChild(item.cloneNode(true));
        
                            //===> Remove Item After it was Copied <===//
                            item.remove();
                        });
            
                        //===> Append the Slider Wrapper to the Marquee <===//
                        marquee.appendChild(marquee_slider);
            
                        //===> Initialize Marquee <===//
                        initMarqueeSlider(marquee_id, {
                            allowPointEvent:true,
                            dir: marquee.classList.contains('px-marquee-reverse') ? 'left' : 'right',
                            stopOnHover: marquee.getAttribute('data-hover') && marquee.getAttribute('data-hover') === 'false' ? false : true,
                        });
                    });
                }, { integrated: true });
            }
        }
    }

    //====> Return Phenix Query <====//
    return this;
}