import { MatTableComponent } from './Administrator/mat-table/mat-table.component';
import { HTTP404Component } from './shared/Error/http404/http404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { HomeComponent } from './Administrator/home/home.component';
import { ForgetPasswordComponent } from './shared/forget-password/forget-password.component';
import { HTTP500Component } from './shared/Error/http500/http500.component';
import { EmptyPageComponent } from './Administrator/empty-page/empty-page.component';
import { TableDemoComponent } from './Administrator/table-demo/table-demo.component';
import { AuthGuard } from './security/auth.guard';
import { BlockComponent } from './Administrator/block/block.component';

const routes: Routes = [
  // Super-admin routes goes here
  // { path: 'super-admin', component: SuperAdminComponent, children: [] },

  // client 1 routes goes here here
  // { path: 'client1', component: Client1Component, children: [] },
  
  // client 2 routes goes here here
  // { path: 'client2', component: Client2Component,  children: [] },

  // Super-admin layout routes
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  // Application Template routes goes here
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  // { path: 'simple-login', component: SimpleLoginComponent },
  { path: 'register', component: RegistrationComponent },  
  { path: 'forget-password', component: ForgetPasswordComponent },
  // { path: 'lock-screen', component: LockScreenComponent },
  { path: '404', component: HTTP404Component },
  { path: '500', component: HTTP500Component },
  
  {
    path: 'template', component: HomeComponent, canActivate: [AuthGuard], 
    children: [
      { path: 'empty', component: EmptyPageComponent },    
      { path: 'demo-table', component: TableDemoComponent },
      { path: 'mat-table', component: MatTableComponent },
      { path: 'block', component: BlockComponent }
      // { path: 'forms', loadChildren: './Layout/Content-Page/form-section/form-section.module#FormSectionModule' },
      // { path: 'app-view', loadChildren: './Layout/Content-Page/app-view/app-view.module#AppViewModule' },
      // { path: 'other-view', loadChildren: './Layout/Content-Page/other-page/other-page.module#OtherPageModule' },
      // { path: 'miss', loadChildren: './Layout/Content-Page/Miscellaneous-Section/miscellaneous-section.module#MiscellaneousSectionModule' },
      // { path: 'ui-view', loadChildren: './Layout/Content-Page/uielement-section/uielement-section.module#UIElementSectionModule' }
    ]
  },
  
  // Content Page Redirection
  { path: '**', redirectTo: 'template' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
