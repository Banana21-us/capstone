import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { run } from 'node:test';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  constructor(private http: HttpClient) {}

  url = "http://localhost:8000/api/";
  token = localStorage.getItem('token');


  login(data:any){
    return this.http.post(this.url + 'login',data);
  }

  logout(): Observable<any> {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'logout', {}, { headers });
  }

  // Subjects section
  postsubject(subjectData:any):Observable<any>{
    return this.http.post<any>(this.url + 'subjects',subjectData)
  }

  getsubjects(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'subjects'); 
  }

  // teacher section 
  postteacher(teacherData:any):Observable<any>{
    return this.http.post<any>(this.url + 'admins',teacherData)
  }
  getteacher(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'admins'); 
  }

  // announcement section 
  submitannouncement(announcementData:any):Observable<any>{
    return this.http.post<any>(this.url + 'announcements',announcementData)
  }
  getannouncement(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'announcements'); 
  }
}
