import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {LoginSuccessComponent} from './components/pages/login-success/login-success.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {
  CreateOrganizationComponent,
} from './components/pages/organizations/create-organization/create-organization.component';
import {
  ViewOrganizationsComponent,
} from './components/pages/organizations/view-organizations/view-organizations.component';
import {
  ManageOrganizationsComponent,
} from './components/pages/organizations/manage-organizations/manage-organizations.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: LandingPageComponent},
  {path: 'welcome', component: LandingPageComponent},
  {path: 'login-success', component: LoginSuccessComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'organizations/create', component: CreateOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'organizations/manage', component: ManageOrganizationsComponent, canActivate: [AuthGuard]},
  {path: 'organizations/view', component: ViewOrganizationsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Default generated app routing module.
 */
export class AppRoutingModule { }
