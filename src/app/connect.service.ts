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
    return this.http.post<any>(this.url + 'register',teacherData)
  }
  getteacher(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'admins'); 
  }
  deleteteacher(admin_id: number): Observable<any> {
    return this.http.delete(`${this.url}admins/${admin_id}`);
  }

  // announcement section 
  submitannouncement(announcementData:any):Observable<any>{
    return this.http.post<any>(this.url + 'announcements',announcementData)
  }
  getannouncement(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'announcements'); 
  }
  getupdateannouncement(ancmnt_id: number): Observable<any> {
    return this.http.get<any>(`${this.url}announcements/${ancmnt_id}`); // Adjust the endpoint as necessary
  }
  updateannouncement(ancmnt_id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}announcements/${ancmnt_id}`, data);
  }
  
  deleteAnnouncement(ancmnt_id: number): Observable<any> {
    return this.http.delete(`${this.url}announcements/${ancmnt_id}`);
  }

  // section section
  postsection(sectionData:any):Observable<any>{
    return this.http.post<any>(this.url + 'sections',sectionData)
  }
  getsection(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'sections'); 
  }

  // parent section
  getparent(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'parentguardian'); 
  }
  deleteParent(email: string): Observable<void> {
    return this.http.delete<void>(`${this.url}parentguardian/${email}`);
  }
}
