import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { NavigationModule } from './main-layout/navigation/navigation.module';

// Components
import { CollaborateursComponent } from './views/profile/collaborateurs/collaborateurs.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';
import {FooterComponent} from "./main-layout/footer/footer.component";
import {StatsCardComponent} from "./views/dashboards/common/stats-card/stats-card.component";
import {StatsCard2Component} from "./views/dashboards/common/stats-card2/stats-card2.component";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {CollaborateurFormComponent} from "./views/profile/collaborateur-form/collaborateur-form.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard1' },
  { path: 'dashboard1', component: Dashboard1Component },
  { path: 'collaborateurs', component: CollaborateursComponent },
];

@NgModule({
  declarations: [
      AppComponent,
    CollaborateursComponent,
    CollaborateurFormComponent,
  ]
  ,
  imports: [
    FooterComponent,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    ViewsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [
    FooterComponent,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    CollaborateursComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}