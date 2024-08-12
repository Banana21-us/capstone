import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';

export const accountroutes: Routes = [
 {path:'account', component: AccountComponent},
{path: '', redirectTo: 'account', pathMatch: 'full'}
];
