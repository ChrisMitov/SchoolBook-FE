import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../_services/school.service";
import * as CanvasJS from '../../assets/canvasjs.min.js';
import {School} from "../_models/school";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";


@Component({templateUrl: 'statistics.component.html'})
export class StatisticsComponent implements OnInit {
  subjects: string[] = [];
  chosenSubject: string;
  private displayMessage: string;
  schools: School[];
  chosenSchool: School;

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit() {
    this.schoolService.getSubjects()
      .subscribe((data: string[]) => {
        this.subjects.push("N/A");
        this.subjects.push(...data);
      });
    this.schoolService.getAllSchools()
      .subscribe(data => {
        this.schools = data;
        this.allSchools();
      });
  }

  changeSubject(subject: string) {
    this.chosenSubject = subject;
    this.displayMessage = "Sort by " + subject;
    if (subject == "N/A") {
      subject = null;
      this.displayMessage = "Sort by subjects";
    }
    this.schoolService.getStatistics(subject)
      .subscribe(data => {
        let chart = new CanvasJS.Chart("chartContainer1", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.displayMessage
          },
          data: [{
            type: "column",
            dataPoints: data
          }]
        });
        chart.render();
      });
  }

  changeSchool(school: School) {
    this.chosenSchool = school;
    this.displayMessage = "Sort by " + school.name;
    this.schoolService.getStatisticsBySchool(school.name)
      .subscribe(data => {
        let chart = new CanvasJS.Chart("chartContainer2", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: this.displayMessage
          },
          data: [{
            type: "column",
            dataPoints: data
          }]
        });
        chart.render();
      });
  }

  allSchools() {
    this.schoolService.getStatisticsBySchool(null)
      .subscribe(data => {
        let chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Sort by schools"
          },
          data: [{
            type: "column",
            dataPoints: data
          }]
        });
        chart.render();
      });
  }

  onTabChange($event: NgbTabChangeEvent) {
    console.log($event);
    if($event.nextId === "ngb-tab-0"){
      this.allSchools();
    }
  }
}
