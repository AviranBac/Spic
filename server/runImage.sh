docker load -i spic.tar.gz
docker kill spic
docker run --name spic -d -p 80:8080 spic:latest
