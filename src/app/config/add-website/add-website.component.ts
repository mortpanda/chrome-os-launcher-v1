import { Component, Inject } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaService } from '../../shared/okta.service';
import { OktaConfigService } from '../../shared/okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApiService } from '../../shared/api.service';
import { GeneralService } from '../../shared/general-services/general.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-website',
  templateUrl: './add-website.component.html',
  styleUrls: ['./add-website.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddWebsiteComponent {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaService.config);
  strUserSession;
  strThisUser;
  userEmail;
  userKey;

  selectedMessage: any;
  myAccessToken;

  arrAppCat;
  selectedCat;
  websiteName;
  websiteUrl;
  toastMsg;
  addRes;

  constructor(
    private OktaConfigService: OktaConfigService,
    private OktaService: OktaService,
    private breakpointObserver: BreakpointObserver,
    private ApiService: ApiService,
    public GeneralService: GeneralService,
    private MessageService: MessageService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.arrAppCat = [
      { webCat: "Daily Websites" },
      { webCat: "Admin Dashboards" },
      { webCat: "User Dashboards" },
      { webCat: "My Personal Apps" },
    ]
  }

  async ngOnInit() {
    this.strUserSession = await this.authService.isAuthenticated();
    switch (this.strUserSession == true) {
      case false: {
        window.location.replace(this.OktaConfigService.strPostLogoutURL);
        break;
      }
      case true: {
        this.strThisUser = await this.authService.token.getUserInfo()
          .then(function (user) {
            return user
          })
          .catch((err) => {
            console.log(err);
            window.location.replace(this.OktaConfigService.strPostLogoutURL);
          })
        this.userEmail = await this.strThisUser.email;
        this.myAccessToken = await this.OktaService.GetAccessToken()
        this.userKey = await this.myAccessToken.claims.myKey
      }
    }
    console.log(this.userEmail)
  }

  async postWebsite() {
    this.myAccessToken = await this.OktaService.GetAccessToken()
    this.userKey = await this.myAccessToken.claims.myKey
    this.addRes = await this.ApiService.uploadWebApp(this.OktaConfigService.webAppuploadUri, this.userKey, this.userEmail, this.websiteName, this.selectedCat.webCat, this.websiteUrl)

    if (this.addRes.status == "Upload Successful") {
      this.toastMsg = await "Upload Successful";
      await this.showSuccess();
    } else {
      this.toastMsg = await "Error!";
      this.showError()
    }
    this.addRes = await "";
    this.addRes = await "";
    this.addRes = "";
  }

  showSuccess() {
    this.MessageService.add({ severity: 'success', summary: 'Success', detail: this.toastMsg });
  }

  showError() {
    this.MessageService.add({ severity: 'error', summary: 'Error', detail: this.toastMsg });
  }
  onReject() {
    this.MessageService.clear('c');
  }
}


  

