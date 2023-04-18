import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {LoginSuccessComponent} from './components/pages/login-success/login-success.component';
import {HomeComponent} from './components/pages/home/home.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'welcome', component: LandingPageComponent},
  {path: 'login-success', component: LoginSuccessComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Default generated app routing module.
 */
export class AppRoutingModule { }
