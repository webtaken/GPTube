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
import type { LemonsqueezyBillingAddress } from './LemonsqueezyBillingAddress';
import {
    LemonsqueezyBillingAddressFromJSON,
    LemonsqueezyBillingAddressFromJSONTyped,
    LemonsqueezyBillingAddressToJSON,
} from './LemonsqueezyBillingAddress';

/**
 * 
 * @export
 * @interface LemonsqueezyCheckoutData
 */
export interface LemonsqueezyCheckoutData {
    /**
     * 
     * @type {Array<LemonsqueezyBillingAddress>}
     * @memberof LemonsqueezyCheckoutData
     */
    billingAddress?: Array<LemonsqueezyBillingAddress>;
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof LemonsqueezyCheckoutData
     */
    custom?: { [key: string]: object; };
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutData
     */
    discountCode?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutData
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutData
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyCheckoutData
     */
    taxNumber?: string;
}

/**
 * Check if a given object implements the LemonsqueezyCheckoutData interface.
 */
export function instanceOfLemonsqueezyCheckoutData(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyCheckoutDataFromJSON(json: any): LemonsqueezyCheckoutData {
    return LemonsqueezyCheckoutDataFromJSONTyped(json, false);
}

export function LemonsqueezyCheckoutDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyCheckoutData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'billingAddress': !exists(json, 'billing_address') ? undefined : ((json['billing_address'] as Array<any>).map(LemonsqueezyBillingAddressFromJSON)),
        'custom': !exists(json, 'custom') ? undefined : json['custom'],
        'discountCode': !exists(json, 'discount_code') ? undefined : json['discount_code'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'taxNumber': !exists(json, 'tax_number') ? undefined : json['tax_number'],
    };
}

export function LemonsqueezyCheckoutDataToJSON(value?: LemonsqueezyCheckoutData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'billing_address': value.billingAddress === undefined ? undefined : ((value.billingAddress as Array<any>).map(LemonsqueezyBillingAddressToJSON)),
        'custom': value.custom,
        'discount_code': value.discountCode,
        'email': value.email,
        'name': value.name,
        'tax_number': value.taxNumber,
    };
}

