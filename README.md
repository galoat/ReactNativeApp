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

## AutoDeploy
### GitlabRunner
This repo use gitlab runner in order to create and deploy all docker images (see .gitlabrunner)
in order to work you need to defined the folloing varaible:
* password_docker : password to connect to docker
* user_docker: The user login for docker
* jarsignpassword : the password o the key for generate the Android sign application

### Autodeplot
This project use Terraform and Ansible to autodeploy on scaleway web server in oder to do that you need to first define the following varaiable:
* export SCALEWAY_TOKEN=< your scaleway token >
* export SCALEWAY_ORGANIZATION=< your scaleway organization token>

Then you can use the following command to deploy :
* Go yo server/autodeploy/terraform
* terraform apply --auto-approve

If there is a bug ith the launch of ansible you can replay ansible playbook with:
* ansible-playbook -i hosts ../ansible/deploy.yml
 