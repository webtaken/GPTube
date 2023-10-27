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
 * @interface FiberError
 */
export interface FiberError {
    /**
     * 
     * @type {number}
     * @memberof FiberError
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof FiberError
     */
    message?: string;
}

/**
 * Check if a given object implements the FiberError interface.
 */
export function instanceOfFiberError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FiberErrorFromJSON(json: any): FiberError {
    return FiberErrorFromJSONTyped(json, false);
}

export function FiberErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): FiberError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code': !exists(json, 'code') ? undefined : json['code'],
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function FiberErrorToJSON(value?: FiberError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code': value.code,
        'message': value.message,
    };
}

