import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {School} from "../_models/school";

@Injectable({providedIn: 'root'})
export class SchoolService {
  constructor(private http: HttpClient) {
  }

  getAllSchools() {
    return this.http.get<School[]>(`${environment.apiUrl}/school`);
  }


  addSchool(school: School) {
    return this.http.post(`${environment.apiUrl}/school`, school);
  }

  updateSchool(school: School) {
    return this.http.put(`${environment.apiUrl}/school`, school);
  }

  deleteSchool(id: Number) {
    return this.http.delete(`${environment.apiUrl}/school/${id}`);
  }

  getSubjects() {
    return this.http.get<string[]>(`${environment.apiUrl}/school/subject`);
  }

  getStatistics(subject: string) {
    return this.http.get(`${environment.apiUrl}/school/statistics/${subject}`);
  }

  getStatisticsBySchool(name: string) {
    return this.http.get(`${environment.apiUrl}/school/statistics/school/${name}`);
  }
}
