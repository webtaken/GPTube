# GPTube go-server documentation

The backend is built with Go and we use [Go Fiber](https://gofiber.io/) as our web framewrok to build the API.

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

Fill in the environment variables, go to `.env.example` file, make a copy of it and rename this file as `.env`. Leave the variables with default values same as `.env.example`.  
First you need to get an email account to send emails, you can get Gmail [app passwords](https://support.google.com/mail/answer/185833?hl=en) and fill with your credentials the variables `EMAIL_USER` and `EMAIL_PASSWORD`.  
The variable `ENV_MODE` is to choose production or development configuration of the firestore database. If `ENV_MODE` variable is development we use `DB_KEYS_DEVELOPMENT` otherwise `DB_KEYS_PRODUCTION`. `DB_KEYS_...` variables are json credentials files for firebase SDK.  
To get a firebase credentials file you can follow this steps: [get credentials file](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments) (go to the **"To generate a private key file for your service account:"** section), rename that json file as `gptube-firebase-sdk-dev.json` or `gptube-firebase-sdk-prod.json` depending if you're going to develop or put the project in prodcution. Place that json file in the `gptube` folder and paste it's name into `DB_KEYS_DEVELOPMENT` or `DB_KEYS_PRODUCTION` variables.  
You need to [get an api](https://blog.hubspot.com/website/how-to-get-youtube-api-key) key of the Youtube API.  
[Get a hugging face API token](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token) and paste it on `HUGGING_FACE_TOKEN` env var.
Finally [get an openAI api key](https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/) to use the chatGPT API and paste it on the `OPENAI_API_KEY` env var.

```
# Local Configurations
EMAIL_USER=email@email.com # GPTube e-mail account address
EMAIL_PASSWORD="" # GPTube e-mail account password
FRONTEND_URL=http://localhost:3000 # FrontendURL
ORIGIN_ALLOWED="*" # origins allowed
PORT=8000 # Listening PORT
ENV_MODE="" # "development" or "production"
DB_KEYS_DEVELOPMENT="" # firebase .json credentials file for development
DB_KEYS_PRODUCTION="" # firebase .json credentials file for production

# Youtube Configurations
YOUTUBE_API_KEY="" # Your YT Data API Key
YOUTUBE_MAX_COMMENTS_CAPACITY=1000 # The maximun number of comments we are able to process
YOUTUBE_MAX_COMMENTS_REQUIRE_EMAIL=100 # The maximun number of comments we are able to process without the need to send an email back

# AI server Configurations
AI_SERVER_URL = "https://api-inference.huggingface.co" # AI server URL
HUGGING_FACE_TOKEN="hf_klDahHs..." # Token for the hugging face service

# CHATGPT OPENAI Configurations
OPENAI_API_KEY="" # Secret API key
```

Run the project:

```
go run .
```

If you have installed [go air](https://github.com/cosmtrek/air), you can initialize air folder and run the project.

```
air init
air
```

Now open [http://localhost:8000/api](http://localhost:8000/api).

# API endpoints

To first endpoint is the "hello world" from the API, is just a GET query:

```
Request:
GET http://localhost:8000/api

Response:
{
    "message": "GPTube api"
}
```

The second endpoint is for the pre-analysis of a Youtube video, this endpoint returns the metadata of a youtube video.

```
Request:
POST http://localhost:8000/api/youtube/pre-analysis
Request Body:
{
    "video_id": "Nx-T5zuD8Oo" // this is the id of a youtube video
}
Response:
{
    "video_id": "Nx-T5zuD8Oo",
    "number_of_comments": 62,
    "snippet": {
        "categoryId": "28",
        "channelId": "UCiF653G_a4nAj169A6ORyrw",
        "channelTitle": "Serudda",
        "defaultAudioLanguage": "es-419",
        "description": "Aburrido de estar leyendo en todas partes, y viendo videos de que la AI nos va a quitar el trabajo, y que estamos todos jodidos? Bueno, este video te muestra otra perspectiva mucho más alentadora, incorporando dentro de tu flujo como Programador la nueva versión de GitHub Copilot X, la cual incluye por debajo GPT-4, y trae unos features… mama mía!!!, hermosos.\n\nEspero disfrutes este video. 🤜🤛\n\n-----\n\n00:00 - Intro\n01:41 - Lanzamiento de Copilot X\n02:21 - Copilot Chat\n03:58 - Copilot para Pull Request  \n05:34 - Copilot para Docs  \n07:39 - Conclusión\n\n-----\n\nQuieres saber más de mí?\n🎬  Canal Secundario - https://www.youtube.com/@seruddatv\n📸  Instagram - https://instagram.com/serudda\n🐦  Twitter - https://twitter.com/serudda\n🎮  Twitch - https://twitch.tv/serudda\n🕺    TikTok - https://tiktok.com/@serudda\n📚  Discord - https://discord.gg/77guznJ8mZ\n\nQUIEN SOY YO: Soy Sergio Ruiz, también conocido como Serudda (con doble d). Soy un Developer / Designer y Creador. Trabajo generalmente para Startups en etapa temprana, porque me encanta dejar huella al caminar. Además, hago videos y comparto mi conocimiento, intentando ser el Senior que necesitaba, cuando era Junior.\n\n🌍  My Side Project actual - https://www.uiguideline.com\n\nPONERSE EN CONTACTO:\nSi quieres hablar, me encantaría saber de ti. Tuitear a @serudda directamente será la forma más rápida de obtener una respuesta, pero si tu pregunta es muy larga, no dudes en enviarme un correo electrónico a serudda.stream@gmail.com. Hago todo lo posible para responder lo más pronto posible.\n\nNos vemos pronto 🤛\n\n#serudda #chatgpt #github",
        "liveBroadcastContent": "none",
        "localized": {
            "description": "Aburrido de estar leyendo en todas partes, y viendo videos de que la AI nos va a quitar el trabajo, y que estamos todos jodidos? Bueno, este video te muestra otra perspectiva mucho más alentadora, incorporando dentro de tu flujo como Programador la nueva versión de GitHub Copilot X, la cual incluye por debajo GPT-4, y trae unos features… mama mía!!!, hermosos.\n\nEspero disfrutes este video. 🤜🤛\n\n-----\n\n00:00 - Intro\n01:41 - Lanzamiento de Copilot X\n02:21 - Copilot Chat\n03:58 - Copilot para Pull Request  \n05:34 - Copilot para Docs  \n07:39 - Conclusión\n\n-----\n\nQuieres saber más de mí?\n🎬  Canal Secundario - https://www.youtube.com/@seruddatv\n📸  Instagram - https://instagram.com/serudda\n🐦  Twitter - https://twitter.com/serudda\n🎮  Twitch - https://twitch.tv/serudda\n🕺    TikTok - https://tiktok.com/@serudda\n📚  Discord - https://discord.gg/77guznJ8mZ\n\nQUIEN SOY YO: Soy Sergio Ruiz, también conocido como Serudda (con doble d). Soy un Developer / Designer y Creador. Trabajo generalmente para Startups en etapa temprana, porque me encanta dejar huella al caminar. Además, hago videos y comparto mi conocimiento, intentando ser el Senior que necesitaba, cuando era Junior.\n\n🌍  My Side Project actual - https://www.uiguideline.com\n\nPONERSE EN CONTACTO:\nSi quieres hablar, me encantaría saber de ti. Tuitear a @serudda directamente será la forma más rápida de obtener una respuesta, pero si tu pregunta es muy larga, no dudes en enviarme un correo electrónico a serudda.stream@gmail.com. Hago todo lo posible para responder lo más pronto posible.\n\nNos vemos pronto 🤛\n\n#serudda #chatgpt #github",
            "title": "Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)"
        },
        "publishedAt": "2023-03-27T17:15:01Z",
        "tags": [
            "serudda",
            "desarrollador",
            "desarrollo de software",
            "javascript",
            "como aprender a programar",
            "programar",
            "seruda",
            "midudev",
            "frontend",
            "desarrollo web",
            "serruda",
            "ux designer",
            "chatgpt",
            "como usar chatgpt",
            "que es chatgpt",
            "side projects",
            "github copilot",
            "gpt4",
            "copilot para pull request",
            "gpt-4",
            "github",
            "openai",
            "microsoft ai",
            "github ai"
        ],
        "thumbnails": {
            "default": {
                "height": 90,
                "url": "https://i.ytimg.com/vi/Nx-T5zuD8Oo/default.jpg",
                "width": 120
            },
            "high": {
                "height": 360,
                "url": "https://i.ytimg.com/vi/Nx-T5zuD8Oo/hqdefault.jpg",
                "width": 480
            },
            "maxres": {
                "height": 720,
                "url": "https://i.ytimg.com/vi/Nx-T5zuD8Oo/maxresdefault.jpg",
                "width": 1280
            },
            "medium": {
                "height": 180,
                "url": "https://i.ytimg.com/vi/Nx-T5zuD8Oo/mqdefault.jpg",
                "width": 320
            },
            "standard": {
                "height": 480,
                "url": "https://i.ytimg.com/vi/Nx-T5zuD8Oo/sddefault.jpg",
                "width": 640
            }
        },
        "title": "Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)"
    }
}
```

The third endpoint is the analysis of a Youtube video, this endpoint returns the firestore ID results for the youtube video you send. If you provide an email in the json body you'll receive the results ID on your email, otherwise you'll receive the results ID on the fly.

```
Request:
POST http://localhost:8000/api/youtube/analysis
Request body:
{
    "video_id": "Nx-T5zuD8Oo",
    "video_title": "Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)",
    "email": "" // If you leave this field as empty the results are given on the fly
}
Response (with "email" field empty):
{
    "video_id": "Nx-T5zuD8Oo",
    "video_title": "Como GitHub Copilot X te Potenciará como Programador (incluye GPT-4)",
    "results_id": "Nx-T5zuD8Oo" // This is the firestore result ID
}
Response (with "email" field non-empty):
OK // You'll receive the results id later on your email
```

# Run it with Docker

To build the docker image run:

```
make build-image
```

This will create the docker image with the tag `gptube-go:latest`

And then you can run it with docker:

```
docker run --name gptube -p 8000:8000 -d gptube-go:latest
```
