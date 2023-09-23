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
 * @interface UtilsHandleErrorErrorResponse
 */
export interface UtilsHandleErrorErrorResponse {
    /**
     * 
     * @type {string}
     * @memberof UtilsHandleErrorErrorResponse
     */
    error?: string;
}

/**
 * Check if a given object implements the UtilsHandleErrorErrorResponse interface.
 */
export function instanceOfUtilsHandleErrorErrorResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UtilsHandleErrorErrorResponseFromJSON(json: any): UtilsHandleErrorErrorResponse {
    return UtilsHandleErrorErrorResponseFromJSONTyped(json, false);
}

export function UtilsHandleErrorErrorResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UtilsHandleErrorErrorResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : json['error'],
    };
}

export function UtilsHandleErrorErrorResponseToJSON(value?: UtilsHandleErrorErrorResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': value.error,
    };
}

