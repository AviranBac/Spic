@echo off

REM Build the Docker image
docker build -t spic:latest .

REM Save the Docker image to a tar file
docker save -o spic.tar.gz spic:latest

echo Docker image saved to spic.tar.gz
