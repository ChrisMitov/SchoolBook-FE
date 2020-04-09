import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {SchoolService} from "../_services/school.service";
import {School} from "../_models/school";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";


@Component({templateUrl: 'school.component.html'})
export class SchoolComponent implements OnInit {
  schools: School[];
  newSchool: School;
  chosenSchool: School;

  constructor(private schoolService: SchoolService, private modalService: NgbModal, private route: Router) {
    this.newSchool = new School();
  }

  ngOnInit() {
    this.getSchools();
  }

  private getSchools() {
    this.schoolService.getAllSchools()
      .subscribe(data => {
        this.schools = data;
      })
  }

  addSchool() {
    this.schoolService.addSchool(this.newSchool)
      .subscribe(() => {
        this.newSchool = new School();
        this.getSchools();
      })
  }

  updateSchool(school: School, content) {
    this.chosenSchool = Object.assign({}, school);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.getSchools();
      this.modalService.dismissAll();
    });
  }

  saveSchool() {
    this.schoolService.updateSchool(this.chosenSchool)
      .subscribe(() => {
        this.chosenSchool = new School();
        this.getSchools();
        this.modalService.dismissAll();
      });
  }

  delete(id: number) {
    this.schoolService.deleteSchool(id)
      .subscribe(() => {
        this.getSchools();
      })
  }

  showInfo(id: number) {
    this.route.navigate(['/users']);
  }
}
