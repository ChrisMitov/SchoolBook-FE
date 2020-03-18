import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BasicAuthInterceptor} from "./_helpers/basic-auth.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SchoolComponent} from "./school/school.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {GradesComponent} from "./grades/grades.component";
import {UsersComponent} from "./users/users.component";
import {StatisticsComponent} from "./statistics/statistics.component";

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SchoolComponent,
    RegistrationComponent,
    GradesComponent,
    UsersComponent,
    StatisticsComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
