import { Injectable } from '@angular/core';
import { RootUrlService } from './root-url.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogServiceService {

  private rooturlservice = new RootUrlService();
  public url = this.rooturlservice.url;

  constructor(private http: HttpClient, private rooturl : RootUrlService,private router:Router) { }

  register(data:any){
    console.log(data);
    return this.http.post<any>(`${this.url}/api/auth/registerTeacher`, data);
  }

  registerStudent(data:any){
    console.log(data);
    return this.http.post<any>(`${this.url}/api/auth/registerStudent`, data);
  }

  login(data:any){
    console.log(data);
    return this.http.post<any>(`${this.url}/api/auth/login`, data);
  }

  getTeachers(){
    return this.http.get<any>(`${this.url}/api/auth/teachers`);
  }

  createContest(data:any){
    return this.http.post<any>(`${this.url}/api/auth/createContest`,data);
  }

  getContest(data:any){
    return this.http.post<any>(`${this.url}/api/auth/getContest`,data);
  }

  getStudents(){
    return this.http.get<any>(`${this.url}/api/auth/students`);
  }

  assignStudents(data:any){
    return this.http.post<any>(`${this.url}/api/auth/assignStudents`,data);
  }

  findStudent(data:any){
    return this.http.post<any>(`${this.url}/api/auth/findStudent`,data);
  }

  compile(data:any){
    return this.http.post<any>(`${this.url}/api/auth/compile`,data);
  }

  uploadResult(data:any){
    return this.http.post<any>(`${this.url}/api/auth/uploadResult`,data);
  }

  createQuiz(data:any){
    return this.http.post<any>(`${this.url}/api/auth/createQuiz`,data);
  }

  getQuiz(data:any){
    return this.http.post<any>(`${this.url}/api/auth/getQuiz`,data);
  }

  addQuestion(data:any){
    return this.http.post<any>(`${this.url}/api/auth/addQuestion`,data);
  }

  uploadQuiz(data:any){
    return this.http.post<any>(`${this.url}/api/auth/uploadQuiz`,data);
  }

}
