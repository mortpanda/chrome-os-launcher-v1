import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef,  MatDialogConfig } from '@angular/material/dialog';
import { AddWebsiteComponent } from './add-website/add-website.component';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigComponent {
  smallScreen: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private AddWebsiteComponent: AddWebsiteComponent,
    private _matdialog: MatDialog,
    public dialogRef: MatDialogRef<ConfigComponent>
    
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() { }

  clearCache() {
    localStorage.removeItem('appItems');
    localStorage.removeItem('menuItems');
    window.location.replace('/')
  }

  addWebsite() {
    
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "add-website-component";
    DialogConfig.height = "45vh";
    DialogConfig.width = "40vw";
    const modalDialog = this._matdialog.open(AddWebsiteComponent, DialogConfig);
    this.dialogRef.close();
  }

  smAddWebsite(){
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false;
    DialogConfig.id = "add-website-component";
    DialogConfig.height = "50vh";
    DialogConfig.width = "70vw";
    const modalDialog = this._matdialog.open(AddWebsiteComponent, DialogConfig);
    this.dialogRef.close();
  }

}

