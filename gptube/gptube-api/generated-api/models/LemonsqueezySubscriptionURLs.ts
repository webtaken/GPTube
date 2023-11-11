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
 * @interface LemonsqueezySubscriptionURLs
 */
export interface LemonsqueezySubscriptionURLs {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionURLs
     */
    updatePaymentMethod?: string;
}

/**
 * Check if a given object implements the LemonsqueezySubscriptionURLs interface.
 */
export function instanceOfLemonsqueezySubscriptionURLs(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionURLsFromJSON(json: any): LemonsqueezySubscriptionURLs {
    return LemonsqueezySubscriptionURLsFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionURLsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscriptionURLs {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'updatePaymentMethod': !exists(json, 'update_payment_method') ? undefined : json['update_payment_method'],
    };
}

export function LemonsqueezySubscriptionURLsToJSON(value?: LemonsqueezySubscriptionURLs | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'update_payment_method': value.updatePaymentMethod,
    };
}

