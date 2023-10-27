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
// @Param			account_email	query		string	true	"the account email"
// @Param			page			query		int		false	"the queried page"
// @Param			page_size		query		int		false	"page size for the results (default: 10, max: 50)"
// @Success		200				{object}	models.YoutubeVideosRespBody
// @Failure		400				{object}	utils.HandleError.errorResponse
// @Failure		500				{object}	utils.HandleError.errorResponse
// @Router			/api/youtube/videos [get]
func YoutubeListVideosHandler(c *fiber.Ctx) error {
	accountEmail := strings.TrimSpace(c.Query("account_email", ""))

	if accountEmail == "" {
		err := fmt.Errorf("please provide an account email")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	page, err := strconv.Atoi(c.Query("page", "1"))

	if err != nil {
		err := fmt.Errorf("please provide a valid page number")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	if page <= 0 {
		err := fmt.Errorf("page number can not be zero or negative")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	pageSize, err := strconv.Atoi(c.Query("page_size", "10"))

	if err != nil {
		err := fmt.Errorf("please provide a valid page size number")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}
	if pageSize <= 0 {
		err := fmt.Errorf("page size number can not be zero or negative")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	pageSize = int(math.Min(float64(pageSize), 50))

	successResp, err := database.GetYoutubeVideosPage(page, pageSize, accountEmail)

	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	c.JSON(successResp)
	return c.SendStatus(http.StatusOK)
}

// @Summary		Get the analysis results and data for a video
// @Description	An endpoint to retrieve the data for a video and its analysis results.
// @Produce		json
// @Param			account_email	query		string	true	"the account email"
// @Param			videoId			path		string	true	"the video id to be queried"
// @Success		200				{object}	models.YoutubeVideoAnalyzed
// @Failure		400				{object}	utils.HandleError.errorResponse
// @Failure		500				{object}	utils.HandleError.errorResponse
// @Router			/api/youtube/videos/{videoId} [get]
func YoutubeGetVideoHandler(c *fiber.Ctx) error {
	accountEmail := strings.TrimSpace(c.Query("account_email", ""))

	if accountEmail == "" {
		err := fmt.Errorf("please provide an account email")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoId := c.Params("videoId")
	if videoId == "" {
		return utils.HandleError(errors.New("please provide a videoId"),
			http.StatusBadRequest, c)
	}

	fmt.Printf("%v\n", videoId)

	return c.SendStatus(http.StatusOK)
}

// @Summary		Basic information about the youtube video
// @Description	An endpoint used to retrieve basic information about the youtube video such as title, description, etc.
// @Produce		json
// @Param			video	body		models.YoutubePreAnalyzerReqBody	true	"Youtube video id"
// @Success		200		{object}	models.YoutubePreAnalyzerRespBody
// @Failure		400		{object}	utils.HandleError.errorResponse
// @Failure		500		{object}	utils.HandleError.errorResponse
// @Router			/api/youtube/pre-analysis [post]
func YoutubePreAnalysisHandler(c *fiber.Ctx) error {
	var body models.YoutubePreAnalyzerReqBody

	if err := c.BodyParser(&body); err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if body.VideoID == "" {
		err := fmt.Errorf("please provide a video id")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoData, err := services.CanProcessVideo(&body)
	if err != nil {
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	maxNumCommentsRequireEmail, _ := strconv.Atoi(config.Config("YOUTUBE_MAX_COMMENTS_REQUIRE_EMAIL"))
	successResp := models.YoutubePreAnalyzerRespBody{
		VideoID:       body.VideoID,
		Snippet:       videoData.Items[0].Snippet,
		Statistics:    videoData.Items[0].Statistics,
		RequiresEmail: videoData.Items[0].Statistics.CommentCount > uint64(maxNumCommentsRequireEmail),
	}
	c.JSON(successResp)
	return c.SendStatus(http.StatusOK)
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

	if body.AccountEmail == "" {
		err := fmt.Errorf("you must provide your account email")
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
			AccountEmail: body.AccountEmail,
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
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n",
			analysis.Results.BertResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n",
			analysis.Results.BertResults.ErrorsCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n",
			analysis.Results.RobertaResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n",
			analysis.Results.RobertaResults.ErrorsCount)
		c.JSON(successResp)
		return c.SendStatus(http.StatusOK)
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
			AccountEmail: body.AccountEmail,
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

	return c.SendStatus(http.StatusOK)
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

	fmt.Printf("[YoutubeAnalysisLandingHandler] Number of comments success Bert: %d\n", results.BertResults.SuccessCount)
	fmt.Printf("[YoutubeAnalysisLandingHandler] Number of comments failed Bert: %d\n", results.BertResults.ErrorsCount)
	c.JSON(successResp)

	return c.SendStatus(http.StatusOK)
}
