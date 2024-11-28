import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';
import { MatIconModule } from '@angular/material/icon';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [
     RouterModule,
     SearchFilterPipe,
     RouterOutlet, 
      FormsModule,
      MatIconModule,
      SlicePipe
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
  inputClicked: boolean = false;
  stupar: any;

  constructor(private conn: ConnectService,
    private aroute: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('admin_id')
    this.getMessages();
    this.getStudPar();
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
    console.log(this.uid)
    this.conn.getMessages(this.uid).subscribe((result: any) => {
      console.log(result)
      const uniqueMessages = [];
      const seenSenders = new Set();

      for (const msg of result) {
          if (!seenSenders.has(msg.sender_name)) {
              seenSenders.add(msg.sender_name);
              uniqueMessages.push(msg);
          }
      }

      this.messages = uniqueMessages; // Assign filtered messages to 'messages'
    })
  }

  onInputClick() {
    this.inputClicked = true; // Set to true when the input is clicked
    this.keyword = ''; // Clear the keyword if desired
  }

  onBackClick() {
    this.inputClicked = false; // Set to true when the input is clicked
    this.keyword = ''; // Clear the keyword if desired
  }

  getStudPar(){
    this.conn.getStudentParents().subscribe((result: any) => {
      // console.log(result)
      this.stupar = result; 
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