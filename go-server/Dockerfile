FROM golang:1.21.4-alpine as builder

# BUILD PROCESS
# Working directory
WORKDIR /gptube

# Copy go.mod and go.sum to the gptube folder
COPY go.mod ./ 
COPY go.sum ./ 

# Downloading dependencies
RUN go mod download

# Copy the source code into the image
COPY . ./

RUN go build -o /gptube_build

# CMD [ "/gptube_build" ]

# DEPLOY PROCESS
FROM alpine:latest

WORKDIR /home

ENV ENV_MODE=development
COPY --from=builder /gptube_build /gptube_build
COPY .env.example ./.env
COPY templates/ ./templates
# COPY gptube-firebase-sdk-prod.json ./


EXPOSE 8001

ENTRYPOINT [ "/gptube_build" ]