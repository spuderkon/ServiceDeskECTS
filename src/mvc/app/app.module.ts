import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import { PersonalAccountComponent } from '../personal-account/personal-account.component';
import { MatMenuModule } from '@angular/material/menu';
import { ApplicationsComponent } from '../applications/applications.component'
import { ApplicationComponent } from '../application/application.component';
import { SubmittedApplicationsComponent } from '../submitted-applications/submitted-applications.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from '../services/guards/auth/auth.guard';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { CrudPersonsComponent, CreateUserDialog } from '../crud-persons/crud-persons.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    CreateApplicationComponent,
    PersonalAccountComponent,
    ApplicationsComponent,
    ApplicationComponent,
    SubmittedApplicationsComponent,
    MyApplicationsComponent,
    CrudPersonsComponent,
    CreateUserDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSliderModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  providers: [[AuthorizationComponent, AuthGuard], { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
