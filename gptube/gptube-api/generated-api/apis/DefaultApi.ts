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


import * as runtime from '../runtime';
import type {
  FiberError,
  HandlersHelloApiMessage,
  LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount,
  LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscription,
  LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice,
  ModelsSubscription,
  ModelsSubscriptionPlan,
  ModelsYoutubeAnalyzerLandingReqBody,
  ModelsYoutubeAnalyzerLandingRespBody,
  ModelsYoutubeAnalyzerReqBody,
  ModelsYoutubeAnalyzerRespBody,
  ModelsYoutubePreAnalyzerReqBody,
  ModelsYoutubePreAnalyzerRespBody,
  ModelsYoutubeVideoAnalyzed,
  ModelsYoutubeVideoNegativeCommentsRespBody,
  ModelsYoutubeVideosRespBody,
  UtilsHandleErrorErrorResponse,
} from '../models/index';
import {
    FiberErrorFromJSON,
    FiberErrorToJSON,
    HandlersHelloApiMessageFromJSON,
    HandlersHelloApiMessageToJSON,
    LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSON,
    LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountToJSON,
    LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscriptionFromJSON,
    LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscriptionToJSON,
    LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON,
    LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceToJSON,
    ModelsSubscriptionFromJSON,
    ModelsSubscriptionToJSON,
    ModelsSubscriptionPlanFromJSON,
    ModelsSubscriptionPlanToJSON,
    ModelsYoutubeAnalyzerLandingReqBodyFromJSON,
    ModelsYoutubeAnalyzerLandingReqBodyToJSON,
    ModelsYoutubeAnalyzerLandingRespBodyFromJSON,
    ModelsYoutubeAnalyzerLandingRespBodyToJSON,
    ModelsYoutubeAnalyzerReqBodyFromJSON,
    ModelsYoutubeAnalyzerReqBodyToJSON,
    ModelsYoutubeAnalyzerRespBodyFromJSON,
    ModelsYoutubeAnalyzerRespBodyToJSON,
    ModelsYoutubePreAnalyzerReqBodyFromJSON,
    ModelsYoutubePreAnalyzerReqBodyToJSON,
    ModelsYoutubePreAnalyzerRespBodyFromJSON,
    ModelsYoutubePreAnalyzerRespBodyToJSON,
    ModelsYoutubeVideoAnalyzedFromJSON,
    ModelsYoutubeVideoAnalyzedToJSON,
    ModelsYoutubeVideoNegativeCommentsRespBodyFromJSON,
    ModelsYoutubeVideoNegativeCommentsRespBodyToJSON,
    ModelsYoutubeVideosRespBodyFromJSON,
    ModelsYoutubeVideosRespBodyToJSON,
    UtilsHandleErrorErrorResponseFromJSON,
    UtilsHandleErrorErrorResponseToJSON,
} from '../models/index';

export interface ApiYoutubeAnalysisLandingPostRequest {
    video: ModelsYoutubeAnalyzerLandingReqBody;
}

export interface ApiYoutubeAnalysisPostRequest {
    video: ModelsYoutubeAnalyzerReqBody;
}

export interface ApiYoutubePreAnalysisPostRequest {
    video: ModelsYoutubePreAnalyzerReqBody;
}

export interface ApiYoutubeVideosGetRequest {
    accountEmail: string;
    page?: number;
    pageSize?: number;
}

export interface ApiYoutubeVideosVideoIdGetRequest {
    videoId: string;
    accountEmail: string;
}

export interface ApiYoutubeVideosVideoIdNegativeCommentsGetRequest {
    videoId: string;
    accountEmail: string;
    page?: number;
    pageSize?: number;
}

export interface BillingCancelSubscriptionGetRequest {
    subscriptionId: string;
}

export interface BillingCheckoutGetRequest {
    variantId: string;
    userId: string;
}

export interface BillingInvoicesGetRequest {
    subscriptionId: string;
    page?: number;
    pageSize?: number;
}

export interface BillingResumeSubscriptionGetRequest {
    subscriptionId: string;
}

export interface BillingSubscriptionsGetRequest {
    userId: string;
}

