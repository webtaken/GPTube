# GPTube go-server documentation

The backend is built with Go and we use [Go Fiber](https://gofiber.io/) as our web framework to build the API and Firestore for the DB.

# Prerequisites

- [Install Go](https://go.dev/doc/install) programming language.
- [Install Air](https://github.com/cosmtrek/air#installation) for go apps reloading (optional).
- [Install docker with docker compose](https://docs.docker.com/engine/install/) for dockerization.

# Instructions to run the project

First download the project:

```
git clone https://github.com/webtaken/GPTube-go-server.git
```

Enter to the server folder and install dependencies:

```
cd gptube
go mod install
```

Fill in the environment variables, go to `.env.example` file, make a copy of it and rename this file as `.env.development.local`. Leave the variables with default values same as `.env.example`.  
First you need to get an email account to send emails, you can get Gmail [app passwords](https://support.google.com/mail/answer/185833?hl=en) and fill with your credentials the variables `EMAIL_USER` and `EMAIL_PASSWORD`.  
The variable `DB_KEYS` is the json body to use with firebase SDK.  
To get a firebase credentials file you can follow this steps: [get credentials file](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments) (go to the **"To generate a private key file for your service account:"** section), paste that json file as `gptube-firebase-sdk-dev.json` and equal its body (inline) into the env var `DB_KEYS`.  
You need to [get a Youtube API key](https://blog.hubspot.com/website/how-to-get-youtube-api-key) and paste it into the env var `YOUTUBE_API_KEY`.  
[Get a hugging face API token](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token) and paste it on `HUGGING_FACE_TOKEN`env var.
Finally [get an openAI api key](https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/) to use the chatGPT API and paste it on the `OPENAI_API_KEY` env var.

Run the project:

```
go run .
```

If you have installed [go air](https://github.com/cosmtrek/air), you can initialize air folder and run the project.

```
air init
air
```

Now open [http://localhost:8001/api](http://localhost:8001/api).

# API endpoints

To see the swagger documentation for the API go to [http://localhost:8001/swagger](http://localhost:8001/swagger). There are listed all the endpoints including billing (explanation soon).

# Run it with Docker

The building in docker is automatized with the `Makefile`. To build the docker image run:

```
make build-image
```

This will create the docker image with the tag `gptube-go:latest`

And then you can run it with command:

```
make runserver-local
```
