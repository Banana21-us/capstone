// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-addlrndialog',
//   standalone: true,
//   imports: [],
//   templateUrl: './addlrndialog.component.html',
//   styleUrl: './addlrndialog.component.css'
// })
// export class AddlrndialogComponent {

// }
import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  lrn: string;
  name: string;
}

@Component({
  selector: 'app-addlrndialog',
  templateUrl: './addlrndialog.component.html',
  styleUrl: './addlrndialog.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddlrndialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddlrndialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA, { optional: true });  // Optional injection to avoid errors
  readonly lrn = model(this.data?.lrn || '');  // Default to empty string if undefined

  onNoClick(): void {
    this.dialogRef.close();
  }

}
