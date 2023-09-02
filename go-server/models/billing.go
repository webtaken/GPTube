package models

type InvoicesRequest struct {
	SubscriptionId int `json:"subscriptionId"`
	Page           int `json:"page"`
	PageSize       int `json:"pageSize"`
}
