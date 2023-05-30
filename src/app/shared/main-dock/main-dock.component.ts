import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ViewEncapsulation } from '@angular/core';
import { OktaService } from '../okta.service';
import { OktaConfigService } from '../okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DockModule } from 'primeng/dock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-dock',
  templateUrl: './main-dock.component.html',
  styleUrls: ['./main-dock.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainDockComponent {
  position: string;
  smallScreen: boolean;
  mainDock: MenuItem[];
  constructor(
    private OktaService: OktaService,
    private OktaConfigService: OktaConfigService,
    private breakpointObserver: BreakpointObserver,
    private Router: Router
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
      this.position = "bottom";
    });

    this.mainDock = this.dockMenu;
  }

  ngOnInit() {}

  dockMenu = [
    {
      tooltipOptions: {
        tooltipLabel: "Main Menu",
        tooltipPosition: "right",
      },
      icon: "pi pi-home",
      command: () => {
        this.gotoRoute('');
      }
    },

    {
      tooltipOptions: {
        tooltipLabel: "Home",
        tooltipPosition: "right",
      },
      icon: "pi pi-bars",
      command: () => {
        this.gotoRoute('menu');
      }
    },

    {
      tooltipOptions: {
        tooltipLabel: "Logout",
        tooltipPosition: "right",
      },
      icon: "pi pi-sign-out",
      command: () => {
        this.Logout();
      }
    },
  ]

  gotoRoute(route) {
    this.Router.navigateByUrl('/'+route)
  }

  async Goto(url) {
    await window.open(url, '_blank');
  }

  async Logout() {
    this.OktaService.oktaAuth.signOut();
  }

  async GoHome() {
    window.location.replace(this.OktaConfigService.strPostLogoutURL);
  }

}
