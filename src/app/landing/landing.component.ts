import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {OktaService} from '../shared/okta.service';
import {OktaConfigService} from '../shared/okta-config.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent {
  smallScreen: boolean;
  constructor(
    private OktaConfigService:OktaConfigService,
    private OktaService:OktaService,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
   }

   async ngOnInit() {
    await this.OktaService.CloseWidget();
    await this.OktaService.login(this.OktaConfigService.strRedirectURL)
  }
}
