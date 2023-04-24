import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { PersonalAccountComponent } from '../personal-account/personal-account.component';
import { ApplicationsComponent } from '../applications/applications.component';
import { ApplicationComponent } from '../application/application.component';
import { SubmittedApplicationsComponent } from '../submitted-applications/submitted-applications.component';
import { UsersListComponent } from '../users-list/users-list.component';

const routes: Routes = [
  {path: 'auth', component: AuthorizationComponent},
  {path: 'createApplication', component: CreateApplicationComponent},
  {path: 'lk', component: PersonalAccountComponent},
  {path: 'applications', component: ApplicationsComponent},
  {path: 'application/:id', component: ApplicationComponent},
  {path: 'submittedApplications', component: SubmittedApplicationsComponent},
  {path: 'usersList', component: UsersListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
