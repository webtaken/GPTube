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
import type { LemonsqueezySubscriptionInvoiceAttributesUrls } from './LemonsqueezySubscriptionInvoiceAttributesUrls';
import {
    LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSON,
    LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSONTyped,
    LemonsqueezySubscriptionInvoiceAttributesUrlsToJSON,
} from './LemonsqueezySubscriptionInvoiceAttributesUrls';

/**
 * 
 * @export
 * @interface LemonsqueezySubscriptionInvoiceAttributes
 */
export interface LemonsqueezySubscriptionInvoiceAttributes {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    billingReason?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    cardBrand?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    cardLastFour?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    currency?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    currencyRate?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    discountTotal?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    discountTotalFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    discountTotalUsd?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    refunded?: boolean;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    refundedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    statusFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    storeId?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    subscriptionId?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    subtotal?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    subtotalFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    subtotalUsd?: number;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    tax?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    taxFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    taxUsd?: number;
    /**
     * 
     * @type {boolean}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    testMode?: boolean;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    total?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    totalFormatted?: string;
    /**
     * 
     * @type {number}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    totalUsd?: number;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    updatedAt?: string;
    /**
     * 
     * @type {LemonsqueezySubscriptionInvoiceAttributesUrls}
     * @memberof LemonsqueezySubscriptionInvoiceAttributes
     */
    urls?: LemonsqueezySubscriptionInvoiceAttributesUrls;
}

/**
 * Check if a given object implements the LemonsqueezySubscriptionInvoiceAttributes interface.
 */
export function instanceOfLemonsqueezySubscriptionInvoiceAttributes(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionInvoiceAttributesFromJSON(json: any): LemonsqueezySubscriptionInvoiceAttributes {
    return LemonsqueezySubscriptionInvoiceAttributesFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionInvoiceAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscriptionInvoiceAttributes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'billingReason': !exists(json, 'billing_reason') ? undefined : json['billing_reason'],
        'cardBrand': !exists(json, 'card_brand') ? undefined : json['card_brand'],
        'cardLastFour': !exists(json, 'card_last_four') ? undefined : json['card_last_four'],
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'currencyRate': !exists(json, 'currency_rate') ? undefined : json['currency_rate'],
        'discountTotal': !exists(json, 'discount_total') ? undefined : json['discount_total'],
        'discountTotalFormatted': !exists(json, 'discount_total_formatted') ? undefined : json['discount_total_formatted'],
        'discountTotalUsd': !exists(json, 'discount_total_usd') ? undefined : json['discount_total_usd'],
        'refunded': !exists(json, 'refunded') ? undefined : json['refunded'],
        'refundedAt': !exists(json, 'refunded_at') ? undefined : json['refunded_at'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'statusFormatted': !exists(json, 'status_formatted') ? undefined : json['status_formatted'],
        'storeId': !exists(json, 'store_id') ? undefined : json['store_id'],
        'subscriptionId': !exists(json, 'subscription_id') ? undefined : json['subscription_id'],
        'subtotal': !exists(json, 'subtotal') ? undefined : json['subtotal'],
        'subtotalFormatted': !exists(json, 'subtotal_formatted') ? undefined : json['subtotal_formatted'],
        'subtotalUsd': !exists(json, 'subtotal_usd') ? undefined : json['subtotal_usd'],
        'tax': !exists(json, 'tax') ? undefined : json['tax'],
        'taxFormatted': !exists(json, 'tax_formatted') ? undefined : json['tax_formatted'],
        'taxUsd': !exists(json, 'tax_usd') ? undefined : json['tax_usd'],
        'testMode': !exists(json, 'test_mode') ? undefined : json['test_mode'],
        'total': !exists(json, 'total') ? undefined : json['total'],
        'totalFormatted': !exists(json, 'total_formatted') ? undefined : json['total_formatted'],
        'totalUsd': !exists(json, 'total_usd') ? undefined : json['total_usd'],
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
        'urls': !exists(json, 'urls') ? undefined : LemonsqueezySubscriptionInvoiceAttributesUrlsFromJSON(json['urls']),
    };
}

export function LemonsqueezySubscriptionInvoiceAttributesToJSON(value?: LemonsqueezySubscriptionInvoiceAttributes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'billing_reason': value.billingReason,
        'card_brand': value.cardBrand,
        'card_last_four': value.cardLastFour,
        'created_at': value.createdAt,
        'currency': value.currency,
        'currency_rate': value.currencyRate,
        'discount_total': value.discountTotal,
        'discount_total_formatted': value.discountTotalFormatted,
        'discount_total_usd': value.discountTotalUsd,
        'refunded': value.refunded,
        'refunded_at': value.refundedAt,
        'status': value.status,
        'status_formatted': value.statusFormatted,
        'store_id': value.storeId,
        'subscription_id': value.subscriptionId,
        'subtotal': value.subtotal,
        'subtotal_formatted': value.subtotalFormatted,
        'subtotal_usd': value.subtotalUsd,
        'tax': value.tax,
        'tax_formatted': value.taxFormatted,
        'tax_usd': value.taxUsd,
        'test_mode': value.testMode,
        'total': value.total,
        'total_formatted': value.totalFormatted,
        'total_usd': value.totalUsd,
        'updated_at': value.updatedAt,
        'urls': LemonsqueezySubscriptionInvoiceAttributesUrlsToJSON(value.urls),
    };
}

