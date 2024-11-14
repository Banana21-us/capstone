import { Routes } from '@angular/router';
import { ReplyComponent } from './reply/reply.component';
import { SendComponent } from './send/send.component';
import { ViewComponent } from './view/view.component';
import { MessagepageComponent } from './messagepage/messagepage.component';

export const messageroutes: Routes = [
    {path: 'messagepage', component: MessagepageComponent,
        children: [
            {path: 'messages', component: SendComponent, 
                children: [
                    {path: 'view/:sid', component: ViewComponent},
                ]
            },
            {path: 'reply', component: ReplyComponent},
            {path: '', redirectTo: 'messages', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo:'messagepage', pathMatch: 'full'}
];
