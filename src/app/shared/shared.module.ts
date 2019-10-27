import { JavascriptLoaderService } from './Services/javascript-loader.service';
import { NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HTTP404Component } from './Error/http404/http404.component';
import { HTTP500Component } from './Error/http500/http500.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteComponent } from './delete/delete.component';


declare var jQuery: any;

@NgModule({
  declarations: [
    LoginComponent
    , RegistrationComponent
    , LeftMenuComponent  
    , TopHeaderComponent  
    , FooterComponent
    , ForgetPasswordComponent
    , HTTP404Component
    , HTTP500Component
    , BreadcrumbComponent, DeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedRoutingModule
  ],
  exports: [
    LoginComponent
    , RegistrationComponent
    , LeftMenuComponent  
    , TopHeaderComponent  
    , FooterComponent
    , ForgetPasswordComponent
    , HTTP404Component
    , HTTP500Component
    , BreadcrumbComponent
    , DeleteComponent
  ],
  entryComponents: [ DeleteComponent ],
  providers: [ JavascriptLoaderService ]
})
export class SharedModule implements AfterViewInit { 

  constructor(private dynamicScriptLoader: JavascriptLoaderService) { }

  ngAfterViewInit() {
    // this.loadScripts();
    // jQuery('#side-menu').metisMenu();
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('JQuery-2.1.1','metisMenu').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
