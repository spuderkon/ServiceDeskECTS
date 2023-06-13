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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AuthorizationComponent } from '../authorization/authorization.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { ChangePassword, PersonalAccountComponent } from '../personal-account/personal-account.component';
import { MatMenuModule } from '@angular/material/menu';
import { RequestsComponent, ChangeRequestDialogR, CompleteRequestDialogR, RequestInfoDialogR } from '../requests/requests.component'
import { ChangeRequestDialogSR, CompleteRequestDialogSR, RequestInfoDialogSR, SubmittedRequestsComponent } from '../submitted-requests/submitted-requests.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from '../services/guards/auth/auth.guard';
import { MyRequestsComponent, AddWorkOnRequestDialog, } from '../my-requests/my-requests.component';
import { CrudPersonsComponent, EditPersonDialog, DeletePersonDialog } from '../crud-persons/crud-persons.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    CreateRequestComponent,
    PersonalAccountComponent,
    ChangePassword,
    RequestsComponent,
    ChangeRequestDialogR,
    RequestInfoDialogR,
    CompleteRequestDialogR,
    SubmittedRequestsComponent,
    ChangeRequestDialogSR,
    RequestInfoDialogSR,
    CompleteRequestDialogSR,
    MyRequestsComponent,
    CrudPersonsComponent,
    EditPersonDialog,
    DeletePersonDialog,
    AddWorkOnRequestDialog,
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
    DragDropModule,
    MatSortModule,
  ],
  providers: [[AuthGuard], { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
