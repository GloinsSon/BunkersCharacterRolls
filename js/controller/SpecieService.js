"use strict";

import {
    getSpecie,
    getSpeciesList,
    getSubspeciesList,
    getVariantList
} from "../data/DataHandler.js";
import {ViewController} from "../view/ViewController.js";
import {ColorService} from "./ColorService.js";
import {ExtrasController} from "./ExtrasController.js";

import ("../data/DataHandler.js");

/**
 * controller for species and subspieces
 * @author Gimli GloinsSon
 */


export class SpecieService {
    constructor() {
    }

    /**
     * add the species to the selection
     */
    populateSpecies() {
        (async () => {
            let exists = false;
            while (!exists) {
                exists = Object.keys(DataStore).length !== 0;
                if (!exists)
                    await new Promise(resolve => setTimeout(resolve, 100));
            }
            const viewController = new ViewController();
            const speciesList = getSpeciesList();

            const speciesLogos = document.getElementById("species");
            speciesLogos.innerText = null;
            for (const [speciesKey, specie] of Object.entries(speciesList)) {
                let logo = viewController.buildLogo(
                    "species",
                    speciesKey,
                    speciesKey,
                    specie.logo,
                    0,
                    0);
                speciesLogos.innerHTML += logo;
            }

            let species = document.querySelector("input[name='species']");
            species.checked = true;
            this.changeSpecies();
        })();

    }

    /**
     * add the subspiecies to the selection
     * @param specieKey
     */
    populateSubSpecies(specieKey) {
        (async () => {
            let exists = false;
            while (!exists) {
                exists = DataStore.hasOwnProperty(specieKey) &&
                    Object.keys(DataStore[specieKey].subspecies).length !== 0;
                if (!exists)
                    await new Promise(resolve => setTimeout(resolve, 100));
            }
            const viewController = new ViewController();
            const subspeciesList = getSubspeciesList(specieKey);
            const subSpiecesLogos = document.getElementById("subspecies");
            const diceValue = 4; // FIXME
            subSpiecesLogos.innerHTML = viewController.buildDroparea("Variant", "diceTarget");

            for (const [key, subspecie] of Object.entries(subspeciesList)) {
                let logo = viewController.buildLogo(
                    "subspecies",
                    key,
                    specieKey,
                    subspecie.logo,
                    subspecie.rarity,
                    diceValue
                    );
                subSpiecesLogos.innerHTML += logo;
            }

            let subspecies = document.querySelector("input[name='subspecies']");
            subspecies.checked = true;
            this.changeSubSpecies();
        })();
    }

    /**
     * add variants to the selection
     * @param specieKey
     * @param subspecieKey
     */
    populateVariants(specieKey, subspecieKey) {
        (async () => {
            let exists = false;
            while (!exists) {
                if (DataStore.hasOwnProperty(specieKey) &&
                    Object.keys(DataStore[specieKey].subspecies).length !== 0 &&
                    DataStore[specieKey].subspecies.hasOwnProperty(subspecieKey)) {

                    exists = Object.keys(DataStore[specieKey].subspecies[subspecieKey]).length !== 0;
                }

                if (!exists)
                    await new Promise(resolve => setTimeout(resolve, 100));
            }
            const viewController = new ViewController();
            const variantList = getVariantList(specieKey, subspecieKey);
            const variantLogos = document.getElementById("variants");

            variantLogos.innerText = null;
            for (const [variantKey, variant] of Object.entries(variantList)) {
                let logo = viewController.buildLogo(
                    "variant",
                    variantKey,
                    specieKey,
                    variant.logo,
                    variant.rarity,
                    2 // FIXME
                );
                variantLogos.innerHTML += logo;
            }

            let variants = document.querySelector("input[name='variant']");
            variants.checked = true;
            this.changeVariant();
        })();
    }

    /**
     * the user changed the specie
     */
    changeSpecies() {
        let specieKey = document.querySelector("input[name='species']:checked").value;
        const specie = getSpecie(specieKey);



        (async () => {
            let exists = false;
            while (!exists) {
                exists = DataStore[specieKey].humanoid.length !== 0;
                if (!exists)
                    await new Promise(resolve => setTimeout(resolve, 100));
            }
            let svgHuman = "";
            for (let i = 0; i < specie.humanoid.length; i++) {
                svgHuman += specie.humanoid[i];
            }
            document.getElementById("humanoid").innerHTML = svgHuman;
            document.body.style.backgroundColor = specie.bgcolor;
            this.populateSubSpecies(specieKey);

            let extrasController = new ExtrasController();
            extrasController.populateExtras();
        })();
    }

    /**
     * the user changed the subSpecies
     */
    changeSubSpecies() {
        this.populateVariants(
            document.querySelector("input[name='species']:checked").value,
            document.querySelector("input[name='subspecies']:checked").value
        );
    }

    /**
     * the user changed the variant
     */
    changeVariant() {
        let colorService = new ColorService();
        colorService.populateColors("skins");
        colorService.populateColors("eyes");
        colorService.populateColors("ears");

        colorService.changeColors();
    }
}