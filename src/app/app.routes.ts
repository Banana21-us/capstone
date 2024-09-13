import { CanActivate, CanActivateFn, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Dashboardroute } from './Modules/Dashboard/dashboard.routes';
import { managementroute } from './Modules/ClassManagement/classmanagement.routes';
import { teacherroutes } from './Modules/Teacher/teacher.routes';
import { announcementroutes } from './Modules/Announcement/announcement.routes';
import { messageroutes } from './Modules/Message/message.routes';
import { LoginComponent } from './login/login.component';
import { accountroutes } from './Modules/Account/account.routes';
import { subjectmanagementroute } from './Modules/SubjectManagement/subjectmanagement.routes';
import { authGuard } from './auth.guard';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route,state)=>{
  const localData = localStorage.getItem('token');
  if(localData != null){
    inject(Router).navigateByUrl('/main-page');
    return false;
  }
  return true;
}

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'main-page', component: MainPageComponent,
      children: [
        { path: 'homepage', loadChildren: () => import('./Modules/Dashboard/dashboard.routes').then(r => Dashboardroute),canActivate:[authGuard] },
        { path: 'classmanagement', loadChildren: () => import('./Modules/ClassManagement/classmanagement.routes').then(r => managementroute) },
        { 
          path: 'subjectmanagement', 
          loadChildren: () => 
            import('./Modules/SubjectManagement/subjectmanagement.routes').then((r) => subjectmanagementroute) 
        },
        { 
          path: 'teacher', loadChildren: () => import('./Modules/Teacher/teacher.routes').then(r => teacherroutes) },
        { path: 'announcement', loadChildren: () => import('./Modules/Announcement/announcement.routes').then(r => announcementroutes) },
        { path: 'message', loadChildren: () => import('./Modules/Message/message.routes').then(r => messageroutes) },
        { path: 'account', loadChildren: () => import('./Modules/Account/account.routes').then(r => accountroutes) },
        { path: '', redirectTo: 'homepage', pathMatch: 'full' }
      ],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];