GO_SERVER=go-server
NEXT_DIR=gptube

# Add the directory containing swag to the PATH
export PATH := $(PATH):~/go/bin

build-api:
	- cp $(GO_SERVER)/docs/swagger.yaml $(NEXT_DIR)
	- cd $(NEXT_DIR) && pnpm generate-api
