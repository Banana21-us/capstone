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
  // Properties for role and last name
  role = '';
  lname = '';
  fname = '';

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const parsedData = JSON.parse(userData);
        this.role = parsedData.role || '';
        this.lname = parsedData.lname || '';
        this.fname = parsedData.fname || '';
    }
  }


  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'homepage'
    },
    {
      icon: 'class',
      label: 'Class',
      route: 'classmanagement'
    },
    {
      icon: 'subject',
      label: 'Subject',
      route: 'subjectmanagement'
    },
    {
      icon: 'meeting_room',
      label: 'Section',
      route: 'section'
    },
    {
      icon: 'person',
      label: 'Teacher',
      route: 'teacher'
    },
    {
      icon: 'family_restroom',
      label: 'Parent',
      route: 'parent'
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
    
  ]);

  profilePicSize = computed( ()=> this.sideNavCollapsed() ? '50' : '100');
}
