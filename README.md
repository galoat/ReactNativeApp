# SkiUt 
Skiut is a simple application with a mobile application in reactNative and a server 
which use a micro-service-architecture in java

## Serveur

The serveur use micro service and is coded in java

### Run in development
In order to run in developement you need mysql-dockers. 
simply launch the docker-compose in the root of project (docker-compose up -d)

#### List microServices
##### FeedInfo
Responsable of the display of the feedInfo, ue mysql, and connect to the edge service in order to provide an API
1. Connect to Db : 
- In test use db is test and port 3308
- in prod db is ???? and port ????

2. API description:
 