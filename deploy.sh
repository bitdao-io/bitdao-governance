docker stop goverance
docker rm goverance
docker rmi goverance
docker build -t goverance .
docker run -d --name goverance -p 80:3000 goverance