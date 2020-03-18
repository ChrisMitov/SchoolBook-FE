import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {SchoolService} from "../_services/school.service";
import {School} from "../_models/school";
import {User} from "../_models";
import {UserService} from "../_services/user.service";
import {Grades} from "../_models/grades";
import {Observable} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({templateUrl: 'grades.component.html'})
export class GradesComponent implements OnInit {
  students: User[];
  target: User;
  grades: Grades[];
  newGrade: Grades;
  subjects: string[] = [];
  chosenStudent: User;
  isTeacher: boolean = false;
  isStudent: boolean = false;
  isAdmin: boolean;
  teacherSubject: string;

  constructor(private userService: UserService, private schoolService: SchoolService, private modalService: NgbModal) {
    this.target = new User();
    this.newGrade = new Grades();
  }


  changeStudent(student: User) {
    this.target = student;
    this.userService.getAllGrades(student.id)
      .subscribe(data => {
        this.grades = data;
      });
  }

  ngOnInit(): void {
    this.checkUser().then((username: string) => {
      if (this.isTeacher) {
        this.userService.getStudentsForTeacher()
          .subscribe(data => {
            this.students = data;
          });
        this.userService.getUserByUsername(username)
          .subscribe(data => {
            this.teacherSubject = data.subject;
            this.subjects.push(data.subject);
            this.newGrade.subject = data.subject;
          });
      } else if (this.isStudent) {
        this.userService.getUserByUsername(username)
          .subscribe(data => {
            this.subjects.push(data.subject);
            this.newGrade.subject = data.subject;
            this.changeStudent(data);
          });
      } else {
        this.userService.getAllStudents()
          .subscribe(data => {
            this.students = data;
          });
        this.schoolService.getSubjects()
          .subscribe(data => {
            this.subjects = data;
          });
      }
    });
  }

  changeGradeStudent(student: User) {
    this.newGrade.user = student;
    this.chosenStudent = student;
  }

  addGrade() {
    this.userService.addGrade(this.newGrade)
      .subscribe(() => {
        this.newGrade = new Grades();
        if (this.target.id != null) {
          this.userService.getAllGrades(this.target.id)
            .subscribe(data => {
              this.grades = data;
            });
        }
        this.modalService.dismissAll();
      })
  }

  changeSubject(subject: string) {
    this.newGrade.subject = subject;
  }

  delete(id: number) {
    this.userService.deleteGrade(id)
      .subscribe(() => {
        this.userService.getAllGrades(this.target.id)
          .subscribe(data => {
            this.grades = data;
          });
      })
  }

  checkUser() {
    return new Promise((resolve) => {
      let role = localStorage.getItem('role');
      this.isTeacher = role === "Teacher";
      this.isAdmin = role == "Director" || role == "Admin";
      this.isStudent = role === "Student";
      let parse = JSON.parse(localStorage.getItem('currentUser'));
      console.log(parse.username);
      resolve(parse.username);
    })
  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.modalService.dismissAll();
    });
  }

  openEditModal(content1, grade: Grades) {
    this.newGrade = grade;
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.modalService.dismissAll();
    });
  }
}
