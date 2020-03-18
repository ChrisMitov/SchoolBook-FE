import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./_services";
import {User} from "./_models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  isAdmin: boolean;
  isStudent: boolean;
  isEmployee: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.checkUser();
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  checkUser() {
    let role = localStorage.getItem('role');
    this.isAdmin = role === "Admin" || role === 'Director';
    this.isEmployee = role === "Teacher";
    this.isStudent = role === "Student";
  }
}
