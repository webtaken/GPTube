package models

import "time"

type SubscriptionPlanSlug int

const (
	FREE SubscriptionPlanSlug = iota
	HOBBY
	POPULAR
)

type SubscriptionPlan struct {
	Id           string               `json:"id" firestore:"id"` // PK
	ProductId    string               `json:"product_id" firestore:"product_id"`
	Variants     []string             `json:"variants" firestore:"variants"`
	Slug         SubscriptionPlanSlug `json:"slug" firestore:"slug"`
	Name         string               `json:"name" firestore:"name"`
	Description  string               `json:"description" firestore:"description"`
	PriceMonthly float32              `json:"price_monthly" firestore:"price_monthly"`
	PriceYearly  float32              `json:"price_yearly" firestore:"price_yearly"`
	HrefMonthly  string               `json:"href_monthly" firestore:"href_monthly"`
	HrefYearly   string               `json:"href_yearly" firestore:"href_yearly"`
	Features     []string             `json:"features" firestore:"features"`
	MostPopular  bool                 `json:"most_popular" firestore:"most_popular"`
	IsActive     bool                 `json:"is_active" firestore:"is_active"`
	CreatedAt    time.Time            `json:"created_at" firestore:"created_at"`
	UpdatedAt    time.Time            `json:"updated_at" firestore:"updated_at"`
}

// This model schema will be a sub-collection of USERS_COLLECTION
type Subscription struct {
	SubscriptionId       string               `json:"subscription_id" firestore:"subscription_id"`               // PK
	SubscriptionPlanSlug SubscriptionPlanSlug `json:"subscription_plan_slug" firestore:"subscription_plan_slug"` // FK SubscriptionPlan
	UserEmail            string               `json:"user_email" firestore:"user_email"`
	OrderId              int                  `json:"order_id" firestore:"order_id"`
	ProductId            int                  `json:"product_id" firestore:"product_id"`
	VariantId            int                  `json:"variant_id" firestore:"variant_id"`
	CustomerId           int                  `json:"customer_id" firestore:"customer_id"`
	ProductName          string               `json:"product_name" firestore:"product_name"`
	Status               string               `json:"status" firestore:"status"`
	StatusFormatted      string               `json:"status_formatted" firestore:"status_formatted"`
	TrialEndsAt          *time.Time           `json:"trial_ends_at" firestore:"trial_ends_at"`
	RenewsAt             time.Time            `json:"renews_at" firestore:"renews_at"`
	EndsAt               *time.Time           `json:"ends_at" firestore:"ends_at"`
	CreatedAt            time.Time            `json:"created_at" firestore:"created_at"`
	UpdatedAt            time.Time            `json:"updated_at" firestore:"updated_at"`
	CardBrand            string               `json:"card_brand" firestore:"card_brand"`
	CardLastFour         string               `json:"card_last_four" firestore:"card_last_four"`
	UpdatePaymentMethod  string               `json:"update_payment_method" firestore:"update_payment_method"`
}
