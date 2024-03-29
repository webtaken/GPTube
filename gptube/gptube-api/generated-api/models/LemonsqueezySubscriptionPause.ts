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
 * @interface LemonsqueezySubscriptionPause
 */
export interface LemonsqueezySubscriptionPause {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionPause
     */
    mode?: string;
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezySubscriptionPause
     */
    resumesAt?: string;
}

/**
 * Check if a given object implements the LemonsqueezySubscriptionPause interface.
 */
export function instanceOfLemonsqueezySubscriptionPause(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezySubscriptionPauseFromJSON(json: any): LemonsqueezySubscriptionPause {
    return LemonsqueezySubscriptionPauseFromJSONTyped(json, false);
}

export function LemonsqueezySubscriptionPauseFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezySubscriptionPause {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mode': !exists(json, 'mode') ? undefined : json['mode'],
        'resumesAt': !exists(json, 'resumes_at') ? undefined : json['resumes_at'],
    };
}

export function LemonsqueezySubscriptionPauseToJSON(value?: LemonsqueezySubscriptionPause | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mode': value.mode,
        'resumes_at': value.resumesAt,
    };
}

