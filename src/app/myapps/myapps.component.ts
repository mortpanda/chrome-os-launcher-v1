import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaService } from '../shared/okta.service';
import { OktaConfigService } from '../shared/okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaAuth } from '@okta/okta-auth-js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-myapps',
  templateUrl: './myapps.component.html',
  styleUrls: ['./myapps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyappsComponent {
  smallScreen: boolean;
  public authService = new OktaAuth(this.OktaService.config);
  strUserSession;
  strThisUser;
  strFullName;
  myAccessToken;
  strSafeSite: SafeResourceUrl;
  dashboardUrl = 'https://login-wld.okta.com/app/UserHome?iframe=true&iframeControlHideAll=true&iframeControlHideSearch=true';

  constructor(
    private OktaConfigService: OktaConfigService,
    private OktaService: OktaService,
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
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
          this.strFullName = await this.strThisUser.name;
          this.myAccessToken = await this.OktaService.GetAccessToken()
          this.strSafeSite = await this.sanitizer.bypassSecurityTrustResourceUrl(this.dashboardUrl);
        break;
      }
    }
  }

}
