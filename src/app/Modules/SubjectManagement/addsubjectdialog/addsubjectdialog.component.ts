import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
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
    MatDialogActions,
    MatIcon
  ],
  templateUrl: './addsubjectdialog.component.html',
  styleUrls: ['./addsubjectdialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AddsubjectdialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddsubjectdialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  subjectName: string = '';
  subjectsList: any[] = [];
  selectedImage: File | null = null; 
  imagePreviewUrl: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  addsubjects(): void {
    if (this.subjectName.trim()) {
      this.dialogRef.close({ name: this.subjectName.trim(), image: this.subjectsList });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviewUrl = e.target?.result as string; 
        };
        reader.readAsDataURL(file);
        this.subjectsList.push({ name: this.subjectName.trim(), image: file });
      }
    }
  }
  removeImage(): void {
    this.imagePreviewUrl = null;  
    this.selectedImage = null;    

    if (this.subjectsList.length > 0) {
      this.subjectsList.pop();
    }

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    console.log('Updated subjects list:', this.subjectsList);
  }
  
}
  // onFileChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files) {
  //     const file = input.files[0];
  //     if (file) {
  //       this.subjectsList.push({ name: this.subjectName.trim(), image: file }); // Push file directly
        
  //     }
      
  //   }
    
  // }

// export class AddsubjectdialogComponent {
//   readonly dialogRef = inject(MatDialogRef<AddsubjectdialogComponent>);
//   readonly data = inject(MAT_DIALOG_DATA);
  
//   subjectName: string = '';

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   addsubjects(): void {
//     if (this.subjectName.trim()) {
//       this.dialogRef.close(this.subjectName.trim());
//     }
//   }
// }

