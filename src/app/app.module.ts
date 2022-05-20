import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './products/list/list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {LoginService} from "./services/login.service";
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModifyComponent } from './products/modify/modify.component';
import { CreateComponent } from './products/create/create.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgHttpLoaderModule} from "ng-http-loader";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ChartModule } from 'angular2-chartjs';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    NavbarComponent,
    DashboardComponent,
    ModifyComponent,
    CreateComponent,
    SettingsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CKEditorModule,
    NgHttpLoaderModule.forRoot(),
    FormsModule,
    MatAutocompleteModule,
    ChartModule,
    MatButtonToggleModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule { }
