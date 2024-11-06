import { Component, computed, signal } from '@angular/core';
import { RouterModule,Router} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomSidenavComponent } from "../custom-sidenav/custom-sidenav.component";
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { ConnectService } from '../connect.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, MatSidenavModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, CustomSidenavComponent,MatBadgeModule,MatMenuModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  collapsed = signal(false)
 
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  menunavWidth = computed(() => this.collapsed() ? '65px' : '450px');
  
  constructor(private conn: ConnectService, private router: Router) {}

  onLogout() {
    this.conn.logout().subscribe(
        (response) => {
            console.log('Logout successful:', response);
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Clear the token from localStorage
            this.router.navigate(['/login']); // Navigate to the login page
        },
        (error) => {
            console.error('Logout error:', error);
            // Optionally, handle specific error messages or status codes here
        }
    );
}
}



