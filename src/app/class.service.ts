import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {}

  getclasses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/classes'); // Ensure the type matches your API response
  }
}
