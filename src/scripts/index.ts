/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - D.O.M Ready
 * ===> 03 - Add Class
 * ===> 04 - Remove Class
 * ===> 05 - Toggle Class
 * ===> 07 - Event Handler
 * ===> 08 - Get Ancestor [Parent, Parents Until]
 * ===> 09 - Get Siblings
 * ===> 10 - Get Next Siblings
 * ===> 11 - Get Previous Siblings
 * ===> 12 - CSS Styling
 * ===> 16 - Set Mutliple Attributes
 * ===> 17 - Insert Elements
 * ===> .. - 
 * ===> .. - Define Info Grapers
 * ===> .. - Define UI Effects
 * ===> .. - Define Other Features
 * ===> .. - 
 * ===> 00 - Phenix Selecting Method
 * ===> 00 - Include Features
 * ===> 00 - Integration
 * ===> 00 - Your Custom Script [JS]
*/

/*====> Phenix Object <====*/
export class PhenixElements extends Array<HTMLElement | Object | 'object'> {
    /*====> D.O.M Ready <====*/
    ready(callback:any) {
        //====> Check if its Ready <====//
        if (document.readyState == 'complete') callback;

        //====> Wait for It to be Ready <====//
        else document.addEventListener('DOMContentLoaded', callback);

        //====> Return Phenix Elements <====//
        return this;
    }

    /*====> Add Class <====*/
    addClass(className:string) {
        //====> Add Class for Each Element <====//
        this.forEach((element:HTMLElement) => element.classList.add(className));

        //====> Return Phenix Elements <====//
        return this;
    }

    /*====> Remove Class <====*/
    removeClass(className:string) {
        //====> Add Class for Each Element <====//
        this.forEach((element:HTMLElement) => element.classList.remove(className));

        //====> Return Phenix Elements <====//
        return this;
    }

    /*====> Toggle Class <====*/
    toggleClass(className:string) {
        //====> Toggle Class for Each Element <====//
        this.forEach((element:HTMLElement) => element.classList.toggle(className));

        //====> Return Phenix Elements <====//
        return this;
    }

    /*====> Event Handler [Live Error] <====*/
    on(event, callback, live?, timer?) {
        //====> Attache a Normal Event <====//
        if (!live) {
            //====> Event for Each Element <====//
            this.forEach((element:HTMLElement) => element.addEventListener(event, callback));

            //====> Return Phenix Elements <====//
            return this;

        //====> Live Event [Wrong :: Error] <====//
        } else {
            //====> Create Time Loop <====//
            let timerLoop = setInterval(() => {
                //====> Attach Event for Each Time <====//
                this.forEach((element:HTMLElement) => element.addEventListener(event, callback));
            }, timer|1000);

            //====> Return the Elements & Time Loop <====//
            return {
                elements: this,
                timeLoop: timerLoop
            };
        }
    }

    /*====> Get Ancestor [Parent, Parents Until] <====*/
    ancestor(target?) {
        //====> Define Ancestor Arrays <====//
        let ancestors = [];

        //====> Loop Through Phenix Elements <====//
        this.forEach((element:HTMLElement) => {
            //====> Define The First Parent <====//
            let parent:any = element.parentNode;
            
            //====> if has a Target <===//
            if (target) {
                //====> Loop Over The Ancestors <====//
                while (parent) {
                    //====> When the Target has been Found Return it <====//
                    if (!element.matches('html') && parent.matches(target)) {
                        ancestors.push(parent);
                        break;
                    }
                    //====> Otherwise get the Next Ancestor <====//
                    else parent = parent.parentNode;
                }
            }

            //====> Otherwise Return the Parent <====//
            else ancestors.push(parent);
        });

        //====> Return Ancestors <====//
        if (ancestors.length > 1) return ancestors;
        else if (ancestors.length === 1) return ancestors[0];
    }

