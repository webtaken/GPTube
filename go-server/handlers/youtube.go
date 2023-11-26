package handlers

import (
	"errors"
	"fmt"
	"gptube/config"
	"gptube/database"
	"gptube/models"
	"gptube/services"
	"gptube/utils"
	"log"
	"math"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/youtube/v3"
)

// @Summary		Get all the videos related to a user in paginated mode
// @Description	An endpoint to retrieve all the youtube videos that a user has analyzed, results are sorted by last_update field.
// @Produce		json
// @Param			user_id		query		string	true	"the user id"
// @Param			page		query		int		false	"the queried page"
// @Param			page_size	query		int		false	"page size for the results (default: 10, max: 50)"
// @Success		200			{object}	models.YoutubeVideosRespBody
// @Failure		400			{object}	fiber.Error
// @Failure		500			{object}	fiber.Error
// @Router			/api/youtube/videos [get]
func YoutubeListVideosHandler(c *fiber.Ctx) error {
	userId := strings.TrimSpace(c.Query("user_id", ""))

	if userId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide the 'user_id' param")
	}

	page, err := strconv.Atoi(c.Query("page", fmt.Sprintf("%d", config.DEFAULT_PAGE_NUM)))

	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid (number) 'page' param")
	}
	if page < config.MIN_PAGE_NUM {
		return fiber.NewError(http.StatusBadRequest, "'page' param can not be zero or negative")
	}

	pageSize, err := strconv.Atoi(c.Query("page_size", fmt.Sprintf("%d", config.DEFAULT_PAGE_SIZE)))

	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid page size number")
	}
	if pageSize < config.MIN_PAGE_SIZE {
		return fiber.NewError(http.StatusBadRequest, "page size number can not be zero or negative")
	}

	// Ensuring the max page size
	pageSize = int(math.Min(float64(pageSize), config.MAX_PAGE_SIZE))

	successResp, err := database.GetYoutubeVideosPage(page, pageSize, userId)

	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, "error while retrieving the videos")
	}

	return c.Status(http.StatusOK).JSON(successResp)
}

// @Summary		Get the analysis results and data for a video
// @Description	An endpoint to retrieve the data for a video and its analysis results.
// @Produce		json
// @Param			videoId	path		string	true	"the video id to be queried"
// @Param			user_id	query		string	true	"the user id"
// @Success		200		{object}	models.YoutubeVideoAnalyzed
// @Failure		400		{object}	fiber.Error
// @Failure		500		{object}	fiber.Error
// @Router			/api/youtube/videos/{videoId} [get]
func YoutubeGetVideoHandler(c *fiber.Ctx) error {
	userId := strings.TrimSpace(c.Query("user_id", ""))
	if userId == "" {
		return fiber.NewError(http.StatusBadRequest, "empty user_id query param")
	}

	videoId := c.Params("videoId")
	if videoId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a videoId route param")
	}

	response, err := database.GetYoutubeAnalysisResult(userId, videoId)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError,
			"error while retrieving the video analysis")
	}

	return c.Status(http.StatusOK).JSON(response)
}

// @Summary		Get the analysis results and data for a video
// @Description	An endpoint to retrieve the data for a video and its analysis results.
// @Produce		json
// @Param			videoId		path		string	true	"the video id to be queried"
// @Param			user_id		query		string	true	"the user_id"
// @Param			page		query		int		false	"the queried page"
// @Param			page_size	query		int		false	"page size for the results (default: 10, max: 50)"
// @Success		200			{object}	models.YoutubeVideoNegativeCommentsRespBody
// @Failure		400			{object}	fiber.Error
// @Failure		500			{object}	fiber.Error
// @Router			/api/youtube/videos/{videoId}/negative-comments [get]
func YoutubeGetNegativeCommentsHandler(c *fiber.Ctx) error {
	userId := strings.TrimSpace(c.Query("user_id", ""))
	if userId == "" {
		return fiber.NewError(http.StatusBadRequest, "empty user_id query param")
	}

	videoId := c.Params("videoId")
	if videoId == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a videoId")
	}

	page, err := strconv.Atoi(c.Query("page", fmt.Sprintf("%d", config.DEFAULT_PAGE_NUM)))

	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid page param")
	}
	if page < config.MIN_PAGE_NUM {
		return fiber.NewError(http.StatusBadRequest, "page can not be zero or negative")
	}

	pageSize, err := strconv.Atoi(c.Query("page_size", fmt.Sprintf("%d", config.DEFAULT_PAGE_SIZE)))

	if err != nil {
		return fiber.NewError(http.StatusBadRequest, "please provide a valid page_size param")
	}
	if pageSize < config.MIN_PAGE_SIZE {
		return fiber.NewError(http.StatusBadRequest, "page_size can not be zero or negative")
	}

	// Ensuring the max page size
	pageSize = int(math.Min(float64(pageSize), config.MAX_PAGE_SIZE))

	response, err := database.GetNegativeCommentsPage(page, pageSize, userId, videoId)
	if err != nil {
		return fiber.NewError(http.StatusInternalServerError, err.Error())
	}

	return c.Status(http.StatusOK).JSON(response)
}

