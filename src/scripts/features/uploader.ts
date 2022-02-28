/**======> Referance By Comment <======
 * ===> 01 - Phenix Object
 * ===> 02 - 
*/

/*====> Phenix Object <====*/
import Phenix, { PhenixElements } from "..";

/*====> Uploader [un-tested] <====*/
PhenixElements.prototype.uploader = function (options?:{
    type?:string,   //===> standard, advanced
    src?:string,    //===> Media Source [URL]
}) {
    //====> Loop Through Phenix Elements <====//
    this.forEach(uploader => {
        if(uploader.classList.contains('px-done')) return;
        //====> When Value Change <===//
        uploader.addEventListener('change', event => {
            //===> Get Files Names <===//
            var filePath = [];
            for (var i = 0; i < uploader.files.length; ++i) filePath.push(uploader.files[i].name);
            //===> Set Files Names <===//
            uploader.parentNode.setAttribute('data-text',filePath);
        });
        //===> Done <===//
        uploader.classList.add('px-done');
    });
}