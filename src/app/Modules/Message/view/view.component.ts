import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectService } from '../../../connect.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  convo: any;
  sid: any;
  uid: any;
  

  msgForm = new FormGroup({
    message_sender: new FormControl(localStorage.getItem('admin_id')),
    message_reciever: new FormControl(null),
    message: new FormControl(null)
  })

  constructor(private conn: ConnectService,
    private aroute: ActivatedRoute,
    private route: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const uid = localStorage.getItem('admin_id')
    this.aroute.paramMap.subscribe(params => {
      const sid = params.get('sid');
      this.sid = sid;
      this.uid = uid;
      this.msgForm.get('message_reciever')?.setValue(this.sid);
      this.getConvo(sid, uid);
  });
  }
  

  getConvo(sid: any, uid: any) {
    console.log("Fetching conversation with sid:", sid, "and uid:", uid);
    this.conn.getConvo(sid, uid).subscribe((result: any) => {
        console.log("Received conversation:", result); // Check if data is here
        this.convo = result; // Assign API response to 'convo'
        this.cdRef.detectChanges();
    });
}

  sendMessage(){
    console.log(this.msgForm.value);
    this.conn.sendMessage(this.msgForm.value).subscribe((result: any) => {
      console.log(result);
      // You can also update the conversation list here
      this.getConvo(this.aroute.snapshot.paramMap.get('sid'), this.uid);
      this.msgForm.get('message')?.reset(); 
    })
  }

}