// @Summary		Basic information about the youtube video
// @Description	An endpoint used to retrieve basic information about the youtube video such as title, description, etc.
// @Produce		json
// @Param			video	body		models.YoutubePreAnalyzerReqBody	true	"Youtube video id"
// @Success		200		{object}	models.YoutubePreAnalyzerRespBody
// @Failure		400		{object}	fiber.Error
// @Failure		500		{object}	fiber.Error
// @Router			/api/youtube/pre-analysis [post]
func YoutubePreAnalysisHandler(c *fiber.Ctx) error {
	var body models.YoutubePreAnalyzerReqBody

	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(http.StatusInternalServerError, "error with the request body")
	}

	if body.VideoID == "" {
		return fiber.NewError(http.StatusBadRequest, "please provide a video id")
	}

	videoData, err := services.CanProcessVideo(&body)
	if err != nil {
		return fiber.NewError(http.StatusBadRequest,
			"error while retrieving the video data please verify the video id")
	}

	maxNumCommentsRequireEmail, _ := strconv.Atoi(config.Config("YOUTUBE_MAX_COMMENTS_REQUIRE_EMAIL"))
	successResp := models.YoutubePreAnalyzerRespBody{
		VideoID:       body.VideoID,
		Snippet:       videoData.Items[0].Snippet,
		Statistics:    videoData.Items[0].Statistics,
		RequiresEmail: videoData.Items[0].Statistics.CommentCount > uint64(maxNumCommentsRequireEmail),
	}
	return c.Status(http.StatusOK).JSON(successResp)
}

// @Summary		Performs the analysis of the youtube video
// @Description	An endpoint used to analyze the content of a video using BERT and RoBERTa model and ChatGPT.
// @Produce		json
// @Param			video	body		models.YoutubeAnalyzerReqBody	true	"Youtube video analysis request body"
// @Success		200		{object}	models.YoutubeAnalyzerRespBody
// @Failure		204		{object}	utils.HandleError.errorResponse
// @Failure		400		{object}	utils.HandleError.errorResponse
// @Failure		500		{object}	utils.HandleError.errorResponse
// @Router			/api/youtube/analysis [post]
func YoutubeAnalysisHandler(c *fiber.Ctx) error {
	var body models.YoutubeAnalyzerReqBody

	if err := c.BodyParser(&body); err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if body.VideoId == "" {
		err := fmt.Errorf("you must provide the youtube video id")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	if body.UserId == "" {
		err := fmt.Errorf("you must provide your user id")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoData, err := services.GetVideoData(body.VideoId)
	if err != nil {
		if err.Error() == "video not found" {
			err = fmt.Errorf("video analysis failed 😿, video not found please provide a valid video id")
			return utils.HandleError(err, http.StatusBadRequest, c)
		}
		err = fmt.Errorf("video analysis for %q failed 😿, try again later or contact us",
			videoData.Items[0].Snippet.Title)
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	// This means we haven´t received email hence is a short video so we do
	// all the logic here and send the response instantly to the client
	if body.Email == "" {
		analysis, err := services.Analyze(body, "free")
		analysis.VideoId = body.VideoId
		analysis.Snippet = videoData.Items[0].Snippet

		if err != nil {
			err = fmt.Errorf("video analysis for %q failed 😿, try again later or contact us",
				videoData.Items[0].Snippet.Title)
			return utils.HandleError(err, http.StatusInternalServerError, c)
		}

		if analysis.Results.BertResults.SuccessCount == 0 && analysis.Results.RobertaResults.SuccessCount == 0 {
			err = fmt.Errorf("video analysis for %q failed 😿, couldn't analyze any comment",
				videoData.Items[0].Snippet.Title)
			log.Printf("[YoutubeAnalysisHandler] Couldn't analyze any comment for a model\n")
			log.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n",
				analysis.Results.BertResults.SuccessCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n",
				analysis.Results.BertResults.ErrorsCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n",
				analysis.Results.RobertaResults.SuccessCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n",
				analysis.Results.RobertaResults.ErrorsCount)
			return utils.HandleError(err, http.StatusNoContent, c)
		}

		// sending the results to the user
		successResp := models.YoutubeAnalyzerRespBody{
			VideoId:      body.VideoId,
			UserId:       body.UserId,
			VideoResults: analysis,
		}
		// Here we must save the results to FireStore
		err = database.AddYoutubeResult(&successResp)
		if err != nil {
			// Sending the e-mail error to the user
			log.Printf("[YoutubeAnalysisHandler] Error saving data to firebase: %v\n",
				err.Error())
			return utils.HandleError(errors.New("error while saving analysis results"),
				http.StatusInternalServerError, c)
		}

		////////////////////////////////////////////////
		log.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n",
			analysis.Results.BertResults.SuccessCount)
		log.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n",
			analysis.Results.BertResults.ErrorsCount)
		log.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n",
			analysis.Results.RobertaResults.SuccessCount)
		log.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n",
			analysis.Results.RobertaResults.ErrorsCount)
		return c.Status(http.StatusOK).JSON(successResp)
	}

	// This means we have received email hence this video is large so we do all
	// the logic in the server and send the result back to the email of the user
	// Adding lead email to temporal database
	go func(videoData *youtube.VideoListResponse) {
		analysis, err := services.Analyze(body, "free")
		analysis.VideoId = body.VideoId
		analysis.Snippet = videoData.Items[0].Snippet

		if err != nil {
			// Sending the e-mail error to the user
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 🙀",
				videoData.Items[0].Snippet.Title,
			)
			log.Printf("[YoutubeAnalysisHandler] error: %v\n", err.Error())
			go services.SendYoutubeErrorEmailTemplate(subjectEmail, []string{body.Email})
			return
		}

		if analysis.Results.BertResults.SuccessCount == 0 && analysis.Results.RobertaResults.SuccessCount == 0 {
			// Sending the e-mail error to the user in case no comments were analyzed
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 🙀",
				videoData.Items[0].Snippet.Title,
			)
			log.Printf("[YoutubeAnalysisHandler] Couldn't analyze any comment for a model\n")
			log.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n",
				analysis.Results.BertResults.SuccessCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n",
				analysis.Results.BertResults.ErrorsCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n",
				analysis.Results.RobertaResults.SuccessCount)
			log.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n",
				analysis.Results.RobertaResults.ErrorsCount)
			go services.SendYoutubeErrorEmailTemplate(subjectEmail, []string{body.Email})
			return
		}

		// Here we must save the results to FireStore //
		results2Store := models.YoutubeAnalyzerRespBody{
			VideoId:      body.VideoId,
			UserId:       body.UserId,
			VideoResults: analysis,
		}

		err = database.AddYoutubeResult(&results2Store)
		if err != nil {
			// Sending the e-mail error to the user
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 🙀",
				videoData.Items[0].Snippet.Title,
			)
			log.Printf("[YoutubeAnalysisHandler] %v\n", err.Error())
			go services.SendYoutubeErrorEmailTemplate(subjectEmail, []string{body.Email})
			return
		}

		// Sending the e-mail to the user
		subjectEmail := fmt.Sprintf(
			"GPTube analysis for YT video %q ready 😺!",
			videoData.Items[0].Snippet.Title,
		)
		go services.SendYoutubeSuccessEmailTemplate(
			results2Store, subjectEmail, []string{body.Email})

		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n",
			analysis.Results.BertResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n",
			analysis.Results.BertResults.ErrorsCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n",
			analysis.Results.RobertaResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n",
			analysis.Results.RobertaResults.ErrorsCount)
	}(videoData)

	return c.Status(http.StatusOK).JSON(fiber.Map{})
}

