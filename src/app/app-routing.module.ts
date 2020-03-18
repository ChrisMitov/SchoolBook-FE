import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login";
import {AuthGuard} from "./_helpers/auth.guard";
import {HomeComponent} from "./home";
import {SchoolComponent} from "./school/school.component";
import {RegistrationComponent} from "./registration/registration.component";
import {GradesComponent} from "./grades/grades.component";
import {UsersComponent} from "./users/users.component";
import {StatisticsComponent} from "./statistics/statistics.component";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'school', component: SchoolComponent, canActivate: [AuthGuard]},
  {path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard]},
  {path: 'grades', component: GradesComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
