import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { PersonalAccountComponent } from './personal-account/personal-account.component';

const routes: Routes = [
  {path: 'auth', component: AuthorizationComponent},
  {path: 'createApplication', component: CreateApplicationComponent},
  {path: 'lk', component: PersonalAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