// @Summary		Simple analysis with BERT model for the landing page
// @Description	An endpoint used to do a simple analysis with the BERT model to show a result in the landing
// @Produce		json
// @Param			video	body		models.YoutubeAnalyzerLandingReqBody	true	"Youtube video id"
// @Success		200		{object}	models.YoutubeAnalyzerLandingRespBody
// @Failure		204		{object}	utils.HandleError.errorResponse
// @Failure		400		{object}	utils.HandleError.errorResponse
// @Failure		500		{object}	utils.HandleError.errorResponse
// @Router			/api/youtube/analysis-landing [post]
func YoutubeAnalysisLandingHandler(c *fiber.Ctx) error {
	var body models.YoutubeAnalyzerLandingReqBody

	if err := c.BodyParser(&body); err != nil {
		err := fmt.Errorf("video analysis failed 😿, incorrect body encoding")
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if body.VideoID == "" {
		err := fmt.Errorf("video analysis failed 😿, please provide a video id")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoData, err := services.GetVideoData(body.VideoID)
	if err != nil {
		if err.Error() == "video not found" {
			err = fmt.Errorf("video analysis failed 😿, video not found please provide a valid video id")
			return utils.HandleError(err, http.StatusBadRequest, c)
		}
		err = fmt.Errorf("video analysis for %q failed 😿, try again later or contact us",
			videoData.Items[0].Snippet.Title)
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	// This means we haven´t received email hence is a short video so we do
	// all the logic here and send the response instantly to the client
	results, err := services.AnalyzeForLanding(body)
	if err != nil {
		err = fmt.Errorf("video analysis for %q failed 😿, try again later or contact us",
			videoData.Items[0].Snippet.Title)
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if results.BertResults.SuccessCount == 0 {
		noContentError := fmt.Errorf("video analysis for %q failed 😿, we couldn't analyze any comment",
			videoData.Items[0].Snippet.Title)
		return utils.HandleError(noContentError, http.StatusNoContent, c)
	}

	// sending the results to the user
	successResp := models.YoutubeAnalyzerLandingRespBody{
		VideoID:   body.VideoID,
		Snippet:   videoData.Items[0].Snippet,
		Results:   results,
		CreatedAt: time.Now().UTC(),
	}

	log.Printf("[YoutubeAnalysisLandingHandler] Number of comments success Bert: %d\n", results.BertResults.SuccessCount)
	log.Printf("[YoutubeAnalysisLandingHandler] Number of comments failed Bert: %d\n", results.BertResults.ErrorsCount)

	return c.Status(http.StatusOK).JSON(successResp)
}
