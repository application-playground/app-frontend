import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { FooterComponent } from './footer/footer.component';

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
})
export class SharedModule { }
