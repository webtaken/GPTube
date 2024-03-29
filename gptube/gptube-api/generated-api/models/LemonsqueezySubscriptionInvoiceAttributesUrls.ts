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
 * @interface LemonsqueezySubscriptionInvoiceAttributesUrls
 */
export interface LemonsqueezySubscriptionInvoiceAttributesUrls {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributesUrls
     */
    invoiceUrl?: string;
}

/**
 * Check if a given object implements the LemonsqueezySubscriptionInvoiceAttributesUrls interface.
 */
export function instanceOfLemonsqueezySubscriptionInvoiceAttributesUrls(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSON(json: any): LemonsqueezySubscriptionInvoiceAttributesUrls {
    return LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscriptionInvoiceAttributesUrls {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'invoiceUrl': !exists(json, 'invoice_url') ? undefined : json['invoice_url'],
    };
}

export function LemonsqueezySubscriptionInvoiceAttributesUrlsToJSON(value?: LemonsqueezySubscriptionInvoiceAttributesUrls | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'invoice_url': value.invoiceUrl,
    };
}

