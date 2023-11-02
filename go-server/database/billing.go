package database

import (
	"encoding/json"
	"gptube/config"
	"gptube/models"

	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
)

const (
	SUBSCRIPTION_PLANS_COLLECTION = "SubscriptionPlans"
)

func GetSubscriptionPlansDevelopment() (map[models.SubscriptionPlanSlug]*models.SubscriptionPlan, error) {

	freePlan := models.SubscriptionPlan{}
	err := json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_TEST_FREE_PLAN_DATA")),
		&freePlan,
	)
	if err != nil {
		return nil, err
	}

	hobbyPlan := models.SubscriptionPlan{}
	err = json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_TEST_HOBBY_PLAN_DATA")),
		&hobbyPlan,
	)
	if err != nil {
		return nil, err
	}

	popularPlan := models.SubscriptionPlan{}
	err = json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_TEST_POPULAR_PLAN_DATA")),
		&popularPlan,
	)
	if err != nil {
		return nil, err
	}

	subscriptionPlans := make(map[models.SubscriptionPlanSlug]*models.SubscriptionPlan)
	subscriptionPlans[models.FREE] = &freePlan
	subscriptionPlans[models.HOBBY] = &hobbyPlan
	subscriptionPlans[models.POPULAR] = &popularPlan
	return subscriptionPlans, nil
}

func GetSubscriptionPlansProduction() (map[models.SubscriptionPlanSlug]*models.SubscriptionPlan, error) {

	freePlan := models.SubscriptionPlan{}
	err := json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_MAIN_FREE_PLAN_DATA")),
		&freePlan,
	)
	if err != nil {
		return nil, err
	}

	hobbyPlan := models.SubscriptionPlan{}
	err = json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_MAIN_HOBBY_PLAN_DATA")),
		&hobbyPlan,
	)
	if err != nil {
		return nil, err
	}

	popularPlan := models.SubscriptionPlan{}
	err = json.Unmarshal(
		[]byte(config.Config("LEMON_SQUEEZY_MAIN_POPULAR_PLAN_DATA")),
		&popularPlan,
	)
	if err != nil {
		return nil, err
	}

	subscriptionPlans := make(map[models.SubscriptionPlanSlug]*models.SubscriptionPlan)
	subscriptionPlans[models.FREE] = &freePlan
	subscriptionPlans[models.HOBBY] = &hobbyPlan
	subscriptionPlans[models.POPULAR] = &popularPlan
	return subscriptionPlans, nil
}

func RetrieveSubscriptions(email string) (*[]map[string]interface{}, error) {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return nil, err
	}

	client, err := app.Firestore(Ctx)
	if err != nil {
		return nil, err
	}

	defer client.Close()

	subscriptionsQuery := client.Collection("subscriptions").Where("user_email", "==", email)
	subscriptions := subscriptionsQuery.Documents(Ctx)
	results := make([]map[string]interface{}, 0)
	for {
		doc, err := subscriptions.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		results = append(results, doc.Data())
	}
	return &results, nil
}
