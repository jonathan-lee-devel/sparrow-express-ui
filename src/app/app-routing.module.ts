import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'welcome', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
/**
 * Default generated app routing module.
 */
export class AppRoutingModule { }
