/*!
 * Onpaste JS:   v1.0.0
 * Version Date: 08/12/2023
 * Developed by: Rogério Saraceni
 * Licensed MIT
 * https://github.com/rogeriosaraceni/onpaste-js
 */

window.addEventListener("load", () => { 
    function onpaste() {
        const reader     = new FileReader();
        const contentImg = document.querySelector('[data-js="img"]');
        const inputImg   = document.querySelector('[data-js="input"]');
        const btnZoom    = document.querySelector('[data-js="btn-zoom"]');
        const btnDel     = document.querySelector('[data-js="btn-del"]');

        reader.onload = function (result) {
            const img = document.createElement("img");
            img.src = result.target.result;

            contentImg.appendChild(img);
            contentImg.classList.add("z-2");
            contentImg.setAttribute("data-src", img.src);
            btnDel.classList.add("visible");
            btnZoom.classList.add("d-flex");

            btnDel.addEventListener("click", (event) => {
                event.preventDefault();
                img.remove();
                contentImg.classList.remove("z-2");
                contentImg.setAttribute("data-src", "");
                btnDel.classList.remove("visible");
                btnZoom.classList.remove("d-flex");
            });
        };

        if (inputImg) {
            inputImg.onpaste = function (event) {
                if (contentImg.querySelector("img")) {
                    return;
                }

                let items = event.clipboardData.items;

                for (index in items) {
                    let item = items[index];

                    if (item.kind == "file") {
                        reader.readAsDataURL(item.getAsFile());
                    }
                }
            };
        }
    }
    
    onpaste()
})
