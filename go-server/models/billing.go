package models

import "time"

type InvoicesRequest struct {
	SubscriptionId int `json:"subscriptionId"`
	Page           int `json:"page"`
	PageSize       int `json:"pageSize"`
}

type SubscriptionFirestore struct {
	UserEmail           string     `json:"user_email,omitempty" firestore:"user_email"`
	SubscriptionId      string     `json:"subscription_id,omitempty" firestore:"subscription_id"`
	OrderId             int        `json:"order_id,omitempty" firestore:"order_id"`
	ProductId           int        `json:"product_id,omitempty" firestore:"product_id"`
	VariantId           int        `json:"variant_id,omitempty" firestore:"variant_id"`
	CustomerId          int        `json:"customer_id,omitempty" firestore:"customer_id"`
	ProductName         string     `json:"product_name,omitempty" firestore:"product_name"`
	Status              string     `json:"status,omitempty" firestore:"status"`
	StatusFormatted     string     `json:"status_formatted,omitempty" firestore:"status_formatted"`
	TrialEndsAt         *time.Time `json:"trial_ends_at,omitempty" firestore:"trial_ends_at"`
	RenewsAt            time.Time  `json:"renews_at,omitempty" firestore:"renews_at"`
	EndsAt              *time.Time `json:"ends_at,omitempty" firestore:"ends_at"`
	CreatedAt           time.Time  `json:"created_at,omitempty" firestore:"created_at"`
	UpdatedAt           time.Time  `json:"updated_at,omitempty" firestore:"updated_at"`
	CardBrand           string     `json:"card_brand,omitempty" firestore:"card_brand"`
	CardLastFour        string     `json:"card_last_four,omitempty" firestore:"card_last_four"`
	UpdatePaymentMethod string     `json:"update_payment_method,omitempty" firestore:"update_payment_method"`
}
