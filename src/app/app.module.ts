import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { GeralComponent } from './components/geral/geral.component';
import { ChartModule } from 'angular-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TabelaComponent } from './components/tabela/tabela.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxAnimationsModule } from 'ngx-animations';

@NgModule({
  declarations: [
    AppComponent,
    GeralComponent,
    TabelaComponent,
    MenuLateralComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxAnimationsModule,
    ChartModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
