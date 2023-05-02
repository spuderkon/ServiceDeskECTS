import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { PersonalAccountComponent } from '../personal-account/personal-account.component';
import { ApplicationsComponent } from '../applications/applications.component';
import { ApplicationComponent } from '../application/application.component';
import { SubmittedApplicationsComponent } from '../submitted-applications/submitted-applications.component';
import { UsersListComponent } from '../users-list/users-list.component';
import { AuthguardGuard } from '../services/guard/authguard/authguard.guard';
import { AppComponent } from './app.component';
import { IsSignedInAuthGuard } from '../services/guard/IsSignedInAuth/is-signed-in-auth.guard';

const routes: Routes = [
  {path: '', component: AppComponent, canActivate:[AuthguardGuard], data: {role: ['client','laborant','admin']}},
  {path: 'auth', component: AuthorizationComponent, canActivate:[IsSignedInAuthGuard]},
  {path: 'createApplication', component: CreateApplicationComponent, canActivate:[AuthguardGuard], data: {role: ['client','laborant','admin']}},
  {path: 'lk', component: PersonalAccountComponent, canActivate:[AuthguardGuard], data: {role: ['client','laborant','admin']}},
  {path: 'applications', component: ApplicationsComponent, canActivate:[AuthguardGuard], data: {role: ['laborant','admin']}},
  {path: 'application/:id', component: ApplicationComponent, data: {role: ['laborant','admin']}},
  {path: 'submittedApplications', component: SubmittedApplicationsComponent,  canActivate:[AuthguardGuard], data: {role: ['client','laborant','admin']}},
  {path: 'usersList', component: UsersListComponent, canActivate:[AuthguardGuard], data: {role: ['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
