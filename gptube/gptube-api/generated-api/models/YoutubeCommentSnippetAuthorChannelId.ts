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
 * @interface YoutubeCommentSnippetAuthorChannelId
 */
export interface YoutubeCommentSnippetAuthorChannelId {
    /**
     * 
     * @type {string}
     * @memberof YoutubeCommentSnippetAuthorChannelId
     */
    value?: string;
}

/**
 * Check if a given object implements the YoutubeCommentSnippetAuthorChannelId interface.
 */
export function instanceOfYoutubeCommentSnippetAuthorChannelId(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function YoutubeCommentSnippetAuthorChannelIdFromJSON(json: any): YoutubeCommentSnippetAuthorChannelId {
    return YoutubeCommentSnippetAuthorChannelIdFromJSONTyped(json, false);
}

export function YoutubeCommentSnippetAuthorChannelIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): YoutubeCommentSnippetAuthorChannelId {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function YoutubeCommentSnippetAuthorChannelIdToJSON(value?: YoutubeCommentSnippetAuthorChannelId | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}

