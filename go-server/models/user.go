package models

import "time"

// Principal collection for every user
type User struct {
	Id            string    `json:"id" firestore:"id"`
	Name          string    `json:"name" firestore:"name"`
	Username      string    `json:"username" firestore:"username"`
	Email         string    `json:"email" firestore:"email"`
	ImageURL      string    `json:"image_url" firestore:"image_url"`
	EmailVerified time.Time `json:"email_verified" firestore:"email_verified"`
	IsActive      bool      `json:"is_active" firestore:"is_active"`
	CreatedAt     time.Time `json:"created_at" firestore:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" firestore:"updated_at"`
}
