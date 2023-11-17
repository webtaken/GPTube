build-image:
	-docker build -t gptube-go:latest .

runserver-local:
	-docker run -d -p 8001:8001 --name gptube-go gptube-go:latest

runserver-prod:
	-docker run -d -p 8001:8001 -e ENV_MODE=production --name gptube-go gptube-go:latest
