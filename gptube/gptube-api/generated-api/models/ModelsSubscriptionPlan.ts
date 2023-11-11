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
import type { ModelsSubscriptionPlanSlug } from './ModelsSubscriptionPlanSlug';
import {
    ModelsSubscriptionPlanSlugFromJSON,
    ModelsSubscriptionPlanSlugFromJSONTyped,
    ModelsSubscriptionPlanSlugToJSON,
} from './ModelsSubscriptionPlanSlug';

/**
 * 
 * @export
 * @interface ModelsSubscriptionPlan
 */
export interface ModelsSubscriptionPlan {
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    description?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelsSubscriptionPlan
     */
    features?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    hrefMonthly?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    hrefYearly?: string;
    /**
     * PK
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ModelsSubscriptionPlan
     */
    isActive?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ModelsSubscriptionPlan
     */
    mostPopular?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof ModelsSubscriptionPlan
     */
    priceMonthly?: number;
    /**
     * 
     * @type {number}
     * @memberof ModelsSubscriptionPlan
     */
    priceYearly?: number;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    productId?: string;
    /**
     * 
     * @type {ModelsSubscriptionPlanSlug}
     * @memberof ModelsSubscriptionPlan
     */
    slug?: ModelsSubscriptionPlanSlug;
    /**
     * 
     * @type {string}
     * @memberof ModelsSubscriptionPlan
     */
    updatedAt?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ModelsSubscriptionPlan
     */
    variants?: Array<string>;
}

/**
 * Check if a given object implements the ModelsSubscriptionPlan interface.
 */
export function instanceOfModelsSubscriptionPlan(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelsSubscriptionPlanFromJSON(json: any): ModelsSubscriptionPlan {
    return ModelsSubscriptionPlanFromJSONTyped(json, false);
}

export function ModelsSubscriptionPlanFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsSubscriptionPlan {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'features': !exists(json, 'features') ? undefined : json['features'],
        'hrefMonthly': !exists(json, 'href_monthly') ? undefined : json['href_monthly'],
        'hrefYearly': !exists(json, 'href_yearly') ? undefined : json['href_yearly'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'isActive': !exists(json, 'is_active') ? undefined : json['is_active'],
        'mostPopular': !exists(json, 'most_popular') ? undefined : json['most_popular'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'priceMonthly': !exists(json, 'price_monthly') ? undefined : json['price_monthly'],
        'priceYearly': !exists(json, 'price_yearly') ? undefined : json['price_yearly'],
        'productId': !exists(json, 'product_id') ? undefined : json['product_id'],
        'slug': !exists(json, 'slug') ? undefined : ModelsSubscriptionPlanSlugFromJSON(json['slug']),
        'updatedAt': !exists(json, 'updated_at') ? undefined : json['updated_at'],
        'variants': !exists(json, 'variants') ? undefined : json['variants'],
    };
}

export function ModelsSubscriptionPlanToJSON(value?: ModelsSubscriptionPlan | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.createdAt,
        'description': value.description,
        'features': value.features,
        'href_monthly': value.hrefMonthly,
        'href_yearly': value.hrefYearly,
        'id': value.id,
        'is_active': value.isActive,
        'most_popular': value.mostPopular,
        'name': value.name,
        'price_monthly': value.priceMonthly,
        'price_yearly': value.priceYearly,
        'product_id': value.productId,
        'slug': ModelsSubscriptionPlanSlugToJSON(value.slug),
        'updated_at': value.updatedAt,
        'variants': value.variants,
    };
}

