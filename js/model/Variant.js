"use strict";

/**
 * a color variant of a subspieces
 */

export class Variant {
    /**
     * constructor
     * @param key
     * @param name
     * @param logo
     * @param skins
     * @param ears
     * @param eyes
     * @param rarity
     */
    constructor(key, name, logo, skins, ears, eyes, rarity) {
        this.key = key;
        this.name = name;
        this.logo = logo;
        this.skins = skins;
        this.ears = ears;
        this.eyes = eyes;
        this.rarity = rarity;
    }
}