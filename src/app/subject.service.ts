import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiUrl= "http://localhost:8000/api/subjects";

  constructor(private http: HttpClient) {}

  // getclasses(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:8000/api/classes'); // Ensure the type matches your API response
  // }
    postsubject(subjectData:any):Observable<any>{
      return this.http.post<any>(this.apiUrl,subjectData)
    }

    getsubjects(): Observable<any[]> {
      return this.http.get<any[]>('http://localhost:8000/api/subjects'); 
    }
}
