// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "saul rojas coila",
            "email": "luckly083@gmail.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/api": {
            "get": {
                "description": "An endpoint used to test the api stability",
                "produces": [
                    "application/json"
                ],
                "summary": "Hello message from the api",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/handlers.helloApiMessage"
                        }
                    }
                }
            }
        },
        "/api/youtube/analysis": {
            "post": {
                "description": "An endpoint used to analyze the content of a video using BERT and RoBERTa model and ChatGPT.",
                "produces": [
                    "application/json"
                ],
                "summary": "Performs the analysis of the youtube video",
                "parameters": [
                    {
                        "description": "Youtube video analysis request body",
                        "name": "video",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.YoutubeAnalyzerReqBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.YoutubeAnalyzerRespBody"
                        }
                    },
                    "204": {
                        "description": "No Content",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    }
                }
            }
        },
        "/api/youtube/analysis-landing": {
            "post": {
                "description": "An endpoint used to do a simple analysis with the BERT model to show a result in the landing",
                "produces": [
                    "application/json"
                ],
                "summary": "Simple analysis with BERT model for the landing page",
                "parameters": [
                    {
                        "description": "Youtube video id",
                        "name": "video",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.YoutubeAnalyzerLandingReqBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.YoutubeAnalyzerLandingRespBody"
                        }
                    },
                    "204": {
                        "description": "No Content",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    }
                }
            }
        },
        "/api/youtube/pre-analysis": {
            "post": {
                "description": "An endpoint used to retrieve basic information about the youtube video such as title, description, etc.",
                "produces": [
                    "application/json"
                ],
                "summary": "Basic information about the youtube video",
                "parameters": [
                    {
                        "description": "Youtube video id",
                        "name": "video",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/models.YoutubePreAnalyzerReqBody"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/models.YoutubePreAnalyzerRespBody"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "schema": {
                            "$ref": "#/definitions/utils.HandleError.errorResponse"
                        }
                    }
                }
            }
        },
        "/billing": {
            "get": {
                "description": "An endpoint used to test the billing api stability",
                "produces": [
                    "application/json"
                ],
                "summary": "Hello message from the billing api",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/handlers.helloApiMessage"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "handlers.helloApiMessage": {
            "type": "object",
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "models.BertAIResults": {
            "type": "object",
            "properties": {
                "errors_count": {
                    "type": "integer"
                },
                "score_1": {
                    "type": "integer"
                },
                "score_2": {
                    "type": "integer"
                },
                "score_3": {
                    "type": "integer"
                },
                "score_4": {
                    "type": "integer"
                },
                "score_5": {
                    "type": "integer"
                },
                "success_count": {
                    "type": "integer"
                }
            }
        },
        "models.YoutubeAnalysisLandingResults": {
            "type": "object",
            "properties": {
                "bert_results": {
                    "$ref": "#/definitions/models.BertAIResults"
                },
                "video_id": {
                    "type": "string"
                },
                "video_title": {
                    "type": "string"
                }
            }
        },
        "models.YoutubeAnalyzerLandingReqBody": {
            "type": "object",
            "properties": {
                "video_id": {
                    "type": "string",
                    "example": "1xoy8Q5o8ws"
                }
            }
        },
        "models.YoutubeAnalyzerLandingRespBody": {
            "type": "object",
            "properties": {
                "created_at": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "results": {
                    "$ref": "#/definitions/models.YoutubeAnalysisLandingResults"
                },
                "snippet": {
                    "$ref": "#/definitions/youtube.VideoSnippet"
                },
                "video_id": {
                    "type": "string"
                }
            }
        },
        "models.YoutubeAnalyzerReqBody": {
            "type": "object",
            "properties": {
                "account_email": {
                    "description": "The email of the account sending the request",
                    "type": "string"
                },
                "email": {
                    "description": "The email that will be used to send the results",
                    "type": "string"
                },
                "video_id": {
                    "type": "string"
                }
            }
        },
        "models.YoutubeAnalyzerRespBody": {
            "type": "object",
            "properties": {
                "account_email": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "last_update": {
                    "type": "string"
                },
                "results_id": {
                    "description": "firestore results id",
                    "type": "string"
                },
                "video_id": {
                    "type": "string"
                }
            }
        },
        "models.YoutubePreAnalyzerReqBody": {
            "type": "object",
            "properties": {
                "video_id": {
                    "type": "string"
                }
            }
        },
        "models.YoutubePreAnalyzerRespBody": {
            "type": "object",
            "properties": {
                "requires_email": {
                    "type": "boolean"
                },
                "snippet": {
                    "$ref": "#/definitions/youtube.VideoSnippet"
                },
                "statistics": {
                    "$ref": "#/definitions/youtube.VideoStatistics"
                },
                "video_id": {
                    "type": "string"
                }
            }
        },
        "utils.HandleError.errorResponse": {
            "type": "object",
            "properties": {
                "error": {
                    "type": "string",
                    "example": "an error ocurred"
                }
            }
        },
        "youtube.Thumbnail": {
            "type": "object",
            "properties": {
                "height": {
                    "description": "Height: (Optional) Height of the thumbnail image.",
                    "type": "integer"
                },
                "url": {
                    "description": "Url: The thumbnail image's URL.",
                    "type": "string"
                },
                "width": {
                    "description": "Width: (Optional) Width of the thumbnail image.",
                    "type": "integer"
                }
            }
        },
        "youtube.ThumbnailDetails": {
            "type": "object",
            "properties": {
                "default": {
                    "description": "Default: The default image for this resource.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.Thumbnail"
                        }
                    ]
                },
                "high": {
                    "description": "High: The high quality image for this resource.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.Thumbnail"
                        }
                    ]
                },
                "maxres": {
                    "description": "Maxres: The maximum resolution quality image for this resource.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.Thumbnail"
                        }
                    ]
                },
                "medium": {
                    "description": "Medium: The medium quality image for this resource.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.Thumbnail"
                        }
                    ]
                },
                "standard": {
                    "description": "Standard: The standard quality image for this resource.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.Thumbnail"
                        }
                    ]
                }
            }
        },
        "youtube.VideoLocalization": {
            "type": "object",
            "properties": {
                "description": {
                    "description": "Description: Localized version of the video's description.",
                    "type": "string"
                },
                "title": {
                    "description": "Title: Localized version of the video's title.",
                    "type": "string"
                }
            }
        },
        "youtube.VideoSnippet": {
            "type": "object",
            "properties": {
                "categoryId": {
                    "description": "CategoryId: The YouTube video category associated with the video.",
                    "type": "string"
                },
                "channelId": {
                    "description": "ChannelId: The ID that YouTube uses to uniquely identify the channel\nthat the video was uploaded to.",
                    "type": "string"
                },
                "channelTitle": {
                    "description": "ChannelTitle: Channel title for the channel that the video belongs\nto.",
                    "type": "string"
                },
                "defaultAudioLanguage": {
                    "description": "DefaultAudioLanguage: The default_audio_language property specifies\nthe language spoken in the video's default audio track.",
                    "type": "string"
                },
                "defaultLanguage": {
                    "description": "DefaultLanguage: The language of the videos's default snippet.",
                    "type": "string"
                },
                "description": {
                    "description": "Description: The video's description. @mutable youtube.videos.insert\nyoutube.videos.update",
                    "type": "string"
                },
                "liveBroadcastContent": {
                    "description": "LiveBroadcastContent: Indicates if the video is an upcoming/active\nlive broadcast. Or it's \"none\" if the video is not an upcoming/active\nlive broadcast.\n\nPossible values:\n  \"none\"\n  \"upcoming\" - The live broadcast is upcoming.\n  \"live\" - The live broadcast is active.\n  \"completed\" - The live broadcast has been completed.",
                    "type": "string"
                },
                "localized": {
                    "description": "Localized: Localized snippet selected with the hl parameter. If no\nsuch localization exists, this field is populated with the default\nsnippet. (Read-only)",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.VideoLocalization"
                        }
                    ]
                },
                "publishedAt": {
                    "description": "PublishedAt: The date and time when the video was uploaded.",
                    "type": "string"
                },
                "tags": {
                    "description": "Tags: A list of keyword tags associated with the video. Tags may\ncontain spaces.",
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "thumbnails": {
                    "description": "Thumbnails: A map of thumbnail images associated with the video. For\neach object in the map, the key is the name of the thumbnail image,\nand the value is an object that contains other information about the\nthumbnail.",
                    "allOf": [
                        {
                            "$ref": "#/definitions/youtube.ThumbnailDetails"
                        }
                    ]
                },
                "title": {
                    "description": "Title: The video's title. @mutable youtube.videos.insert\nyoutube.videos.update",
                    "type": "string"
                }
            }
        },
        "youtube.VideoStatistics": {
            "type": "object",
            "properties": {
                "commentCount": {
                    "description": "CommentCount: The number of comments for the video.",
                    "type": "string",
                    "example": "0"
                },
                "dislikeCount": {
                    "description": "DislikeCount: The number of users who have indicated that they\ndisliked the video by giving it a negative rating.",
                    "type": "string",
                    "example": "0"
                },
                "favoriteCount": {
                    "description": "FavoriteCount: The number of users who currently have the video\nmarked as a favorite video.",
                    "type": "string",
                    "example": "0"
                },
                "likeCount": {
                    "description": "LikeCount: The number of users who have indicated that they liked the\nvideo by giving it a positive rating.",
                    "type": "string",
                    "example": "0"
                },
                "viewCount": {
                    "description": "ViewCount: The number of times the video has been viewed.",
                    "type": "string",
                    "example": "0"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:8000",
	BasePath:         "/api",
	Schemes:          []string{},
	Title:            "GPTube API swagger docs",
	Description:      "This is the API documentation of GPTube",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
