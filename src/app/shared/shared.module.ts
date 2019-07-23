import { JavascriptLoaderService } from './Services/javascript-loader.service';
import { NgModule, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';

declare var jQuery: any;

@NgModule({
  declarations: [
    LoginComponent
    , RegistrationComponent
    , LeftMenuComponent  
    , TopHeaderComponent  
    , FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    LoginComponent
    , RegistrationComponent
    , LeftMenuComponent  
    , TopHeaderComponent  
    , FooterComponent
  ],
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
