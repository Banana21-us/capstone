import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

export type MenuItem = {
  icon: string,
  label: string,
  route: string,
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MenuItemComponent],
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.css'] 
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'homepage'
    },
    {
      icon: 'home',
      label: 'Class Management',
      route: 'classmanagement'
    },
    {
      icon: 'person',
      label: 'Teacher',
      route: 'teacher'
    },
    {
      icon: 'announcement',
      label: 'Announcement',
      route: 'announcement'
    },
    {
      icon: 'chat',
      label: 'Message',
      route: 'message'
    },
    {
      icon: 'account_circle',
      label: 'Profile',
      route: 'account'
    },
    {
      icon: 'logout',
      label: 'Logout',
      route: '/login'
    }
  ]);

  profilePicSize = computed( ()=> this.sideNavCollapsed() ? '50' : '100');
}
