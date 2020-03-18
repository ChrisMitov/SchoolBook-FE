import {Component} from '@angular/core';
import {first} from 'rxjs/operators';
import {SchoolService} from "../_services/school.service";
import {School} from "../_models/school";
import {User} from "../_models";
import {UserService} from "../_services/user.service";


@Component({templateUrl: 'registration.component.html'})
export class RegistrationComponent {
  schools: School[];
  director: User;
  teacher: User;
  parent: User;
  student: User;
  subjects: string[];
  classes: string[];
  parents: User[];

  constructor(private schoolService: SchoolService, private userService: UserService) {
    this.director = new User();
    this.teacher = new User();
    this.parent = new User();
    this.student = new User();
  }

  ngOnInit() {
    this.getSchools();
    this.getSubjects();
    this.getClasses();
    this.getParents();
  }

  private getSchools() {
    this.schoolService.getAllSchools()
      .subscribe(data => {
        this.schools = data;
      })
  }

  private getSubjects() {
    this.schoolService.getSubjects()
      .subscribe(data => {
        this.subjects = data;
      })
  }

  private getParents() {
    this.userService.getAllParents()
      .subscribe(data => {
        this.parents = data;
      })
  }

  private getClasses() {
    this.classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  }


  changeSchool(school: School, user: User) {
    user.school = school;
  }

  addDirector() {
    this.userService.createDirector(this.director)
      .subscribe(() => this.director = new User());
  }

  changeSubject(subject: string, teacher: User) {
    teacher.subject = subject;
  }

  addTeacher() {
    this.userService.createTeacher(this.teacher)
      .subscribe(() => this.teacher = new User());
  }

  addParent() {
    this.userService.createParent(this.parent)
      .subscribe(() => this.parent = new User());
  }

  changeClass(studentClass: string) {
    this.student.classNumber = Number(studentClass);
  }

  addStudent() {
    this.userService.createStudent(this.student)
      .subscribe(() => {
          this.student = new User();
          this.getParents();
        }
      );
  }

  changeParent(parent1: User) {
    this.student.parent = parent1;
  }
}
