import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-addsubjectdialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './addsubjectdialog.component.html',
  styleUrls: ['./addsubjectdialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddsubjectdialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddsubjectdialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  subjectName: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  addsubjects(): void {
    if (this.subjectName.trim()) {
      this.dialogRef.close(this.subjectName.trim());
    }
  }
}