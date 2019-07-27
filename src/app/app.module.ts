import './../polyfills';

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './Administrator/home/home.component';
import { EmptyPageComponent } from './Administrator/empty-page/empty-page.component';
import { TableDemoComponent } from './Administrator/table-demo/table-demo.component';
import { MatTableComponent } from './Administrator/mat-table/mat-table.component';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmptyPageComponent,
    TableDemoComponent,
    MatTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,                    
    ReactiveFormsModule,
    MatNativeDateModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);