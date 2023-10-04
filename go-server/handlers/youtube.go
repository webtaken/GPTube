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

	"github.com/gofiber/fiber/v2"
)

func YoutubePreAnalysisHandler(c *fiber.Ctx) error {
	var body models.YoutubePreAnalyzerReqBody

	if err := c.BodyParser(&body); err != nil {
		c.JSON(fiber.Map{
			"error": fmt.Errorf("%v", err).Error(),
		})
		return c.SendStatus(http.StatusInternalServerError)
	}

	if body.VideoID == "" {
		c.JSON(fiber.Map{
			"error": "please provide a videoID",
		})
		return c.SendStatus(http.StatusBadRequest)
	}

	videoData, err := services.CanProcessVideo(&body)
	if err != nil {
		c.JSON(fiber.Map{
			"error": fmt.Errorf("%v", err).Error(),
		})
		return c.SendStatus(http.StatusBadRequest)
	}

	maxNumCommentsRequireEmail, _ := strconv.Atoi(config.Config("YOUTUBE_MAX_COMMENTS_REQUIRE_EMAIL"))
	successResp := models.YoutubePreAnalyzerRespBody{
		VideoID:       body.VideoID,
		Snippet:       videoData.Items[0].Snippet,
		RequiresEmail: videoData.Items[0].Statistics.CommentCount > uint64(maxNumCommentsRequireEmail),
		NumOfComments: int(videoData.Items[0].Statistics.CommentCount),
	}
	c.JSON(successResp)
	return c.SendStatus(http.StatusOK)
}

func YoutubeAnalysisHandler(c *fiber.Ctx) error {
	var body models.YoutubeAnalyzerReqBody

	if err := c.BodyParser(&body); err != nil {
		c.JSON(fiber.Map{
			"error": fmt.Errorf("%v", err).Error(),
		})
		return c.SendStatus(http.StatusInternalServerError)
	}

	if body.OwnerEmail == "" {
		c.JSON(fiber.Map{
			"error": "You must provide the owner email",
		})
		return c.SendStatus(http.StatusBadRequest)
	}

	// This means we haven´t received email hence is a short video so we do
	// all the logic here and send the response instantly to the client
	if body.Email == "" {
		results, err := services.Analyze(body)
		if err != nil {
			c.JSON(fiber.Map{
				"error": fmt.Sprintf(
					"GPTube analysis for YT video %q failed 😔, try again later or contact us.",
					body.VideoTitle,
				),
			})
			return c.SendStatus(http.StatusInternalServerError)
		}

		// sending the results to the user
		successResp := models.YoutubeAnalyzerRespBody{
			VideoID:    body.VideoID,
			VideoTitle: body.VideoTitle,
			OwnerEmail: body.OwnerEmail,
			Results:    results,
		}
		// Here we must save the results to FireStore //
		err = database.AddYoutubeResult(&successResp)
		if err != nil {
			// Sending the e-mail error to the user
			log.Printf("error saving data to firebase: %v\n", err.Error())
		} else {
			// Saving the resultID into the result2Store var to send the email
			successResp.ResultsID = body.VideoID
		}
		////////////////////////////////////////////////
		fmt.Printf("Number of comments analyzed Bert: %d\n", results.BertResults.SuccessCount)
		fmt.Printf("Number of comments analyzed Roberta: %d\n", results.RobertaResults.SuccessCount)
		c.JSON(successResp)
		return c.SendStatus(http.StatusOK)
	}

	// This means we have received email hence this video is large so we do all
	// the logic in the server and send the result back to the email of the user
	// Adding lead email to temporal database
	go func() {
		results, err := services.Analyze(body)
		if err != nil {
			// Sending the e-mail error to the user
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 😔",
				body.VideoTitle,
			)
			log.Printf("%v\n", err.Error())
			go services.SendYoutubeErrorTemplate(subjectEmail, []string{body.Email})
			return
		}

		// Here we must save the results to FireStore //
		results2Store := models.YoutubeAnalyzerRespBody{
			VideoID:    body.VideoID,
			VideoTitle: body.VideoTitle,
			OwnerEmail: body.OwnerEmail,
			Results:    results,
		}
		err = database.AddYoutubeResult(&results2Store)
		if err != nil {
			// Sending the e-mail error to the user
			subjectEmail := fmt.Sprintf(
				"GPTube analysis for YT video %q failed 😔",
				body.VideoTitle,
			)
			log.Printf("%v\n", err.Error())
			go services.SendYoutubeErrorTemplate(subjectEmail, []string{body.Email})
			return
		}
		// Saving the resultID into the result2Store var to send the email
		results2Store.ResultsID = body.VideoID
		////////////////////////////////////////////////

		// Sending the e-mail to the user
		subjectEmail := fmt.Sprintf(
			"GPTube analysis for YT video %q ready 😺!",
			body.VideoTitle,
		)
		go services.SendYoutubeSuccessTemplate(
			results2Store, subjectEmail, []string{body.Email})
		fmt.Printf("Number of comments analyzed Bert: %d\n", results.BertResults.SuccessCount)
		fmt.Printf("Number of comments analyzed Roberta: %d\n", results.RobertaResults.SuccessCount)
	}()

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
		VideoID: body.VideoID,
		Snippet: videoData.Items[0].Snippet,
		Results: results,
	}

	fmt.Printf("Number of comments analyzed Bert: %d\n", results.BertResults.SuccessCount)
	c.JSON(successResp)

	return c.SendStatus(http.StatusOK)
}
