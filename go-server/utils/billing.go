package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func ValidateSignature(secret, signature string, body []byte) bool {
	h := hmac.New(sha256.New, []byte(secret))

	h.Write(body)
	digest := h.Sum(nil)

	fmt.Println("signature: ", signature)
	fmt.Println("digest: ", hex.EncodeToString(digest))

	return hex.EncodeToString(digest) == signature
}