export interface BillingUpdatePaymentMethodGetRequest {
    subscriptionId: string;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * An endpoint used to test the api stability
     * Hello message from the api
     */
    async apiGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HandlersHelloApiMessage>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HandlersHelloApiMessageFromJSON(jsonValue));
    }

    /**
     * An endpoint used to test the api stability
     * Hello message from the api
     */
    async apiGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HandlersHelloApiMessage> {
        const response = await this.apiGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * An endpoint used to do a simple analysis with the BERT model to show a result in the landing
     * Simple analysis with BERT model for the landing page
     */
    async apiYoutubeAnalysisLandingPostRaw(requestParameters: ApiYoutubeAnalysisLandingPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubeAnalyzerLandingRespBody>> {
        if (requestParameters.video === null || requestParameters.video === undefined) {
            throw new runtime.RequiredError('video','Required parameter requestParameters.video was null or undefined when calling apiYoutubeAnalysisLandingPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/youtube/analysis-landing`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelsYoutubeAnalyzerLandingReqBodyToJSON(requestParameters.video),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubeAnalyzerLandingRespBodyFromJSON(jsonValue));
    }

    /**
     * An endpoint used to do a simple analysis with the BERT model to show a result in the landing
     * Simple analysis with BERT model for the landing page
     */
    async apiYoutubeAnalysisLandingPost(requestParameters: ApiYoutubeAnalysisLandingPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubeAnalyzerLandingRespBody> {
        const response = await this.apiYoutubeAnalysisLandingPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint used to analyze the content of a video using BERT and RoBERTa model and ChatGPT.
     * Performs the analysis of the youtube video
     */
    async apiYoutubeAnalysisPostRaw(requestParameters: ApiYoutubeAnalysisPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubeAnalyzerRespBody>> {
        if (requestParameters.video === null || requestParameters.video === undefined) {
            throw new runtime.RequiredError('video','Required parameter requestParameters.video was null or undefined when calling apiYoutubeAnalysisPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/youtube/analysis`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelsYoutubeAnalyzerReqBodyToJSON(requestParameters.video),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubeAnalyzerRespBodyFromJSON(jsonValue));
    }

    /**
     * An endpoint used to analyze the content of a video using BERT and RoBERTa model and ChatGPT.
     * Performs the analysis of the youtube video
     */
    async apiYoutubeAnalysisPost(requestParameters: ApiYoutubeAnalysisPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubeAnalyzerRespBody> {
        const response = await this.apiYoutubeAnalysisPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint used to retrieve basic information about the youtube video such as title, description, etc.
     * Basic information about the youtube video
     */
    async apiYoutubePreAnalysisPostRaw(requestParameters: ApiYoutubePreAnalysisPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubePreAnalyzerRespBody>> {
        if (requestParameters.video === null || requestParameters.video === undefined) {
            throw new runtime.RequiredError('video','Required parameter requestParameters.video was null or undefined when calling apiYoutubePreAnalysisPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/youtube/pre-analysis`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ModelsYoutubePreAnalyzerReqBodyToJSON(requestParameters.video),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubePreAnalyzerRespBodyFromJSON(jsonValue));
    }

    /**
     * An endpoint used to retrieve basic information about the youtube video such as title, description, etc.
     * Basic information about the youtube video
     */
    async apiYoutubePreAnalysisPost(requestParameters: ApiYoutubePreAnalysisPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubePreAnalyzerRespBody> {
        const response = await this.apiYoutubePreAnalysisPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve all the youtube videos that a user has analyzed, results are sorted by last_update field.
     * Get all the videos related to a user in paginated mode
     */
    async apiYoutubeVideosGetRaw(requestParameters: ApiYoutubeVideosGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubeVideosRespBody>> {
        if (requestParameters.accountEmail === null || requestParameters.accountEmail === undefined) {
            throw new runtime.RequiredError('accountEmail','Required parameter requestParameters.accountEmail was null or undefined when calling apiYoutubeVideosGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.accountEmail !== undefined) {
            queryParameters['account_email'] = requestParameters.accountEmail;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['page_size'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/youtube/videos`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubeVideosRespBodyFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve all the youtube videos that a user has analyzed, results are sorted by last_update field.
     * Get all the videos related to a user in paginated mode
     */
    async apiYoutubeVideosGet(requestParameters: ApiYoutubeVideosGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubeVideosRespBody> {
        const response = await this.apiYoutubeVideosGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the data for a video and its analysis results.
     * Get the analysis results and data for a video
     */
    async apiYoutubeVideosVideoIdGetRaw(requestParameters: ApiYoutubeVideosVideoIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubeVideoAnalyzed>> {
        if (requestParameters.videoId === null || requestParameters.videoId === undefined) {
            throw new runtime.RequiredError('videoId','Required parameter requestParameters.videoId was null or undefined when calling apiYoutubeVideosVideoIdGet.');
        }

        if (requestParameters.accountEmail === null || requestParameters.accountEmail === undefined) {
            throw new runtime.RequiredError('accountEmail','Required parameter requestParameters.accountEmail was null or undefined when calling apiYoutubeVideosVideoIdGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.accountEmail !== undefined) {
            queryParameters['account_email'] = requestParameters.accountEmail;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/youtube/videos/{videoId}`.replace(`{${"videoId"}}`, encodeURIComponent(String(requestParameters.videoId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubeVideoAnalyzedFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve the data for a video and its analysis results.
     * Get the analysis results and data for a video
     */
    async apiYoutubeVideosVideoIdGet(requestParameters: ApiYoutubeVideosVideoIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubeVideoAnalyzed> {
        const response = await this.apiYoutubeVideosVideoIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the data for a video and its analysis results.
     * Get the analysis results and data for a video
     */
    async apiYoutubeVideosVideoIdNegativeCommentsGetRaw(requestParameters: ApiYoutubeVideosVideoIdNegativeCommentsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelsYoutubeVideoNegativeCommentsRespBody>> {
        if (requestParameters.videoId === null || requestParameters.videoId === undefined) {
            throw new runtime.RequiredError('videoId','Required parameter requestParameters.videoId was null or undefined when calling apiYoutubeVideosVideoIdNegativeCommentsGet.');
        }

        if (requestParameters.accountEmail === null || requestParameters.accountEmail === undefined) {
            throw new runtime.RequiredError('accountEmail','Required parameter requestParameters.accountEmail was null or undefined when calling apiYoutubeVideosVideoIdNegativeCommentsGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.accountEmail !== undefined) {
            queryParameters['account_email'] = requestParameters.accountEmail;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['page_size'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/youtube/videos/{videoId}/negative-comments`.replace(`{${"videoId"}}`, encodeURIComponent(String(requestParameters.videoId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelsYoutubeVideoNegativeCommentsRespBodyFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve the data for a video and its analysis results.
     * Get the analysis results and data for a video
     */
    async apiYoutubeVideosVideoIdNegativeCommentsGet(requestParameters: ApiYoutubeVideosVideoIdNegativeCommentsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelsYoutubeVideoNegativeCommentsRespBody> {
        const response = await this.apiYoutubeVideosVideoIdNegativeCommentsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to cancel a subscription
     * Cancel a subscription
     */
    async billingCancelSubscriptionGetRaw(requestParameters: BillingCancelSubscriptionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.subscriptionId === null || requestParameters.subscriptionId === undefined) {
            throw new runtime.RequiredError('subscriptionId','Required parameter requestParameters.subscriptionId was null or undefined when calling billingCancelSubscriptionGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscription_id'] = requestParameters.subscriptionId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/cancel-subscription`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * An endpoint to cancel a subscription
     * Cancel a subscription
     */
    async billingCancelSubscriptionGet(requestParameters: BillingCancelSubscriptionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.billingCancelSubscriptionGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the URL for a subscription plan sending the account email as well.
     * Get the checkout URL for a subscription plan
     */
    async billingCheckoutGetRaw(requestParameters: BillingCheckoutGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount>> {
        if (requestParameters.variantId === null || requestParameters.variantId === undefined) {
            throw new runtime.RequiredError('variantId','Required parameter requestParameters.variantId was null or undefined when calling billingCheckoutGet.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling billingCheckoutGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.variantId !== undefined) {
            queryParameters['variant_id'] = requestParameters.variantId;
        }

        if (requestParameters.userId !== undefined) {
            queryParameters['user_id'] = requestParameters.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/checkout`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscountFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve the URL for a subscription plan sending the account email as well.
     * Get the checkout URL for a subscription plan
     */
    async billingCheckoutGet(requestParameters: BillingCheckoutGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LemonsqueezyApiResponseLemonsqueezyCheckoutAttributesLemonsqueezyApiResponseRelationshipsDiscount> {
        const response = await this.billingCheckoutGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint used to test the billing api stability
     * Hello message from the billing api
     */
    async billingGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HandlersHelloApiMessage>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HandlersHelloApiMessageFromJSON(jsonValue));
    }

    /**
     * An endpoint used to test the billing api stability
     * Hello message from the billing api
     */
    async billingGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HandlersHelloApiMessage> {
        const response = await this.billingGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the invoices from a user\'s subscription
     * Get the latest Invoices from a subscription
     */
    async billingInvoicesGetRaw(requestParameters: BillingInvoicesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice>> {
        if (requestParameters.subscriptionId === null || requestParameters.subscriptionId === undefined) {
            throw new runtime.RequiredError('subscriptionId','Required parameter requestParameters.subscriptionId was null or undefined when calling billingInvoicesGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscription_id'] = requestParameters.subscriptionId;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['page_size'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/invoices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoiceFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve the invoices from a user\'s subscription
     * Get the latest Invoices from a subscription
     */
    async billingInvoicesGet(requestParameters: BillingInvoicesGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LemonsqueezyApiResponseListLemonsqueezySubscriptionInvoiceAttributesLemonsqueezyApiResponseRelationshipsSubscriptionInvoice> {
        const response = await this.billingInvoicesGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to resume a cancelled subscription
     * Resume a subscription
     */
    async billingResumeSubscriptionGetRaw(requestParameters: BillingResumeSubscriptionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.subscriptionId === null || requestParameters.subscriptionId === undefined) {
            throw new runtime.RequiredError('subscriptionId','Required parameter requestParameters.subscriptionId was null or undefined when calling billingResumeSubscriptionGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscription_id'] = requestParameters.subscriptionId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/resume-subscription`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<string>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * An endpoint to resume a cancelled subscription
     * Resume a subscription
     */
    async billingResumeSubscriptionGet(requestParameters: BillingResumeSubscriptionGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.billingResumeSubscriptionGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the subscription plan offered by GPTube with its price, features, etc.
     * Get the subscription plans offered by GPTube
     */
    async billingSubscriptionPlansGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelsSubscriptionPlan>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/subscription-plans`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelsSubscriptionPlanFromJSON));
    }

    /**
     * An endpoint to retrieve the subscription plan offered by GPTube with its price, features, etc.
     * Get the subscription plans offered by GPTube
     */
    async billingSubscriptionPlansGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelsSubscriptionPlan>> {
        const response = await this.billingSubscriptionPlansGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve all the subscriptions belonging to an account
     * Get the subscribed subscriptions of an account
     */
    async billingSubscriptionsGetRaw(requestParameters: BillingSubscriptionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ModelsSubscription>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling billingSubscriptionsGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.userId !== undefined) {
            queryParameters['user_id'] = requestParameters.userId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/subscriptions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ModelsSubscriptionFromJSON));
    }

    /**
     * An endpoint to retrieve all the subscriptions belonging to an account
     * Get the subscribed subscriptions of an account
     */
    async billingSubscriptionsGet(requestParameters: BillingSubscriptionsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ModelsSubscription>> {
        const response = await this.billingSubscriptionsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * An endpoint to retrieve the URL to update the payment method for a subscription
     * Get the update payment method URL for a subscription
     */
    async billingUpdatePaymentMethodGetRaw(requestParameters: BillingUpdatePaymentMethodGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscription>> {
        if (requestParameters.subscriptionId === null || requestParameters.subscriptionId === undefined) {
            throw new runtime.RequiredError('subscriptionId','Required parameter requestParameters.subscriptionId was null or undefined when calling billingUpdatePaymentMethodGet.');
        }

        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscription_id'] = requestParameters.subscriptionId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/billing/update-payment-method`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscriptionFromJSON(jsonValue));
    }

    /**
     * An endpoint to retrieve the URL to update the payment method for a subscription
     * Get the update payment method URL for a subscription
     */
    async billingUpdatePaymentMethodGet(requestParameters: BillingUpdatePaymentMethodGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<LemonsqueezyApiResponseLemonsqueezySubscriptionLemonsqueezyApiResponseRelationshipsSubscription> {
        const response = await this.billingUpdatePaymentMethodGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
