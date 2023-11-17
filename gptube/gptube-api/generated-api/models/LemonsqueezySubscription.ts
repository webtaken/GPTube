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
import type { LemonsqueezySubscriptionFirstSubscriptionItem } from './LemonsqueezySubscriptionFirstSubscriptionItem';
import {
    LemonsqueezySubscriptionFirstSubscriptionItemFromJSON,
    LemonsqueezySubscriptionFirstSubscriptionItemFromJSONTyped,
    LemonsqueezySubscriptionFirstSubscriptionItemToJSON,
} from './LemonsqueezySubscriptionFirstSubscriptionItem';
import type { LemonsqueezySubscriptionPause } from './LemonsqueezySubscriptionPause';
import {
    LemonsqueezySubscriptionPauseFromJSON,
    LemonsqueezySubscriptionPauseFromJSONTyped,
    LemonsqueezySubscriptionPauseToJSON,
} from './LemonsqueezySubscriptionPause';
import type { LemonsqueezySubscriptionURLs } from './LemonsqueezySubscriptionURLs';
import {
    LemonsqueezySubscriptionURLsFromJSON,
    LemonsqueezySubscriptionURLsFromJSONTyped,
    LemonsqueezySubscriptionURLsToJSON,
} from './LemonsqueezySubscriptionURLs';

/**
 * 
 * @export
 * @interface LemonsqueezySubscription
 */
export interface LemonsqueezySubscription {
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    billingAnchor?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezySubscription
     */
    cancelled?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    cardBrand?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    cardLastFour?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    createdAt?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    customerId?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    endsAt?: string;
    /**
     * 
     * @type {LemonsqueezySubscriptionFirstSubscriptionItem}
     * @memberof LemonsqueezySubscription
     */
    firstSubscriptionItem?: LemonsqueezySubscriptionFirstSubscriptionItem;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    orderId?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    orderItemId?: number;
    /**
     * 
     * @type {LemonsqueezySubscriptionPause}
     * @memberof LemonsqueezySubscription
     */
    pause?: LemonsqueezySubscriptionPause;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    productId?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    productName?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    renewsAt?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    statusFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    storeId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezySubscription
     */
    testMode?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    trialEndsAt?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    updatedAt?: string;
    /**
     * 
     * @type {LemonsqueezySubscriptionURLs}
     * @memberof LemonsqueezySubscription
     */
    urls?: LemonsqueezySubscriptionURLs;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    userEmail?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    userName?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscription
     */
    variantId?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscription
     */
    variantName?: string;
}

/**
 * Check if a given object implements the LemonsqueezySubscription interface.
 */
export function instanceOfLemonsqueezySubscription(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionFromJSON(json: any): LemonsqueezySubscription {
    return LemonsqueezySubscriptionFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscription {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'billingAnchor': !exists(json, 'billing_anchor') ? undefined : json['billing_anchor'],
        'cancelled': !exists(json, 'cancelled') ? undefined : json['cancelled'],
        'cardBrand': !exists(json, 'card_brand') ? undefined : json['card_brand'],
        'cardLastFour': !exists(json, 'card_last_four') ? undefined : json['card_last_four'],
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'customerId': !exists(json, 'customer_id') ? undefined : json['customer_id'],
        'endsAt': !exists(json, 'ends_at') ? undefined : json['ends_at'],
        'firstSubscriptionItem': !exists(json, 'first_subscription_item') ? undefined : LemonsqueezySubscriptionFirstSubscriptionItemFromJSON(json['first_subscription_item']),
        'orderId': !exists(json, 'order_id') ? undefined : json['order_id'],
        'orderItemId': !exists(json, 'order_item_id') ? undefined : json['order_item_id'],
        'pause': !exists(json, 'pause') ? undefined : LemonsqueezySubscriptionPauseFromJSON(json['pause']),
        'productId': !exists(json, 'product_id') ? undefined : json['product_id'],
        'productName': !exists(json, 'product_name') ? undefined : json['product_name'],
        'renewsAt': !exists(json, 'renews_at') ? undefined : json['renews_at'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'statusFormatted': !exists(json, 'status_formatted') ? undefined : json['status_formatted'],
        'storeId': !exists(json, 'store_id') ? undefined : json['store_id'],
        'testMode': !exists(json, 'test_mode') ? undefined : json['test_mode'],
        'trialEndsAt': !exists(json, 'trial_ends_at') ? undefined : json['trial_ends_at'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
        'urls': !exists(json, 'urls') ? undefined : LemonsqueezySubscriptionURLsFromJSON(json['urls']),
        'userEmail': !exists(json, 'user_email') ? undefined : json['user_email'],
        'userName': !exists(json, 'user_name') ? undefined : json['user_name'],
        'variantId': !exists(json, 'variant_id') ? undefined : json['variant_id'],
        'variantName': !exists(json, 'variant_name') ? undefined : json['variant_name'],
    };
}

export function LemonsqueezySubscriptionToJSON(value?: LemonsqueezySubscription | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'billing_anchor': value.billingAnchor,
        'cancelled': value.cancelled,
        'card_brand': value.cardBrand,
        'card_last_four': value.cardLastFour,
        'created_at': value.createdAt,
        'customer_id': value.customerId,
        'ends_at': value.endsAt,
        'first_subscription_item': LemonsqueezySubscriptionFirstSubscriptionItemToJSON(value.firstSubscriptionItem),
        'order_id': value.orderId,
        'order_item_id': value.orderItemId,
        'pause': LemonsqueezySubscriptionPauseToJSON(value.pause),
        'product_id': value.productId,
        'product_name': value.productName,
        'renews_at': value.renewsAt,
        'status': value.status,
        'status_formatted': value.statusFormatted,
        'store_id': value.storeId,
        'test_mode': value.testMode,
        'trial_ends_at': value.trialEndsAt,
        'updated_at': value.updatedAt,
        'urls': LemonsqueezySubscriptionURLsToJSON(value.urls),
        'user_email': value.userEmail,
        'user_name': value.userName,
        'variant_id': value.variantId,
        'variant_name': value.variantName,
    };
}

