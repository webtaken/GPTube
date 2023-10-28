package database

import (
	"errors"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/firestore/apiv1/firestorepb"
	firebase "firebase.google.com/go"
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

func GetPageFromCollection(
	page int,
	pageSize int,
	collection *firestore.CollectionRef,
	queryPath string,
	order firestore.Direction,
) ([]*firestore.DocumentSnapshot, int, error) {
	var query firestore.Query
	if queryPath != "" {
		query = collection.OrderBy(queryPath, order).Limit(pageSize)
	} else {
		// sorts by default by doc id
		query = collection.Limit(pageSize)
	}

	if page > 1 && queryPath != "" {
		prevPageSnapshot, err := collection.OrderBy(queryPath, order).
			Limit(pageSize * (page - 1)).Documents(Ctx).GetAll()
		if err != nil {
			return nil, 0, errors.New("error while retrieving the page")
		}
		lastDoc := prevPageSnapshot[len(prevPageSnapshot)-1]
		query = collection.OrderBy(queryPath, order).
			StartAfter(lastDoc.Data()[queryPath]).Limit(pageSize)
	}

	if page > 1 && queryPath == "" {
		prevPageSnapshot, err := collection.Limit(pageSize * (page - 1)).
			Documents(Ctx).GetAll()
		if err != nil {
			return nil, 0, errors.New("error while retrieving the page")
		}
		lastDoc := prevPageSnapshot[len(prevPageSnapshot)-1]
		query = collection.StartAfter(lastDoc).Limit(pageSize)
	}
	pageSnapshot, err := query.Documents(Ctx).GetAll()
	if err != nil {
		return nil, 0, errors.New("error while retrieving the page")
	}

	// Did not received any page
	if len(pageSnapshot) == 0 {
		return nil, 0, errors.New("did not receive any result")
	}

	// Count all the docs in the collection
	count, err := CountCollection(collection)
	if err != nil {
		return nil, 0, errors.New("error while counting the documents")
	}

	return pageSnapshot, count, nil
}
