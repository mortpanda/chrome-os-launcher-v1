import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { WorldTimeService } from '../shared/world-time.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-world-time',
  templateUrl: './world-time.component.html',
  styleUrls: ['./world-time.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorldTimeComponent {

  smallScreen: boolean;
  constructor(
    private WorldTimeService: WorldTimeService,
    private breakpointObserver: BreakpointObserver,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }
  arrWorldTime: any[] = [];

  async ngOnInit() {
    this.arrWorldTime = await this.WorldTimeService.GetWorldTime();
    
  }
}
