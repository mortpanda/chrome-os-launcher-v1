import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  async oktaApiCall(method,url,token?,content?) {
    const thisFetch = fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json; okta-version=1.0.0',
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

  async oktaActivation(method,url,content?) {
    const thisFetch = fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; okta-version=1.0.0',
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

  async GetItemsFromWorkflows(url, mykey, email) {
    let requestURI;
    requestURI = url;
    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
    }
    var strWebsites;
    strWebsites = await this.InvokeFlow(requestURI, requestBody);
    return strWebsites;
  }

  async InvokeFlow(url, content) {
    const thisFetch = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
    let responseJson = await thisFetch;
    return responseJson
  }

  
  async uploadWebApp(url, mykey, email, appName, appCategory, appUri) {
    let requestURI;
    requestURI = url;
    let requestBody;
    requestBody = {
      mykey: mykey,
      email: email,
      category: appCategory,
      appname: appName,
      appUri: appUri,
    }
    let newWebApp;
    newWebApp = await this.InvokeFlow(requestURI, requestBody);
    return newWebApp;
  }
  

}