    /*====> Get Siblings <====*/
    siblings(target?) {
        //====> Sibling Define <====//
        let siblings = [];
        
        //====> Loop Through Phenix Elements <====//
        this.forEach((element:any) => {
            //====> if No target [Return All Sibling] <====//
            if (!target) {
                //====> Filter and Exclude the Current Element <====//
                Array.from(element.parentNode.children).forEach((child:HTMLElement) => {
                    if (child !== element) siblings.push(child);
                });
            }

            //====> if have Target <====//
            else {
                //====> Filter and Catch only the matched targets <====//
                Array.from(element.parentNode.children).forEach((child:HTMLElement) => {
                    if (child !== element && child.matches(target)) siblings.push(child);
                });
            }
        });

        //====> Return Siblings <====//
        return siblings.length > 0 ? siblings : null;
    }

    /*====> Get Next Siblings <====*/
    next(target?, all_target?) {
        //====> Sibling Define <====//
        let siblings = [];
        
        //====> Loop Through Phenix Elements <====//
        this.forEach((element:any) => {
            //====> Define Next Unit <====//
            let nextUnit = element.nextElementSibling;
    
            //====> if No target [Return the Direct Next Sibling] <====//
            if (!target) siblings.push(nextUnit);
    
            //====> if Target is Detected <====//
            if (target) {
                //====> if All Next is the Target <====//
                if (target.includes('all', 0)) {
                    //====> Loop Through All Next Siblings <====//
                    while (nextUnit) {
                        //====> if All has Target & Matches this Unit <====//
                        if (all_target && nextUnit.matches(all_target)) siblings.push(nextUnit);
    
                        //====> if All has no Target get this Unit <====//
                        if (!all_target) siblings.push(nextUnit);
    
                        //====> get the next one <====//
                        nextUnit = nextUnit.nextElementSibling;
                    }
                }
    
                //====> Otherwise get the Next Matched Target [Next Until] <====//
                else {
                    //====> While there is a Next Unit <====//
                    while (nextUnit) {
                        //====> Check for the Target & Return it <====//
                        if (nextUnit.matches(target)) {
                            siblings.push(nextUnit);
                            break;
                        } else {
                            nextUnit = nextUnit.nextElementSibling;
                        }
                    }
                }
            }
        });

        //====> Return Siblings <====//
        if (siblings.length > 1) return siblings;
        else if (siblings.length === 1) return siblings[0];
    }

    /*====> Get Previous Siblings <====*/
    prev(target?, all_target?) {
        //====> Sibling Define <====//
        let siblings = [];
        
        //====> Loop Through Phenix Elements <====//
        this.forEach((element:any) => {
            //====> Define Previous Unit <====//
            let prevUnit = element.previousElementSibling;
    
            //====> if No target [Return the Direct Previous Sibling] <====//
            if (!target) siblings.push(prevUnit);
    
            //====> if Target is Detected <====//
            if (target) {
                //====> if All Previous is the Target <====//
                if (target.includes('all', 0)) {
                    //====> Loop Through All Previous Siblings <====//
                    while (prevUnit) {
                        //====> if All has Target & Matches this Unit <====//
                        if (all_target && prevUnit.matches(all_target)) siblings.push(prevUnit);
    
                        //====> if All has no Target get this Unit <====//
                        if (!all_target) siblings.push(prevUnit);
    
                        //====> get the previous one <====//
                        prevUnit = prevUnit.previousElementSibling;
                    }
                }
    
                //====> Otherwise get the Previous Matched Target [Previous Until] <====//
                else {
                    //====> While there is a Previous Unit <====//
                    while (prevUnit) {
                        //====> Check for the Target & Return it <====//
                        if (prevUnit.matches(target)) {
                            siblings.push(prevUnit);
                            break;
                        } else {
                            prevUnit = prevUnit.previousElementSibling;
                        }
                    }
                }
            }
        });
        
        //====> Return Siblings <====//
        if (siblings.length > 1) return siblings;
        else if (siblings.length === 1) return siblings[0];
    }

