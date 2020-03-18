import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {User} from "../_models";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SchoolService} from "../_services/school.service";
import {School} from "../_models/school";


@Component({templateUrl: 'users.component.html'})
export class UsersComponent implements OnInit {
  roles: string[];
  chosenRole: string;
  parents: User[];
  students: User[];
  chosenStudent: User;
  classes: string[];
  schools: School[];
  parentChildren: User[];
  chosenParent: User;
  teachers: User[];
  chosenTeacher: User;
  subjects: string[];

  constructor(private userService: UserService, private modalService: NgbModal, private schoolService: SchoolService) {
    this.getSchools();
    this.schoolService.getSubjects()
      .subscribe(data => {
        this.subjects = data;
      });
  }

  getAllRoles() {
    this.userService.getAllRoles()
      .subscribe(data => {
        this.roles = data.filter(value => value == 'Director');
        this.chosenRole = this.roles[0];
      });
  }

  ngOnInit(): void {
    this.getAllRoles();
    this.getAllParents();
    this.getAllStudents();
    this.getAllTeachers();
    this.getClasses();
  }

  getAllParents() {
    this.userService.getAllParents()
      .subscribe(data => {
        this.parents = data;
      });
  }

  getAllStudents() {
    this.userService.getAllStudents()
      .subscribe(data => {
        this.students = data;
      })
  }

  getAllTeachers() {
    this.userService.getAllTeachers()
      .subscribe(data => {
        this.teachers = data;
      })
  }

  changeStudent(student: User, content) {
    this.chosenStudent = student;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then();
  }

  changeClass(studentClass: string) {
    this.chosenStudent.classNumber = Number(studentClass);
  }

  changeParent(parent1: User) {
    this.chosenStudent.parent = parent1;
  }

  changeSchool(school: School, user: User) {
    user.school = school;
  }

  private getClasses() {
    this.classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  }

  private getSchools() {
    this.schoolService.getAllSchools()
      .subscribe(data => {
        this.schools = data;
      })
  }

  updateStudent() {
    this.userService.updateStudent(this.chosenStudent)
      .subscribe();
    this.modalService.dismissAll();
  }

  delete(id: number) {
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.getAllStudents();
        this.getAllParents();
        this.getAllTeachers();
      });
  }

  showChildren(parent: User, content) {
    this.userService.getAllStudentsOfParent(parent.id)
      .subscribe(data => {
        this.parentChildren = data;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
          .result.then();

      });
  }

  changeParentProperties(parent: User, content) {
    this.chosenParent = parent;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then();
  }

  updateParent() {
    this.userService.updateParent(this.chosenParent)
      .subscribe();
    this.modalService.dismissAll();
  }

  changeTeacher(teacher: User, content1: any) {
    this.chosenTeacher = Object.assign({}, teacher);
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then();
  }

  changeSubject(subject: string) {
    this.chosenTeacher.subject = subject;
  }

  updateTeacher() {
    this.userService.updateTeacher(this.chosenTeacher)
      .subscribe(data => {
        this.modalService.dismissAll();
        this.getAllTeachers();
      });
  }
}
