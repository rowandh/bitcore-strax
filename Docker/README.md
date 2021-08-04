Docker file for bitcore-node

Modify DB_HOST to be the mongodb instance.
Port 3000 is exposed but this must be mapped to a port on the host when running the container.

For example:
Build container from the top level bitcore-strax folder with `docker build -t bitcore . -f Docker/Dockerfile`
Run container on port 4000 from the `Docker` folder with `docker run -it -e DB_HOST=... -e DB_PORT=... -v PATH_TO_LOCAL_CONFIG_FOLDER:/config -p 4000:3000 bitcore`

Docker-Compose file
Use this to start mongodb, bitcore-node and bitcore wallet service and connect them together.
From the Docker/ folder (this one), run `docker-compose build` to build the services, followed by `docker-compose up` to start them.
Use docker-compose in conjunction with docker context to deploy to azure container instances as described in https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose.

Production - Azure file share in ACI containers
We mount an Azure file share volume for mongodb persistence in the ACI containers
Ref https://docs.docker.com/cloud/aci-integration/#using-azure-file-share-as-volumes-in-aci-containers