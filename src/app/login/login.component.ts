import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [ConnectService],
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private conn: ConnectService, private router: Router) {}

  login() {
    this.conn.login(this.loginForm.value).subscribe(
      (result: any) => {
        if (result.token != null) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.admin));
          console.log('Token stored:', result.token);
          this.navigateToMainPage(); // Navigate to the main page
        }
        console.log(result);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/homepage/Homepage']);
    // window.location.reload()
    }
}