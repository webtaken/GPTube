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
import type { ModelsYoutubeAnalysisResults } from './ModelsYoutubeAnalysisResults';
import {
    ModelsYoutubeAnalysisResultsFromJSON,
    ModelsYoutubeAnalysisResultsFromJSONTyped,
    ModelsYoutubeAnalysisResultsToJSON,
} from './ModelsYoutubeAnalysisResults';
import type { YoutubeVideoSnippet } from './YoutubeVideoSnippet';
import {
    YoutubeVideoSnippetFromJSON,
    YoutubeVideoSnippetFromJSONTyped,
    YoutubeVideoSnippetToJSON,
} from './YoutubeVideoSnippet';

/**
 * 
 * @export
 * @interface ModelsYoutubeVideoAnalyzed
 */
export interface ModelsYoutubeVideoAnalyzed {
    /**
     * 
     * @type {string}
     * @memberof ModelsYoutubeVideoAnalyzed
     */
    createdAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ModelsYoutubeVideoAnalyzed
     */
    lastUpdate?: string;
    /**
     * 
     * @type {ModelsYoutubeAnalysisResults}
     * @memberof ModelsYoutubeVideoAnalyzed
     */
    results?: ModelsYoutubeAnalysisResults;
    /**
     * 
     * @type {YoutubeVideoSnippet}
     * @memberof ModelsYoutubeVideoAnalyzed
     */
    snippet?: YoutubeVideoSnippet;
    /**
     * 
     * @type {string}
     * @memberof ModelsYoutubeVideoAnalyzed
     */
    videoId?: string;
}

/**
 * Check if a given object implements the ModelsYoutubeVideoAnalyzed interface.
 */
export function instanceOfModelsYoutubeVideoAnalyzed(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelsYoutubeVideoAnalyzedFromJSON(json: any): ModelsYoutubeVideoAnalyzed {
    return ModelsYoutubeVideoAnalyzedFromJSONTyped(json, false);
}

export function ModelsYoutubeVideoAnalyzedFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsYoutubeVideoAnalyzed {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': !exists(json, 'created_at') ? undefined : json['created_at'],
        'lastUpdate': !exists(json, 'last_update') ? undefined : json['last_update'],
        'results': !exists(json, 'results') ? undefined : ModelsYoutubeAnalysisResultsFromJSON(json['results']),
        'snippet': !exists(json, 'snippet') ? undefined : YoutubeVideoSnippetFromJSON(json['snippet']),
        'videoId': !exists(json, 'video_id') ? undefined : json['video_id'],
    };
}

export function ModelsYoutubeVideoAnalyzedToJSON(value?: ModelsYoutubeVideoAnalyzed | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': value.createdAt,
        'last_update': value.lastUpdate,
        'results': ModelsYoutubeAnalysisResultsToJSON(value.results),
        'snippet': YoutubeVideoSnippetToJSON(value.snippet),
        'video_id': value.videoId,
    };
}

