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
 * @interface YoutubeVideoStatistics
 */
export interface YoutubeVideoStatistics {
    /**
     * CommentCount: The number of comments for the video.
     * @type {string}
     * @memberof YoutubeVideoStatistics
     */
    commentCount?: string;
    /**
     * DislikeCount: The number of users who have indicated that they
     * disliked the video by giving it a negative rating.
     * @type {string}
     * @memberof YoutubeVideoStatistics
     */
    dislikeCount?: string;
    /**
     * FavoriteCount: The number of users who currently have the video
     * marked as a favorite video.
     * @type {string}
     * @memberof YoutubeVideoStatistics
     */
    favoriteCount?: string;
    /**
     * LikeCount: The number of users who have indicated that they liked the
     * video by giving it a positive rating.
     * @type {string}
     * @memberof YoutubeVideoStatistics
     */
    likeCount?: string;
    /**
     * ViewCount: The number of times the video has been viewed.
     * @type {string}
     * @memberof YoutubeVideoStatistics
     */
    viewCount?: string;
}

/**
 * Check if a given object implements the YoutubeVideoStatistics interface.
 */
export function instanceOfYoutubeVideoStatistics(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function YoutubeVideoStatisticsFromJSON(json: any): YoutubeVideoStatistics {
    return YoutubeVideoStatisticsFromJSONTyped(json, false);
}

export function YoutubeVideoStatisticsFromJSONTyped(json: any, ignoreDiscriminator: boolean): YoutubeVideoStatistics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'commentCount': !exists(json, 'commentCount') ? undefined : json['commentCount'],
        'dislikeCount': !exists(json, 'dislikeCount') ? undefined : json['dislikeCount'],
        'favoriteCount': !exists(json, 'favoriteCount') ? undefined : json['favoriteCount'],
        'likeCount': !exists(json, 'likeCount') ? undefined : json['likeCount'],
        'viewCount': !exists(json, 'viewCount') ? undefined : json['viewCount'],
    };
}

export function YoutubeVideoStatisticsToJSON(value?: YoutubeVideoStatistics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'commentCount': value.commentCount,
        'dislikeCount': value.dislikeCount,
        'favoriteCount': value.favoriteCount,
        'likeCount': value.likeCount,
        'viewCount': value.viewCount,
    };
}

