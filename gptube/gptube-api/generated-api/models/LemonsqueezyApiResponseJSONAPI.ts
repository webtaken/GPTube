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
 * @interface LemonsqueezyApiResponseJSONAPI
 */
export interface LemonsqueezyApiResponseJSONAPI {
    /**
     * 
     * @type {string}
     * @memberof LemonsqueezyApiResponseJSONAPI
     */
    version?: string;
}

/**
 * Check if a given object implements the LemonsqueezyApiResponseJSONAPI interface.
 */
export function instanceOfLemonsqueezyApiResponseJSONAPI(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LemonsqueezyApiResponseJSONAPIFromJSON(json: any): LemonsqueezyApiResponseJSONAPI {
    return LemonsqueezyApiResponseJSONAPIFromJSONTyped(json, false);
}

export function LemonsqueezyApiResponseJSONAPIFromJSONTyped(json: any, ignoreDiscriminator: boolean): LemonsqueezyApiResponseJSONAPI {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}

export function LemonsqueezyApiResponseJSONAPIToJSON(value?: LemonsqueezyApiResponseJSONAPI | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'version': value.version,
    };
}

