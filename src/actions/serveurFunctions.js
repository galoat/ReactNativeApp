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