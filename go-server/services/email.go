package services

import (
	"gptube/config"
	"net/smtp"
)

var emailAuth smtp.Auth

func init() {
	emailAuth = smtp.PlainAuth(
		"",
		config.Config("EMAIL_USER"),
		config.Config("EMAIL_PASSWORD"),
		"smtp.gmail.com",
	)
}

// Request struct
type Request struct {
	from    string
	to      []string
	subject string
	body    string
}

func NewRequest(to []string, subject, body string) *Request {
	return &Request{
		from:    config.Config("EMAIL_USER"),
		to:      to,
		subject: subject,
		body:    body,
	}
}

func (r *Request) SendEmail() (bool, error) {
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	subject := "Subject: " + r.subject + "\n"
	msg := []byte(subject + mime + "\n" + r.body)
	addr := "smtp.gmail.com:587"

	if err := smtp.SendMail(
		addr, emailAuth, config.Config("EMAIL_USER"), r.to, msg); err != nil {
		return false, err
	}
	return true, nil
}
