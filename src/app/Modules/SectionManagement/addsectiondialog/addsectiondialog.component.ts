import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-addsectiondialog',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions],
  templateUrl: './addsectiondialog.component.html',
  styleUrl: './addsectiondialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddsectiondialogComponent {
  sectionName: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddsectiondialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecting data if needed
  ) {}

  onNoClick(): void {
    this.dialogRef.close(); // Close without returning any data
  }

  addsections(): void {
    console.log('addsections called'); // Debugging line
    if (this.sectionName.trim()) {
      this.dialogRef.close(this.sectionName.trim());
    }
  }
}
