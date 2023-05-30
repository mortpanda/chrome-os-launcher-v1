import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GeneralService } from '../general-services/general.service';
import { ApiService } from '../api.service';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaService } from '../okta.service';
import { OktaConfigService } from '../okta-config.service';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ModalComponent {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaService.config);
  strUserSession;
  strThisUser;
  strFullName;
  mainAppMenu = [];
  selectedMessage: any;
  myAccessToken;
  arrMenuItems;
  arrApps;
  applist: any[] = [];
  appType;
  searchTxt;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private ApiService: ApiService,
    public GeneralService: GeneralService,
    private OktaConfigService: OktaConfigService,
    private OktaService: OktaService,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }


  async ngOnInit() {
    this.GeneralService.currentMessage.subscribe(message => (this.selectedMessage = message));
    this.appType = await this.selectedMessage

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
        let appCache = await this.GeneralService.checkLocalCache("appItems");
        switch (appCache) {
          case false: {
            this.arrApps = await this.ApiService.GetItemsFromWorkflows(this.OktaConfigService.appItemsUri, this.myAccessToken.claims.myKey, this.myAccessToken.claims.sub)
            await this.GeneralService.saveToStorage(this.arrApps, "appItems");
            break;
          }
          case true: {
            this.arrApps = await JSON.parse(localStorage.getItem("appItems"))
            break;
          }
        }
        //Enter into array for menu here
        this.applist = await this.GeneralService.pushAppArray(this.arrApps, this.appType)
      }
    }

  }

  

}
