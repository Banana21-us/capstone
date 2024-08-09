import { Routes } from '@angular/router';
import { ViewMessageComponent } from './view-message/view-message.component';

export const messageroutes: Routes = [
    {path:'viewmessage', component: ViewMessageComponent,
},
{path: '', redirectTo: 'viewmessage', pathMatch: 'full'}
];
