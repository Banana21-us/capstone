import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ViewComponent } from "../view/view.component";
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [
     RouterModule,
     SearchFilterPipe,
     ViewComponent,
      RouterOutlet, 
      FormsModule
    ],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent implements OnInit{

  messages: any;
  conversation: any;
  keyword: any;
  sid: any;
  uid: any;

  constructor(private conn: ConnectService,
    private aroute: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('admin_id')
    this.getMessages()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ReplyComponent, {
      width:"500px",
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.messages.unshift(result);
      this.getMessages();
    });
  }

  getMessages(){
    console.log("uid",this.uid)
    this.conn.getMessages(this.uid).subscribe((result: any) => {
      console.log("result list:",result)
      this.messages = result; 
    })
  }

  openConvo(sid: any, uid:any) {
    this.conn.getConvo(sid, uid).subscribe((result: any) => {
      this.route.navigate(['/main/message/messagepage/messages/view', sid])
      console.log(result);
      this.conversation = result;
    });
  }
  

}