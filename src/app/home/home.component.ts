import {Component} from '@angular/core';
import {AuthenticationService} from "../_services";
import {User} from "../_models";

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  loading = false;
  currentUser: User;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  isDirector: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.checkUser();
    });
  }

  ngOnInit() {
    this.loading = true;
  }
  checkUser() {
    let role = localStorage.getItem('role');
    console.log(role);
    this.isAdmin = role === "Parent";
    this.isStudent = role === "Student";
    this.isTeacher = role === "Teacher";
    this.isDirector = role == "Director";
  }

}
