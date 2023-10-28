package database

import (
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
)

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
