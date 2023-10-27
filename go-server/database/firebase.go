package database

import (
	"errors"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
)

func CountCollection(collection *firestore.CollectionRef) (int, error) {
	aggQuery := collection.NewAggregationQuery().WithCount("all")
	res, err := aggQuery.Get(Ctx)
	if err != nil {
		return 0, err
	}
	count, ok := res["all"]
	if !ok {
		return 0, errors.New("error while getting the count of the model")
	}
	countValue := count.(*firestorepb.Value)
	return int(countValue.GetIntegerValue()), nil
}

func GetClient() (*firestore.Client, error) {
	app, err := firebase.NewApp(Ctx, nil, Sa)
	if err != nil {
		return nil, err
	}
	client, err := app.Firestore(Ctx)
	if err != nil {
		return nil, err
	}
	return client, nil
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
