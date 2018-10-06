import * as serverConst from '../const/server';

import fetch from './fetchWithTimeout'


export async function getFeedFromServer(token){
  ipServer = "http://"+serverConst.IP_SERVER+":"+serverConst.SERVER_PORT_EDGE_SERVICE+serverConst.SERVER_GET_ALL_FEED
    console.log("serveurFunctions.js: request to : ", ipServer, "all Feed with token ", token)
      
   return fetch(ipServer, {
     method: 'GET',
     headers: {
        'Authorization': "bearer  "+  token
      }
    }, 10000 )
   .then((response) => response.json())
    
  }



export async function loginFromServer(username, password){
   var formData = new FormData();
    formData.append('password', password);
    formData.append('grant_type', 'password');
    formData.append('username', username);

    var encodeBase64 = serverConst.SERVER_BASE64

    return fetch("http://"+serverConst.IP_SERVER+":"+serverConst.SERVER_PORT_OAUTH+serverConst.SERVER_OAUTH_PATH, {
     method: 'POST',
     headers: {
        'Authorization': "Basic "+ encodeBase64,
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    }, 10000 )
     .then(response => {
          return response.json();
       })
   }