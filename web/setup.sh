#!/bin/bash
IMAGE_NAME=personal
CONTAINER_NAME=personal

docker build --rm -t $IMAGE_NAME .
docker rm -f $CONTAINER_NAME || true

docker run -d \
  -p 80:80 \
  --restart unless-stopped \
  --name $CONTAINER_NAME \
  $IMAGE_NAME