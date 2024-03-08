#!bin/bash

echo "Running deploy"

SERVER=$1
IMAGE=$2

set -e

mkdir /root/.ssh
touch /root/.ssh/id_rsa
touch /root/.ssh/config

echo -e "Host *\n\tStrictHostKeyChecking no\n\n" >> /root/.ssh/config
echo -e "$PRIVATE_KEY" > /root/.ssh/id_rsa
chmod 600 /root/.ssh/id_rsa

ssh ubuntu@$SERVER 'bash -s' < ./scripts/startServer.sh $IMAGE