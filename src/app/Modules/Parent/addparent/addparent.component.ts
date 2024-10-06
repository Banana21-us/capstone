import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddlrndialogComponent } from '../addlrndialog/addlrndialog.component';

@Component({
  selector: 'app-addparent',
  standalone: true,
  templateUrl: './addparent.component.html',
  styleUrls: ['./addparent.component.css'],  // Corrected to styleUrls
  imports: [MatDialogModule, MatButtonModule],  // Added required imports
})
export class AddparentComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddlrndialogComponent, {
      data: {
        children: 'lrn'
      }
    });
  }
}
