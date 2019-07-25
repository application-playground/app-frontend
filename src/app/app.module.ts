import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './Administrator/home/home.component';
import { EmptyPageComponent } from './Administrator/empty-page/empty-page.component';
import { TableDemoComponent } from './Administrator/table-demo/table-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmptyPageComponent,
    TableDemoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
