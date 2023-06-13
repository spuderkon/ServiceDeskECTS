import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { PersonalAccountComponent } from '../personal-account/personal-account.component';
import { RequestsComponent } from '../requests/requests.component';
import { SubmittedRequestsComponent } from '../submitted-requests/submitted-requests.component';
import { AuthGuard } from '../services/guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { IsSignedInAuthGuard } from '../services/guards/isSignedInAuth/is-signed-in-auth.guard';
import { MyRequestsComponent } from '../my-requests/my-requests.component';
import { CrudPersonsComponent } from '../crud-persons/crud-persons.component';

const routes: Routes = [
  {path: 'auth', component: AuthorizationComponent, canActivate:[IsSignedInAuthGuard]},
  {path: '', component: AppComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'lk', component: PersonalAccountComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'createRequest', component: CreateRequestComponent, canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  {path: 'submittedRequests', component: SubmittedRequestsComponent,  canActivate:[AuthGuard], data: {role: ['client','laborant','admin']}},
  
  {path: 'requests', component: RequestsComponent, canActivate:[AuthGuard], data: {role: ['laborant','admin']}},
  {path: 'myRequests', component: MyRequestsComponent,  canActivate:[AuthGuard], data: {role: ['laborant','admin']}},

  {path: 'crudPersons', component: CrudPersonsComponent, canActivate:[AuthGuard], data: {role: ['admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
