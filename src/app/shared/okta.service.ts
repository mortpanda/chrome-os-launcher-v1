import { Injectable } from '@angular/core';
import { OktaConfigService } from './okta-config.service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams,
} from '@okta/okta-auth-js';
import { BehaviorSubject } from "rxjs";
import OktaSignIn from '@okta/okta-signin-widget';

@Injectable({
  providedIn: 'root'
})
export class OktaService {
  myAccessToken;
  strUserName;
  constructor(
    private OktaConfigService: OktaConfigService,
  ) { }

  config = {
    issuer: this.OktaConfigService.strIssuer,
    clientId: this.OktaConfigService.strClientID,
    // clientSecret: this.OktaConfigService.strClientSecret,
    redirectUri: this.OktaConfigService.strRedirectURL,
    scopes: this.OktaConfigService.profileScope,
    useInteractionCodeFlow: true,
    postLogoutRedirectUri: this.OktaConfigService.strPostLogoutURL,
  };
  oktaAuth = new OktaAuth(this.config);

  async GetAccessToken() {
    const accessToken: AccessToken = await this.oktaAuth.tokenManager.get('accessToken') as AccessToken;
    this.myAccessToken = accessToken;  
    this.strUserName = this.myAccessToken.claims.sub;
    return this.myAccessToken;
  }

  
  async login(redirecturi) {
    const OktaClientID = this.OktaConfigService.strClientID;
    const OktaBaseURI = this.OktaConfigService.strBaseURI;
    const OktaRedirect = redirecturi;
    const OktaBrand = this.OktaConfigService.strBrand;
    const OktaIssuer = this.OktaConfigService.strIssuer;
    const OktaScope = this.OktaConfigService.profileScope;
    const OktaPostLogout = this.OktaConfigService.strPostLogoutURL;
    // const OktaClientSecret = this.OktaConfigService.strClientSecret;

    var widgetConfig = ({
      clientId: OktaClientID,
      // clientSecret:OktaClientSecret,
      baseUrl: OktaBaseURI,
      issuer: OktaIssuer,
      redirectUri: OktaRedirect,
      colors: {
        brand: OktaBrand,
      },
      features: {
        selfServiceUnlock: false,
        router: true,
        showPasswordToggleOnSignInPage: true,
        hideSignOutLinkInMFA: false,
        rememberMe: true
      },
      tokenManager: {
        storage: sessionStorage
      },
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
    })
    var oktaSignIn = new OktaSignIn(widgetConfig);
    console.log(OktaScope);
    // *****************************************************************************
    // This will display the context in the console.
    // *****************************************************************************
    await oktaSignIn.on('afterRender', function (context, error) {
      console.log(context.controller);
    });
    // *****************************************************************************
    // *****************************************************************************
    await oktaSignIn.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(function (tokens) {
      oktaSignIn.authClient.tokenManager.setTokens(tokens);
      // oktaSignIn.remove();
      const idToken = tokens.idToken;
      const strTokens = JSON.stringify(tokens)
      console.log("Hello, " + idToken.claims.email + "! You just logged in! :)");
      window.location.replace(OktaRedirect);
      return true;
    })
      .then(function success(res) {
        console.log(res);
      })
      .catch(function (err) {
        console.error(err);
        return false;
      });

  }


  CloseWidget() {
    const OktaClientID = this.OktaConfigService.strClientID;
    // const OktaClientSecret = this.OktaConfigService.strClientSecret;
    const OktaBaseURI = this.OktaConfigService.strBaseURI;
    const OktaRedirect = this.OktaConfigService.strRedirectURL;
    const OktaIssuer = this.OktaConfigService.strIssuer;
    const OktaScope = this.OktaConfigService.profileScope;
    var oktaSignIn = new OktaSignIn({
      clientId: OktaClientID,
      // clientSecret:OktaClientSecret,
      baseUrl: OktaBaseURI,
      redirectUri: OktaRedirect,
      authParams: {
        issuer: OktaIssuer,
        scopes: OktaScope,
      },
      useInteractionCodeFlow: true,
    });
    oktaSignIn.remove();

  }

}


