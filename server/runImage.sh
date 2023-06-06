docker load -i spic.tar.gz
docker rm -f spic
docker run --name spic -d -p 80:8080 spic:latest
