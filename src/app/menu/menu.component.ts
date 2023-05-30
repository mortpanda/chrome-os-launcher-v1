import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaService } from '../shared/okta.service';
import { OktaConfigService } from '../shared/okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApiService } from '../shared/api.service';
import { GeneralService } from '../shared/general-services/general.service';
import { WebviewWindow } from '@tauri-apps/api/window';
import { ModalComponent } from '../shared/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorldTimeComponent } from '../world-time/world-time.component';
import { ConfigComponent } from '../config/config.component';
import {MyappsComponent} from '../myapps/myapps.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
  timeoutHandler;
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
  dataLoaded;

  constructor(
    private OktaConfigService: OktaConfigService,
    private OktaService: OktaService,
    private breakpointObserver: BreakpointObserver,
    private ApiService: ApiService,
    public GeneralService: GeneralService,
    private ModalComponent: ModalComponent,
    private _matdialog: MatDialog,
    private WorldTimeComponent: WorldTimeComponent,
    private ConfigComponent: ConfigComponent,
    private MyappsComponent:MyappsComponent,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
    this.dataLoaded = false;
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

        let localCache = await this.GeneralService.checkLocalCache("menuItems");
        switch (localCache) {
          case false: {
            this.arrMenuItems = await this.ApiService.GetItemsFromWorkflows(this.OktaConfigService.menuItemUri, this.myAccessToken.claims.myKey, this.myAccessToken.claims.sub)
            await this.GeneralService.saveToStorage(this.arrMenuItems, "menuItems");

            break;
          }
          case true: {
            this.arrMenuItems = await JSON.parse(localStorage.getItem("menuItems"))
            break;
          }
        }


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
        this.dataLoaded = true;
      }
    }
    await this.arrMenuItems.sort(function (a, b) {
      return a.siteName.localeCompare(b.siteName);
    })
  }

  // test() {
  //   const webview = new WebviewWindow('my-label', {
  //     url: 'https://github.com/tauri-apps/tauri'
  //   });
  //   webview.once('tauri://created', function () {
  //     // webview window successfully created
  //   });
  //   webview.once('tauri://error', function (e) {
  //     // an error happened creating the webview window
  //   });// an error occurred during webview window creation
  // }

  openLink(strApp) {
    this.GeneralService.changeMessage(strApp);
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "80vh";
    DialogConfig.width = "70vw";
    const modalDialog = this._matdialog.open(ModalComponent, DialogConfig);
  }

  worldTime() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "50vh";
    DialogConfig.width = "60vw";
    const modalDialog = this._matdialog.open(WorldTimeComponent, DialogConfig);
  }

  smWorldTime() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "80vh";
    DialogConfig.width = "90vw";
    const modalDialog = this._matdialog.open(WorldTimeComponent, DialogConfig);
  }


  smConfig() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "40vh";
    DialogConfig.width = "90vw";
    const modalDialog = this._matdialog.open(ConfigComponent, DialogConfig);
  }

  openConfig() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "30vh";
    DialogConfig.width = "40vw";
    const modalDialog = this._matdialog.open(ConfigComponent, DialogConfig);
  }

  openMyApps() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "80vh";
    DialogConfig.width = "80vw";
    const modalDialog = this._matdialog.open(MyappsComponent, DialogConfig);
   }

   smOpenMyApps() {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "modal-component";
    DialogConfig.height = "85vh";
    DialogConfig.width = "98vw";
    const modalDialog = this._matdialog.open(MyappsComponent, DialogConfig);
   }
}


