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
import type { LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice } from './LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice';
import {
    LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON,
    LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSONTyped,
    LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceToJSON,
} from './LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice';
import type { LemonsqueezyApiResponseJSONAPI } from './LemonsqueezyApiResponseJSONAPI';
import {
    LemonsqueezyApiResponseJSONAPIFromJSON,
    LemonsqueezyApiResponseJSONAPIFromJSONTyped,
    LemonsqueezyApiResponseJSONAPIToJSON,
} from './LemonsqueezyApiResponseJSONAPI';
import type { LemonsqueezyApiResponseListLink } from './LemonsqueezyApiResponseListLink';
import {
    LemonsqueezyApiResponseListLinkFromJSON,
    LemonsqueezyApiResponseListLinkFromJSONTyped,
    LemonsqueezyApiResponseListLinkToJSON,
} from './LemonsqueezyApiResponseListLink';
import type { LemonsqueezyApiResponseListMeta } from './LemonsqueezyApiResponseListMeta';
import {
    LemonsqueezyApiResponseListMetaFromJSON,
    LemonsqueezyApiResponseListMetaFromJSONTyped,
    LemonsqueezyApiResponseListMetaToJSON,
} from './LemonsqueezyApiResponseListMeta';

/**
 * 
 * @export
 * @interface LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice
 */
export interface LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    /**
     * 
     * @type {Array<LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice>}
     * @memberof LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    data?: Array<LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice>;
    /**
     * 
     * @type {LemonsqueezyApiResponseJSONAPI}
     * @memberof LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    jsonapi?: LemonsqueezyApiResponseJSONAPI;
    /**
     * 
     * @type {LemonsqueezyApiResponseListLink}
     * @memberof LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    links?: LemonsqueezyApiResponseListLink;
    /**
     * 
     * @type {LemonsqueezyApiResponseListMeta}
     * @memberof LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice
     */
    meta?: LemonsqueezyApiResponseListMeta;
}

/**
 * Check if a given object implements the LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice interface.
 */
export function instanceOfLemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON(json: any): LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    return LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSONTyped(json, false);
}

export function LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON)),
        'jsonapi': !exists(json, 'jsonapi') ? undefined : LemonsqueezyApiResponseJSONAPIFromJSON(json['jsonapi']),
        'links': !exists(json, 'links') ? undefined : LemonsqueezyApiResponseListLinkFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : LemonsqueezyApiResponseListMetaFromJSON(json['meta']),
    };
}

export function LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceToJSON(value?: LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(LemonsqueezyApiResponseDataLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceToJSON)),
        'jsonapi': LemonsqueezyApiResponseJSONAPIToJSON(value.jsonapi),
        'links': LemonsqueezyApiResponseListLinkToJSON(value.links),
        'meta': LemonsqueezyApiResponseListMetaToJSON(value.meta),
    };
}
