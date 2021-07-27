Docker file for bitcore-node

Modify DB_HOST to be the mongodb instance.
Port 3000 is exposed but this must be mapped to a port on the host when running the container.

For example:
Build container from the top level bitcore-strax folder with `docker build -t bitcore . -f Docker/Dockerfile`
Run container on port 4000 from the `Docker` folder with `docker run -it -e DB_HOST=... -e DB_PORT=... -v PATH_TO_LOCAL_CONFIG_FOLDER:/config -p 4000:3000 bitcore`

Docker-Compose file
Use this to start mongodb and bitcore-node and connect them together.
From the Docker/ folder (this one), run `docker-compose build` to build the services, followed by `docker-compose up` to start them