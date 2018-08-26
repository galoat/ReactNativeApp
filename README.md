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
 
##### oAuth

in order to get the token you need to send a post request to http://<serverIp>:9191/uaa/oauth/token
with :
1. In header
* Authorization : aHRtbDU6c2VjcmV0
2. In body:
* password :< your user password >
* username: < userName >
* grant_type: password
* scope: openid
* client_id: html5
* client_secret: secret

Response :
```json
{
    "access_token": "<your token>",
    "token_type": "bearer",
    "expires_in": 43199,
    "scope": "openid"
}
```
Then when you try to connect to a secure API you need to add this propertie to header   
* Authorization : bearer < yourtoken >

### PersonneService
Contains all information about personnes: custome end point using repositoryRestResources:  

* < yourIp > : < port>/personnes/search/existsByName?name=< NameToTest >