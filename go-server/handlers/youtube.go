package handlers

import (
	"fmt"
	"gptube/config"
	"gptube/database"
	"gptube/models"
	"gptube/services"
	"gptube/utils"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"google.golang.org/api/youtube/v3"
)

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
		err := fmt.Errorf("please provide a videoID")
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

	if body.VideoID == "" {
		err := fmt.Errorf("you must provide the youtube video id")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	if body.AccountEmail == "" {
		err := fmt.Errorf("you must provide your account email")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoData, err := services.GetVideoData(body.VideoID)
	if err != nil {
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	// This means we haven´t received email hence is a short video so we do
	// all the logic here and send the response instantly to the client
	if body.Email == "" {
		results, err := services.Analyze(body, "free")
		if err != nil {
			err = fmt.Errorf("video analysis for %q failed 😿, try again later or contact us",
				videoData.Items[0].Snippet.Title)
			return utils.HandleError(err, http.StatusInternalServerError, c)
		}

		if results.BertResults.SuccessCount == 0 || results.RobertaResults.SuccessCount == 0 {
			noContentError := fmt.Errorf("couldn't analyze any comment")
			return utils.HandleError(noContentError, http.StatusNoContent, c)
		}

		// sending the results to the user
		successResp := models.YoutubeAnalyzerRespBody{
			VideoID:      body.VideoID,
			AccountEmail: body.AccountEmail,
			Results:      results,
			ResultsID:    body.VideoID,
			Snippet:      videoData.Items[0].Snippet,
		}
		// Here we must save the results to FireStore //
		// err = database.AddYoutubeResult(&successResp)
		err = nil
		if err != nil {
			// Sending the e-mail error to the user
			log.Printf("error saving data to firebase: %v\n", err.Error())
		} else {
			// Saving the resultID into the result2Store var to send the email
			successResp.ResultsID = body.VideoID
		}
		////////////////////////////////////////////////
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Bert: %d\n", results.BertResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Bert: %d\n", results.BertResults.ErrorsCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments success Roberta: %d\n", results.RobertaResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments failed Roberta: %d\n", results.RobertaResults.ErrorsCount)
		c.JSON(successResp)
		return c.SendStatus(http.StatusOK)
	}

	// This means we have received email hence this video is large so we do all
	// the logic in the server and send the result back to the email of the user
	// Adding lead email to temporal database
	go func(videoData *youtube.VideoListResponse) {
		results, err := services.Analyze(body, "free")
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

		if results.BertResults.SuccessCount == 0 || results.RobertaResults.SuccessCount == 0 {
			// Sending the e-mail error to the user in case no comments were analyzed
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 🙀",
				videoData.Items[0].Snippet.Title,
			)
			log.Printf("[YoutubeAnalysisHandler] %v\n", err.Error())
			go services.SendYoutubeErrorEmailTemplate(subjectEmail, []string{body.Email})
			return
		}

		// Here we must save the results to FireStore //
		results2Store := models.YoutubeAnalyzerRespBody{
			VideoID:      body.VideoID,
			AccountEmail: body.AccountEmail,
			Results:      results,
			ResultsID:    body.VideoID,
			Snippet:      videoData.Items[0].Snippet,
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
		// Saving the resultID into the result2Store var to send the email
		results2Store.ResultsID = body.VideoID
		////////////////////////////////////////////////

		// Sending the e-mail to the user
		subjectEmail := fmt.Sprintf(
			"GPTube analysis for YT video %q ready 😺!",
			videoData.Items[0].Snippet.Title,
		)
		go services.SendYoutubeSuccessEmailTemplate(
			results2Store, subjectEmail, []string{body.Email})
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments analyzed Bert: %d\n", results.BertResults.SuccessCount)
		fmt.Printf("[YoutubeAnalysisHandler] Number of comments analyzed Roberta: %d\n", results.RobertaResults.SuccessCount)
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
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if body.VideoID == "" {
		err := fmt.Errorf("please provide a videoID")
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	videoData, err := services.GetVideoData(body.VideoID)
	if err != nil {
		return utils.HandleError(err, http.StatusBadRequest, c)
	}

	// This means we haven´t received email hence is a short video so we do
	// all the logic here and send the response instantly to the client
	results, err := services.AnalyzeForLanding(body)
	if err != nil {
		return utils.HandleError(err, http.StatusInternalServerError, c)
	}

	if results.BertResults.SuccessCount == 0 {
		noContentError := fmt.Errorf("couldn't analyze any comment")
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
