import { CanActivate, CanActivateFn, Routes,Router } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Dashboardroute } from './Modules/Dashboard/dashboard.routes';
import { managementroute } from './Modules/ClassManagement/classmanagement.routes';
import { teacherroutes } from './Modules/Teacher/teacher.routes';
import { announcementroutes } from './Modules/Announcement/announcement.routes';
import { messageroutes } from './Modules/Message/message.routes';

import { sectionroutes } from './Modules/SectionManagement/section.routes';

import { LoginComponent } from './login/login.component';
import { accountroutes } from './Modules/Account/account.routes';
import { subjectmanagementroute } from './Modules/SubjectManagement/subjectmanagement.routes';
import { authGuard } from './auth.guard';
import { inject } from '@angular/core';
import { parentroutes } from './Modules/Parent/parent.routes';


export const loginGuard: CanActivateFn = (route,state)=>{
  const localData = localStorage.getItem('token');
  if(localData != null){
    inject(Router).navigateByUrl('/main-page');
    return false;
  }
  return true;
}

export const routes: Routes = [
    { path: 'login', component: LoginComponent,
      canActivate:[loginGuard] 
    },
    { path: 'main-page', component: MainPageComponent,
      children: [
        { path: 'homepage', 
          loadChildren: () => import('./Modules/Dashboard/dashboard.routes').then(r => Dashboardroute),
          canActivate:[authGuard] },
        { path: 'classmanagement', 
          loadChildren: () => import('./Modules/ClassManagement/classmanagement.routes').then(r => managementroute),
          canActivate:[authGuard] },
        { path: 'subjectmanagement', 
          loadChildren: () => 
            import('./Modules/SubjectManagement/subjectmanagement.routes').then((r) => subjectmanagementroute),
          canActivate:[authGuard] },
        {  path: 'teacher', 
          loadChildren: () => import('./Modules/Teacher/teacher.routes').then(r => teacherroutes),
          canActivate:[authGuard] },
        {  path: 'section', 
          loadChildren: () => import('./Modules/SectionManagement/section.routes').then(r => sectionroutes),
          canActivate:[authGuard]},
          {  path: 'parent', 
            loadChildren: () => import('./Modules/Parent/parent.routes').then(r => parentroutes),
            canActivate:[authGuard]},
        { path: 'announcement', 
          loadChildren: () => import('./Modules/Announcement/announcement.routes').then(r => announcementroutes),
          canActivate:[authGuard] },
        { path: 'message', 
          loadChildren: () => import('./Modules/Message/message.routes').then(r => messageroutes),
          canActivate:[authGuard] },
        { path: 'account', 
          loadChildren: () => import('./Modules/Account/account.routes').then(r => accountroutes),
          canActivate:[authGuard] },
        { path: '', redirectTo: 'homepage', pathMatch: 'full' }
      ],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];