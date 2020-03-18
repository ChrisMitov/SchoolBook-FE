import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from "../_services";
import {User} from "../_models";
import {UserService} from "../_services/user.service";


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  showRegister: boolean;
  userRole: string;
  roles: string[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.userService.getAllRoles()
      .subscribe(data => {
        this.roles = data;
      })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get r() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  register() {
    this.showRegister = true;
  }

  login() {
    this.showRegister = false;
  }

  onSubmitRegister() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let user = new User();
    user.name = this.r.name.value;
    user.username = this.r.username.value;
    user.password = this.r.password.value;
    user.role = this.userRole;
    this.authenticationService.register(user)
      .subscribe(
        () => {
          this.showRegister = false;
          this.loading = false;
          this.submitted = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  changeRole(role: string) {
    this.userRole = role;
  }
}
