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
import type { YoutubeVideoSnippet } from './YoutubeVideoSnippet';
import {
    YoutubeVideoSnippetFromJSON,
    YoutubeVideoSnippetFromJSONTyped,
    YoutubeVideoSnippetToJSON,
} from './YoutubeVideoSnippet';
import type { YoutubeVideoStatistics } from './YoutubeVideoStatistics';
import {
    YoutubeVideoStatisticsFromJSON,
    YoutubeVideoStatisticsFromJSONTyped,
    YoutubeVideoStatisticsToJSON,
} from './YoutubeVideoStatistics';

/**
 * 
 * @export
 * @interface ModelsYoutubePreAnalyzerRespBody
 */
export interface ModelsYoutubePreAnalyzerRespBody {
    /**
     * 
     * @type {boolean}
     * @memberof ModelsYoutubePreAnalyzerRespBody
     */
    requiresEmail?: boolean;
    /**
     * 
     * @type {YoutubeVideoSnippet}
     * @memberof ModelsYoutubePreAnalyzerRespBody
     */
    snippet?: YoutubeVideoSnippet;
    /**
     * 
     * @type {YoutubeVideoStatistics}
     * @memberof ModelsYoutubePreAnalyzerRespBody
     */
    statistics?: YoutubeVideoStatistics;
    /**
     * 
     * @type {string}
     * @memberof ModelsYoutubePreAnalyzerRespBody
     */
    videoId?: string;
}

/**
 * Check if a given object implements the ModelsYoutubePreAnalyzerRespBody interface.
 */
export function instanceOfModelsYoutubePreAnalyzerRespBody(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelsYoutubePreAnalyzerRespBodyFromJSON(json: any): ModelsYoutubePreAnalyzerRespBody {
    return ModelsYoutubePreAnalyzerRespBodyFromJSONTyped(json, false);
}

export function ModelsYoutubePreAnalyzerRespBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsYoutubePreAnalyzerRespBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'requiresEmail': !exists(json, 'requires_email') ? undefined : json['requires_email'],
        'snippet': !exists(json, 'snippet') ? undefined : YoutubeVideoSnippetFromJSON(json['snippet']),
        'statistics': !exists(json, 'statistics') ? undefined : YoutubeVideoStatisticsFromJSON(json['statistics']),
        'videoId': !exists(json, 'video_id') ? undefined : json['video_id'],
    };
}

export function ModelsYoutubePreAnalyzerRespBodyToJSON(value?: ModelsYoutubePreAnalyzerRespBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'requires_email': value.requiresEmail,
        'snippet': YoutubeVideoSnippetToJSON(value.snippet),
        'statistics': YoutubeVideoStatisticsToJSON(value.statistics),
        'video_id': value.videoId,
    };
}

