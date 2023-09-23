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
                },
                "video_title": {
                    "type": "string",
                    "example": "The Truth About Bun"
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
                "video_id": {
                    "type": "string"
                },
                "video_title": {
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
