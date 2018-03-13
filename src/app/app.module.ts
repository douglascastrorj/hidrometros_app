import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HidrometrosPage } from '../pages/hidrometros/hidrometros';
import { AddHidrometroPage } from '../pages/hidrometros/add-hidrometro/add-hidrometro';

import { MedicoesPage } from '../pages/medicoes/medicoes';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { HidrometroService } from '../providers/hidrometro-service';
import { MedicaoService } from '../providers/medicao-service';
import  { Http } from '@angular/http';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    HidrometrosPage,
    AddHidrometroPage,
    MedicoesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    HidrometrosPage,
    AddHidrometroPage,
    MedicoesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    HidrometroService,
    MedicaoService
  ]
})
export class AppModule {}
