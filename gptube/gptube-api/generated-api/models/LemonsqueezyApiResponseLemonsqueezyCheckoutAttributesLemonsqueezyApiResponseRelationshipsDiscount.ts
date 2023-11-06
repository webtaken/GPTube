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
import type { LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount } from './LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount';
import {
    LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSON,
    LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSONTyped,
    LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountToJSON,
} from './LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount';
import type { LemonsqueezyApiResponseJSONAPI } from './LemonsqueezyApiResponseJSONAPI';
import {
    LemonsqueezyApiResponseJSONAPIFromJSON,
    LemonsqueezyApiResponseJSONAPIFromJSONTyped,
    LemonsqueezyApiResponseJSONAPIToJSON,
} from './LemonsqueezyApiResponseJSONAPI';
import type { LemonsqueezyApiResponseSelfLink } from './LemonsqueezyApiResponseSelfLink';
import {
    LemonsqueezyApiResponseSelfLinkFromJSON,
    LemonsqueezyApiResponseSelfLinkFromJSONTyped,
    LemonsqueezyApiResponseSelfLinkToJSON,
} from './LemonsqueezyApiResponseSelfLink';

/**
 * 
 * @export
 * @interface LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount
 */
export interface LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount {
    /**
     * 
     * @type {LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount}
     * @memberof LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount
     */
    data?: LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount;
    /**
     * 
     * @type {LemonsqueezyApiResponseJSONAPI}
     * @memberof LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount
     */
    jsonapi?: LemonsqueezyApiResponseJSONAPI;
    /**
     * 
     * @type {LemonsqueezyApiResponseSelfLink}
     * @memberof LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount
     */
    links?: LemonsqueezyApiResponseSelfLink;
}

/**
 * Check if a given object implements the LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount interface.
 */
export function instanceOfLemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSON(json: any): LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount {
    return LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSONTyped(json, false);
}

export function LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSON(json['data']),
        'jsonapi': !exists(json, 'jsonapi') ? undefined : LemonsqueezyApiResponseJSONAPIFromJSON(json['jsonapi']),
        'links': !exists(json, 'links') ? undefined : LemonsqueezyApiResponseSelfLinkFromJSON(json['links']),
    };
}

export function LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountToJSON(value?: LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': LemonsqueezyApiResponseDataLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountToJSON(value.data),
        'jsonapi': LemonsqueezyApiResponseJSONAPIToJSON(value.jsonapi),
        'links': LemonsqueezyApiResponseSelfLinkToJSON(value.links),
    };
}

