import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { PersonalAccountComponent } from '../personal-account/personal-account.component';
import { ApplicationsComponent } from '../applications/applications.component';
import { ApplicationComponent } from '../application/application.component';
import { SubmittedApplicationsComponent } from '../submitted-applications/submitted-applications.component';
import { AuthGuard } from '../services/guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { IsSignedInAuthGuard } from '../services/guards/isSignedInAuth/is-signed-in-auth.guard';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { CrudPersonsComponent } from '../crud-persons/crud-persons.component';

const routes: Routes = [
  {path: 'auth', component: AuthorizationComponent, canActivate:[IsSignedInAuthGuard]},
  {path: '', component: AppComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'lk', component: PersonalAccountComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'createApplication', component: CreateApplicationComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'submittedApplications', component: SubmittedApplicationsComponent,  canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},

  {path: 'application/:id', component: ApplicationComponent, data: {role: ['laborant','admin']}},
  {path: 'applications', component: ApplicationsComponent, canActivate:[AuthGuard], data: {role: ['laborant','admin']}},
  {path: 'myApplications', component: MyApplicationsComponent,  canActivate:[AuthGuard], data: {role: ['laborant','admin']}},

  {path: 'crudPersons', component: CrudPersonsComponent, canActivate:[AuthGuard], data: {role: ['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
