/* tslint:disable */
/* eslint-disable */
/**
 * GPTube API swagger docs
 * This is the API documentation of GPTube
 *
 * The version of the OpenAPI document: 1.0
 * Contact: luckly083@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LemonsqueezyCheckoutOptions
 */
export interface LemonsqueezyCheckoutOptions {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutOptions
     */
    buttonColor?: string;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    dark?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    desc?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    discount?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    embed?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    logo?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    media?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutOptions
     */
    subscriptionPreview?: boolean;
}

/**
 * Check if a given object implements the LemonsqueezyCheckoutOptions interface.
 */
export function instanceOfLemonsqueezyCheckoutOptions(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyCheckoutOptionsFromJSON(json: any): LemonsqueezyCheckoutOptions {
    return LemonsqueezyCheckoutOptionsFromJSONTyped(json, false);
}

export function LemonsqueezyCheckoutOptionsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyCheckoutOptions {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'buttonColor': !exists(json, 'button_color') ? undefined : json['button_color'],
        'dark': !exists(json, 'dark') ? undefined : json['dark'],
        'desc': !exists(json, 'desc') ? undefined : json['desc'],
        'discount': !exists(json, 'discount') ? undefined : json['discount'],
        'embed': !exists(json, 'embed') ? undefined : json['embed'],
        'logo': !exists(json, 'logo') ? undefined : json['logo'],
        'media': !exists(json, 'media') ? undefined : json['media'],
        'subscriptionPreview': !exists(json, 'subscription_preview') ? undefined : json['subscription_preview'],
    };
}

export function LemonsqueezyCheckoutOptionsToJSON(value?: LemonsqueezyCheckoutOptions | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'button_color': value.buttonColor,
        'dark': value.dark,
        'desc': value.desc,
        'discount': value.discount,
        'embed': value.embed,
        'logo': value.logo,
        'media': value.media,
        'subscription_preview': value.subscriptionPreview,
    };
}

