#!bin/bash

echo "Start server"

IMAGE=$1

set -e

sudo apt update && sudo apt -y install docker-compose
sudo chmod 666 /var/run/docker.sock

docker kill $(docker ps -q) || true

docker pull $IMAGE

docker run -p 8080:80 -d $IMAGE
