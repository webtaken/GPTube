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
 * @interface LemonsqueezySubscriptionItem
 */
export interface LemonsqueezySubscriptionItem {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionItem
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionItem
     */
    id?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezySubscriptionItem
     */
    isUsageBased?: boolean;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionItem
     */
    priceId?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionItem
     */
    quantity?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionItem
     */
    subscriptionId?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionItem
     */
    updatedAt?: string;
}

/**
 * Check if a given object implements the LemonsqueezySubscriptionItem interface.
 */
export function instanceOfLemonsqueezySubscriptionItem(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionItemFromJSON(json: any): LemonsqueezySubscriptionItem {
    return LemonsqueezySubscriptionItemFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscriptionItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'isUsageBased': !exists(json, 'is_usage_based') ? undefined : json['is_usage_based'],
        'priceId': !exists(json, 'price_id') ? undefined : json['price_id'],
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
        'subscriptionId': !exists(json, 'subscription_id') ? undefined : json['subscription_id'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
    };
}

export function LemonsqueezySubscriptionItemToJSON(value?: LemonsqueezySubscriptionItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.createdAt,
        'id': value.id,
        'is_usage_based': value.isUsageBased,
        'price_id': value.priceId,
        'quantity': value.quantity,
        'subscription_id': value.subscriptionId,
        'updated_at': value.updatedAt,
    };
}
