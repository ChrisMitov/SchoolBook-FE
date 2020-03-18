import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../_models";
import {Grades} from "../_models/grades";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAllRoles() {
    return this.http.get<string[]>(`${environment.apiUrl}/user/roles`);
  }

  getAllParents() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/parent`);
  }

  getUserByUsername(name: string) {
    return this.http.get<User>(`${environment.apiUrl}/user/name/${name}`);
  }

  getAllTeachers() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/teacher`);
  }

  getAllGrades(userId: number) {
    return this.http.get<Grades[]>(`${environment.apiUrl}/grades/${userId}`);
  }

  createDirector(director: User) {
    return this.http.post(`${environment.apiUrl}/user/director`, director);
  }

  createTeacher(teacher: User) {
    return this.http.post(`${environment.apiUrl}/user/teacher`, teacher);
  }

  createParent(parent: User) {
    return this.http.post(`${environment.apiUrl}/user/parent`, parent);
  }

  createStudent(student: User) {
    return this.http.post(`${environment.apiUrl}/user/student`, student);
  }

  updateStudent(student: User) {
    return this.http.put(`${environment.apiUrl}/user/student`, student);
  }

  getAllStudents() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/student`);
  }

  getStudentsForTeacher() {
    return this.http.get<User[]>(`${environment.apiUrl}/user/getStudentsForTeacher`);
  }

  getAllStudentsOfParent(id: number) {
    return this.http.get<User[]>(`${environment.apiUrl}/user/parent/students/${id}`);
  }

  addGrade(newGrade: Grades) {
    return this.http.post(`${environment.apiUrl}/grades`, newGrade);
  }

  deleteGrade(id: number) {
    return this.http.delete(`${environment.apiUrl}/grades/${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`);
  }

  updateParent(chosenParent: User) {
    return this.http.put(`${environment.apiUrl}/user/parent`, chosenParent);
  }

  updateTeacher(chosenTeacher: User) {
    return this.http.put(`${environment.apiUrl}/user/teacher`, chosenTeacher);
  }
}
