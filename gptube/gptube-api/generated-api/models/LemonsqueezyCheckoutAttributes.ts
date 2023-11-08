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
import type { LemonsqueezyCheckoutData } from './LemonsqueezyCheckoutData';
import {
    LemonsqueezyCheckoutDataFromJSON,
    LemonsqueezyCheckoutDataFromJSONTyped,
    LemonsqueezyCheckoutDataToJSON,
} from './LemonsqueezyCheckoutData';
import type { LemonsqueezyCheckoutOptions } from './LemonsqueezyCheckoutOptions';
import {
    LemonsqueezyCheckoutOptionsFromJSON,
    LemonsqueezyCheckoutOptionsFromJSONTyped,
    LemonsqueezyCheckoutOptionsToJSON,
} from './LemonsqueezyCheckoutOptions';
import type { LemonsqueezyCheckoutProductOptions } from './LemonsqueezyCheckoutProductOptions';
import {
    LemonsqueezyCheckoutProductOptionsFromJSON,
    LemonsqueezyCheckoutProductOptionsFromJSONTyped,
    LemonsqueezyCheckoutProductOptionsToJSON,
} from './LemonsqueezyCheckoutProductOptions';

/**
 * 
 * @export
 * @interface LemonsqueezyCheckoutAttributes
 */
export interface LemonsqueezyCheckoutAttributes {
    /**
     * 
     * @type {LemonsqueezyCheckoutData}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    checkoutData?: LemonsqueezyCheckoutData;
    /**
     * 
     * @type {LemonsqueezyCheckoutOptions}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    checkoutOptions?: LemonsqueezyCheckoutOptions;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    createdAt?: string;
    /**
     * 
     * @type {object}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    customPrice?: object;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    expiresAt?: string;
    /**
     * 
     * @type {LemonsqueezyCheckoutProductOptions}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    productOptions?: LemonsqueezyCheckoutProductOptions;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    storeId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    testMode?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    updatedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    url?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezyCheckoutAttributes
     */
    variantId?: number;
}

/**
 * Check if a given object implements the LemonsqueezyCheckoutAttributes interface.
 */
export function instanceOfLemonsqueezyCheckoutAttributes(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyCheckoutAttributesFromJSON(json: any): LemonsqueezyCheckoutAttributes {
    return LemonsqueezyCheckoutAttributesFromJSONTyped(json, false);
}

export function LemonsqueezyCheckoutAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyCheckoutAttributes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'checkoutData': !exists(json, 'checkout_data') ? undefined : LemonsqueezyCheckoutDataFromJSON(json['checkout_data']),
        'checkoutOptions': !exists(json, 'checkout_options') ? undefined : LemonsqueezyCheckoutOptionsFromJSON(json['checkout_options']),
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'customPrice': !exists(json, 'custom_price') ? undefined : json['custom_price'],
        'expiresAt': !exists(json, 'expires_at') ? undefined : json['expires_at'],
        'productOptions': !exists(json, 'product_options') ? undefined : LemonsqueezyCheckoutProductOptionsFromJSON(json['product_options']),
        'storeId': !exists(json, 'store_id') ? undefined : json['store_id'],
        'testMode': !exists(json, 'test_mode') ? undefined : json['test_mode'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
        'url': !exists(json, 'url') ? undefined : json['url'],
        'variantId': !exists(json, 'variant_id') ? undefined : json['variant_id'],
    };
}

export function LemonsqueezyCheckoutAttributesToJSON(value?: LemonsqueezyCheckoutAttributes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'checkout_data': LemonsqueezyCheckoutDataToJSON(value.checkoutData),
        'checkout_options': LemonsqueezyCheckoutOptionsToJSON(value.checkoutOptions),
        'created_at': value.createdAt,
        'custom_price': value.customPrice,
        'expires_at': value.expiresAt,
        'product_options': LemonsqueezyCheckoutProductOptionsToJSON(value.productOptions),
        'store_id': value.storeId,
        'test_mode': value.testMode,
        'updated_at': value.updatedAt,
        'url': value.url,
        'variant_id': value.variantId,
    };
}
