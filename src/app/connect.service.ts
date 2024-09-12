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

  // saveToken(token: string): void {
  //   this.token = token; // Save the token in the service
  //   localStorage.setItem('token', token); // Optionally save it to localStorage
  // }

  login(data:any){
    return this.http.post(this.url + 'login',data);
  }

  logout(): Observable<any> {
    const headers = {'Authorization': 'Bearer ' + this.token};
    return this.http.post(this.url + 'logout', {}, { headers });
}
}
