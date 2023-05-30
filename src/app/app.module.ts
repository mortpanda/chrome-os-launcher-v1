import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MainDockComponent } from './shared/main-dock/main-dock.component';
import { DockModule } from 'primeng/dock';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FilterPipe } from './shared/filter.pipe';
import { WorldTimeComponent } from './world-time/world-time.component';
import { DatePipe } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { AddWebsiteComponent } from './config/add-website/add-website.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { MyappsComponent } from './myapps/myapps.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MenuComponent,
    MainDockComponent,
    ModalComponent,
    FilterPipe,
    WorldTimeComponent,
    ConfigComponent,
    AddWebsiteComponent,
    MyappsComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    SidebarModule,
    ButtonModule,
    DockModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    ProgressBarModule,
  ],


  providers: [MyappsComponent,MessageService,ModalComponent, WorldTimeComponent, DatePipe, ConfigComponent, AddWebsiteComponent, MatDialogModule, {
    provide: MatDialogRef,
    useValue: {}
  },],

  bootstrap: [AppComponent],

})
export class AppModule { }


