"use strict";

import {SpecieService} from "./SpecieService.js";
import {ColorService} from "./ColorService.js";
import {ExtrasController} from "./ExtrasController.js";
import {getSpeciesList, getSubspeciesList, loadingProgress} from "../data/DataHandler.js";

/**
 * main controller
 * @author Gimli GloinsSon
 */
export default class Controller {
    constructor() {
        loadingProgress("init");
    }

    /**
     * initialize settings
     */
    init() {
        let speciesService = new SpecieService();
        speciesService.populateSpecies();
        document.getElementById("selection").className = "form-horizontal";
    }
}