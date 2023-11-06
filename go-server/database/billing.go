package database

import (
	"encoding/json"
	"errors"
	"fmt"
	"gptube/config"
	"gptube/models"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

func GetSubscriptionPlans() (map[models.SubscriptionPlanSlug]*models.SubscriptionPlan, error) {
	envMode := config.Config("ENV_MODE")
	if envMode == config.ENV_DEVELOPMENT {
		return getSubscriptionPlansDevelopment()
	} else if envMode == config.ENV_PRODUCTION {
		return getSubscriptionPlansProduction()
	}
	return nil, errors.New("no valid env mode in env vars")
}

func getSubscriptionPlansDevelopment() (map[models.SubscriptionPlanSlug]*models.SubscriptionPlan, error) {
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

func getSubscriptionPlansProduction() (map[models.SubscriptionPlanSlug]*models.SubscriptionPlan, error) {
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

func GetAllSubscriptions(userId string) ([]models.Subscription, error) {
	client, err := GetClient()
	if err != nil {
		return nil, err
	}

	defer client.Close()
	userDoc := client.Collection(USERS_COLLECTION).Doc(userId)
	iter := userDoc.Collection(SUBSCRIPTIONS_COLLECTION).
		OrderBy("subscription_id", firestore.Desc).Documents(Ctx)
	results := make([]models.Subscription, 0)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		subscription := models.Subscription{}
		err = doc.DataTo(&subscription)
		if err != nil {
			fmt.Println(err.Error())
			return nil, err
		}
		results = append(results, subscription)
	}
	return results, nil
}

func CreateSubscription(userId string, subscription *models.Subscription) error {
	client, err := GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	userDoc := client.Collection(USERS_COLLECTION).Doc(userId)
	subscriptionDoc := userDoc.Collection(SUBSCRIPTIONS_COLLECTION).Doc(subscription.SubscriptionId)
	_, err = subscriptionDoc.Set(Ctx, subscription)
	if err != nil {
		return fmt.Errorf("error while creating subscription: %s", err)
	}
	return nil
}

func UpdateSubscription(userId string, subscription *models.Subscription) error {
	client, err := GetClient()
	if err != nil {
		return err
	}
	defer client.Close()

	userDoc := client.Collection(USERS_COLLECTION).Doc(userId)
	subscriptionDoc := userDoc.Collection(SUBSCRIPTIONS_COLLECTION).Doc(subscription.SubscriptionId)
	_, err = subscriptionDoc.Set(Ctx, subscription)
	if err != nil {
		return fmt.Errorf("error while creating subscription: %s", err)
	}
	return nil
}
