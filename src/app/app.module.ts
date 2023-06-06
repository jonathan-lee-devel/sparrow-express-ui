import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {CookieService} from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {
  CreateOrganizationComponent,
} from './components/pages/organizations/create-organization/create-organization.component';
import {
  ManageOrganizationsComponent,
} from './components/pages/organizations/manage-organizations/manage-organizations.component';
import {
  ViewOrganizationsComponent,
} from './components/pages/organizations/view-organizations/view-organizations.component';
import {LoginComponent} from './components/pages/login/login.component';
import {NgOptimizedImage} from '@angular/common';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { RegisterComponent } from './components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    DashboardComponent,
    CreateOrganizationComponent,
    ManageOrganizationsComponent,
    ViewOrganizationsComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
/**
 * Default generated app module.
 */
export class AppModule { }
