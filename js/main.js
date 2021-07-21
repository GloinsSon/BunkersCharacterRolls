/**
 * main script to start execution
 * @author Gimli GloinsSon
 */
let DataStore = {};  // main datastore
let Loading = 99;    // counter for loaded files


let controller;

/**
 * register listeners for all form elements
 */
document.addEventListener("DOMContentLoaded", () => {
    import("./controller/Controller.js")
        .then((module) => {
            import ("./data/DataHandler.js")
                .then((module) => {
                    module.default();
                });

            controller = new module.default;
            controller.init();

            /*
            document.getElementById("selection").addEventListener("change", controller.changeSettings);
            document.getElementById("selection").addEventListener("reset", controller.init);
            document.getElementById("random").addEventListener("click", randomBunker);
            document.getElementById("btnDownload").addEventListener("click", createDownload);
            */

        });
});

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text");
    const sourceElement = document.getElementById(sourceId);

    const srcURL = sourceElement.getAttribute("src");
    const srcAlt = sourceElement.getAttribute("alt");

    sourceElement.setAttribute("src", event.target.getAttribute("src"));
    sourceElement.setAttribute("alt", event.target.getAttribute("alt"));
    event.target.setAttribute("src", srcURL);
    event.target.setAttribute("alt", srcAlt);

    const parent = event.target.parentElement.parentElement;
    const inputField = parent.querySelector("input[type='text']");
    inputField.setAttribute("value", srcAlt);

}

function allowDrop(ev) {
    ev.preventDefault();
}
