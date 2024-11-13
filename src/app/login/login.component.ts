import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import Swal from 'sweetalert2'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  standalone: true,
  providers: [ConnectService],
  imports: [
    RouterLink,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatLabel
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

          // image get
          const user = result.admin;
          if (user && user.admin_pic) {
            if (!user.admin_pic.startsWith('http://localhost:8000')) {
              user.admin_pic = `http://localhost:8000/assets/adminPic/${user.admin_pic}`;
            }
          }
          localStorage.setItem('user', JSON.stringify(user));
          console.log('Token stored:', result.token);
          this.navigateToMainPage();
        }
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Invalid Email or Password",  
        });
        
        console.log(result);
      },
      (error) => {
      }
    );
}


  navigateToMainPage() {
    console.log('Router:', this.router); // Check if router is defined
    this.router.navigate(['/main-page/homepage/Homepage']);
    window.location.reload()
    }
}