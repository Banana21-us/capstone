import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Ensure the type matches your API response
  }
}