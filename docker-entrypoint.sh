#!/bin/bash
rsa_prikey_path="/home/echo/rs256.pem"
rsa_pubkey_path="/home/echo/rs256.pub"

openssl genrsa -out $rsa_prikey_path 4096
openssl rsa -in $rsa_prikey_path -pubout -outform PEM -out $rsa_pubkey_path

echo "=======MIGRATE DATABASE======="

echo "**********UPGRADE DB**********"

echo "===========ENV===========";

printenv

echo "==============================";
exec "$@"