    /*====> CSS Styling <====*/
    css(style:object, clearInline?) {
        //====> if inline-style Clear is Activated <====//
        if (clearInline) this.forEach((element:HTMLElement) => (element.removeAttribute('style')));

        //====> for Each CSS Property <====//
        for (const [key, value] of Object.entries(style)) {
            //====> Convert Property[String] To Object Name[Key] <====//
            let property = key.replace(/(-[a-z])/, prop => prop.replace("-", "").toUpperCase());

            //====> Style Elements <====//
            this.forEach((element:HTMLElement) => (element.style[property] = value));
        }

        //====> Return Phenix Elements <====//
        return this
    }

    /*====> Set Mutliple Attributes <====*/
    setAttributes(attributes:{}) {
        //====> Loop Through Phenix Elements <====//
        this.forEach((element:HTMLElement) => {
            //====> Loop Through the Attributes <====//
            Object.keys(attributes).forEach(attribute => {
                //====> Set Attributes One By One <====//
                element.setAttribute(attribute, attributes[attribute]);
            });
        });

        //====> Return Phenix Elements <====//
        return this;
    }

    /*====> Insert Elements <====*/
    insert(position?:string, elementsPackage?:any) {
        //====> Define the Package <====//
        let new_package = [];

        //====> Loop Through Phenix Elements <====//
        this.forEach((element:HTMLElement) => {
            //===> String Element Converter to [Node] <===//
            if (typeof(elementsPackage) === 'string')
                elementsPackage = document.createRange().createContextualFragment(elementsPackage);

            //====> Insert After The Element <====//
            if (position === 'after') {
                element.parentNode.insertBefore(elementsPackage, element.nextSibling);
                //====> Include the New Element to the Package <====//
                new_package.push(element.nextElementSibling);
            }

            //====> Insert Before The Element <====//
            else if (position === 'before') {
                element.parentNode.insertBefore(elementsPackage, element);
                //====> Include the New Element to the Package <====//
                new_package.push(element.previousElementSibling);
            }

            //====> Insert Inside The Element at First <====//
            else if (position == 'prepend') {
                element.prepend(elementsPackage);
                //====> Include the New Element to the Package <====//
                new_package.push(element.firstChild);
            }

            //====> Insert Inside The Element at Last <====//
            else if (position == 'append') {
                element.appendChild(elementsPackage);
                //====> Include the New Element to the Package <====//
                new_package.push(element.lastChild);
            }
        });

        //====> Return the New Elements Package <====//
        if (new_package.length > 1) return new_package;
        else if (new_package.length === 1) return new_package[0];
    }

    /*====> Define Info Grapers <====*/
    height; getCSS; direction;
    inView; viewport;

    /*====> Define UI Effects <====*/
    slideUp; slideDown; slideToggle;
    fadeOut; fadeIn; fadeToggle;

    /*====> Define Other Features <====*/
    counter;
}

/*====> Include Features <====*/
import './features/get-info'; //==> Info Grapers
import './features/effects';  //==> UI Effects
import './features/counter';  //==> Animated Counter

/*====> Phenix Selecting Method <====*/
const Phenix = (selector:any) => {
    /*====> Get Elements <====*/
    if (typeof(selector) === 'string') {
        //====> Select for Phenix Elements <====//
        return new PhenixElements(...document.querySelectorAll<HTMLElement>(selector));

    /*====> if its Elements Passed it <====*/
    } else if (selector !== null && typeof(selector) !== 'undefined' || 'number') {
        //====> if Not Array Make it one <====//
        if (!Array.isArray(selector) || typeof(selector) !== 'object') selector = [selector];

        //====> and Created as Phenix Elements <====//
        return new PhenixElements(...selector);

    /*====> Selecting Error <====*/
    } else {
        console.error('!Oobs somthing went wrong make sure your passing valid selector to Phenix.')
    }
}

export default Phenix;

/*====> Integration <====*/
import './integration/wordpress';

/*====> Custom Script <====*/
import './custom-scripts';