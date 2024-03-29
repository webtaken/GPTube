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
import type { LemonsqueezyApiResponseLinks } from './LemonsqueezyApiResponseLinks';
import {
    LemonsqueezyApiResponseLinksFromJSON,
    LemonsqueezyApiResponseLinksFromJSONTyped,
    LemonsqueezyApiResponseLinksToJSON,
} from './LemonsqueezyApiResponseLinks';

/**
 * 
 * @export
 * @interface LemonsqueezyApiResponseRelationshipsSubscriptionInvoice
 */
export interface LemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    /**
     * 
     * @type {LemonsqueezyApiResponseLinks}
     * @memberof LemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    store?: LemonsqueezyApiResponseLinks;
    /**
     * 
     * @type {LemonsqueezyApiResponseLinks}
     * @memberof LemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    subscription?: LemonsqueezyApiResponseLinks;
}

/**
 * Check if a given object implements the LemonsqueezyApiResponseRelationshipsSubscriptionInvoice interface.
 */
export function instanceOfLemonsqueezyApiResponseRelationshipsSubscriptionInvoice(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON(json: any): LemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    return LemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSONTyped(json, false);
}

export function LemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'store': !exists(json, 'store') ? undefined : LemonsqueezyApiResponseLinksFromJSON(json['store']),
        'subscription': !exists(json, 'subscription') ? undefined : LemonsqueezyApiResponseLinksFromJSON(json['subscription']),
    };
}

export function LemonsqueezyApiResponseRelationshipsSubscriptionInvoiceToJSON(value?: LemonsqueezyApiResponseRelationshipsSubscriptionInvoice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'store': LemonsqueezyApiResponseLinksToJSON(value.store),
        'subscription': LemonsqueezyApiResponseLinksToJSON(value.subscription),
    };
}

